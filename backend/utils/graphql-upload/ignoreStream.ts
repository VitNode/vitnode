import { Readable } from "stream";

/**
 * Safely ignores a Node.js readable stream.
 */
export default function ignoreStream(stream: Readable) {
  // Prevent an unhandled error from crashing the process.
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  stream.on("error", () => {});

  // Waste the stream.
  stream.resume();
}
