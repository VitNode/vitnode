import { greet } from 'shared/core/test';
import { getMiddlewareData } from 'vitnode-frontend/api/get-middleware-data';

export default async function Home() {
  const test = await getMiddlewareData();

  // eslint-disable-next-line no-console
  console.log(test);

  return <div>{greet('test')}</div>;
}
