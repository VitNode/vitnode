import { IncomingMessage, ServerResponse } from 'http';

import busboy from 'busboy';
import createError from 'http-errors';
import objectPath from 'object-path';

import Upload, { FileUpload } from './upload';
import ignoreStream from './ignore-stream';
import { ProcessRequestOptions } from './graphql-upload-express';
import { WriteStream } from './fs-capacitor';

const GRAPHQL_MULTIPART_REQUEST_SPEC_URL =
  'https://github.com/jaydenseric/graphql-multipart-request-spec';

export default async function processRequest(
  request: IncomingMessage,
  response: ServerResponse,
  {
    maxFieldSize = 1000000, // 1 MB
    maxFileSize = Infinity,
    maxFiles = Infinity,
  }: ProcessRequestOptions = {},
): Promise<Record<string, unknown> | Record<string, unknown>[]> {
  return new Promise((resolve, reject) => {
    let released: boolean;

    let exitError: Error;

    let operations: Record<string, unknown>[] | Record<string, unknown>;

    let operationsPath: objectPath.ObjectPathBound<
      Record<string, unknown> | Record<string, unknown>[]
    >;

    let map: Map<string, Upload>;

    const parser = busboy({
      headers: request.headers,
      defParamCharset: 'utf8',
      limits: {
        fieldSize: maxFieldSize,
        fields: 2, // Only operations and map.
        fileSize: maxFileSize,
        files: maxFiles,
      },
    });

    /**
     * Exits request processing with an error. Successive calls have no effect.
     */
    function exit(error: Error, isParserError = false) {
      if (exitError) return;

      exitError = error;

      if (map)
        for (const upload of map.values())
          if (!upload.file) upload.reject(exitError);

      // If the error came from the parser, don’t cause it to be emitted again.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      isParserError ? parser.destroy() : parser.destroy(exitError);

      request.unpipe(parser);

      // With a sufficiently large request body, subsequent events in the same
      // event frame cause the stream to pause after the parser is destroyed. To
      // ensure that the request resumes, the call to .resume() is scheduled for
      // later in the event loop.
      setImmediate(() => {
        request.resume();
      });

      reject(exitError);
    }

    parser.on('field', (fieldName, value, { valueTruncated }) => {
      if (valueTruncated) {
        exit(
          createError(
            413,
            `The ‘${fieldName}’ multipart field value exceeds the ${maxFieldSize} byte size limit.`,
          ),
        );

        return;
      }

      switch (fieldName) {
        case 'operations':
          try {
            operations = JSON.parse(value);
          } catch (error) {
            exit(
              createError(
                400,
                `Invalid JSON in the ‘operations’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
              ),
            );

            return;
          }

          // `operations` should be an object or an array. Note that arrays
          // and `null` have an `object` type.
          if (typeof operations !== 'object' || !operations) {
            exit(
              createError(
                400,
                `Invalid type for the ‘operations’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
              ),
            );

            return;
          }

          operationsPath = objectPath(operations);

          break;
        case 'map': {
          if (!operations) {
            exit(
              createError(
                400,
                `Misordered multipart fields; ‘map’ should follow ‘operations’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
              ),
            );

            return;
          }

          let parsedMap: ArrayLike<unknown> | Record<string, unknown>;
          try {
            parsedMap = JSON.parse(value);
          } catch (error) {
            exit(
              createError(
                400,
                `Invalid JSON in the ‘map’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
              ),
            );

            return;
          }

          // `map` should be an object.
          if (
            typeof parsedMap !== 'object' ||
            !parsedMap ||
            Array.isArray(parsedMap)
          ) {
            exit(
              createError(
                400,
                `Invalid type for the ‘map’ multipart field (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
              ),
            );

            return;
          }

          const mapEntries = Object.entries(parsedMap);

          // Check max files is not exceeded, even though the number of files
          // to parse might not match the map provided by the client.
          if (mapEntries.length > maxFiles) {
            exit(createError(413, `${maxFiles} max file uploads exceeded.`));

            return;
          }

          map = new Map();
          for (const [fieldName, paths] of mapEntries) {
            if (!Array.isArray(paths)) {
              exit(
                createError(
                  400,
                  `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
                ),
              );

              return;
            }

            map.set(fieldName, new Upload());

            for (const [index, path] of paths.entries()) {
              if (typeof path !== 'string') {
                exit(
                  createError(
                    400,
                    `Invalid type for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
                  ),
                );

                return;
              }

              try {
                operationsPath.set(path, map.get(fieldName));
              } catch (error) {
                exit(
                  createError(
                    400,
                    `Invalid object path for the ‘map’ multipart field entry key ‘${fieldName}’ array index ‘${index}’ value ‘${path}’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
                  ),
                );

                return;
              }
            }
          }

          resolve(operations);
        }
      }
    });

    parser.on(
      'file',
      (fieldName, stream, { encoding, filename, mimeType: mimetype }) => {
        if (!map) {
          ignoreStream(stream);

          exit(
            createError(
              400,
              `Misordered multipart fields; files should follow ‘map’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
            ),
          );

          return;
        }

        const upload = map.get(fieldName);

        if (!upload) {
          // The file is extraneous. As the rest can still be processed, just
          // ignore it and don’t exit with an error.
          ignoreStream(stream);

          return;
        }

        let fileError: Error;

        const capacitor = new WriteStream();

        capacitor.on('error', () => {
          stream.unpipe();
          stream.resume();
        });

        stream.on('limit', () => {
          fileError = createError(
            413,
            `File truncated as it exceeds the ${maxFileSize} byte size limit.`,
          );
          stream.unpipe();
          capacitor.destroy(fileError);
        });

        stream.on('error', error => {
          fileError = error;
          stream.unpipe();
          capacitor.destroy(fileError);
        });

        const file: FileUpload = {
          filename,
          mimetype,
          encoding,
          createReadStream(options) {
            const error = fileError || (released ? exitError : null);
            if (error) throw error;

            return capacitor.createReadStream(options);
          },
          capacitor,
        };

        Object.defineProperty(file, 'capacitor', {
          enumerable: false,
          configurable: false,
          writable: false,
        });

        stream.pipe(capacitor);
        upload.resolve(file);
      },
    );

    parser.once('filesLimit', () => {
      exit(createError(413, `${maxFiles} max file uploads exceeded.`));
    });

    parser.once('finish', () => {
      request.unpipe(parser);
      request.resume();

      if (!operations) {
        exit(
          createError(
            400,
            `Missing multipart field ‘operations’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
          ),
        );

        return;
      }

      if (!map) {
        exit(
          createError(
            400,
            `Missing multipart field ‘map’ (${GRAPHQL_MULTIPART_REQUEST_SPEC_URL}).`,
          ),
        );

        return;
      }

      for (const upload of map.values())
        if (!upload.file)
          upload.reject(createError(400, 'File missing in the request.'));
    });

    // Use the `on` method instead of `once` as in edge cases the same parser
    // could have multiple `error` events and all must be handled to prevent the
    // Node.js process exiting with an error. One edge case is if there is a
    // malformed part header as well as an unexpected end of the form.
    parser.on('error', (error: Error) => {
      exit(error, true);
    });

    response.once('close', () => {
      released = true;

      if (map)
        for (const upload of map.values())
          if (upload.file)
            // Release resources and clean up temporary files.
            upload.file.capacitor.release();
    });

    request.once('close', () => {
      if (!request.readableEnded)
        exit(
          createError(
            499,
            'Request disconnected during file upload stream parsing.',
          ),
        );
    });

    request.pipe(parser);
  });
}
