import { resolve } from 'path';
import { generateApi } from 'swagger-typescript-api';

export const codegen = async () => {
  // const test = new Middleware();

  // const middleware = await test.middlewareControllerShow();

  // console.log(middleware);

  // npx swagger-typescript-api -p http://localhost:8080/api/swagger.json -o ./scripts/__test__ --modular

  await generateApi({
    url: 'http://localhost:8080/api/swagger.json',
    output: resolve(process.cwd(), 'src', 'api'),
    modular: true,
    moduleNameFirstTag: true,
  });

  // void generateApi({
  //   url: 'http://localhost:8080/api/swagger.json',
  //   output: join(process.cwd(), 'src', '__generated__'),
  //   silent: true,
  //   extractEnums: true,
  //   extractRequestBody: true,
  //   extractRequestParams: true,
  //   extractResponseBody: true,
  //   extractResponseError: true,
  //   generateClient: true,
  //   generateRouteTypes: true,
  //   sortRoutes: true,
  //   sortTypes: true,
  // });

  console.log('codegen');
};
