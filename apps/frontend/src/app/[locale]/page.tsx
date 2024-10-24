import { greet } from 'shared/core/test';
import { EditorShowCoreMiddleware } from 'shared/user';

export default function Home() {
  const test: EditorShowCoreMiddleware = {
    sticky: true,
  };

  // eslint-disable-next-line no-console
  console.log(test);

  return <div>{greet('test')}</div>;
}
