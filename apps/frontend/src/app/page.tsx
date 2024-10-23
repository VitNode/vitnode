import { greetTest } from 'shared/types/test';
import { EditorShowCoreMiddleware } from 'shared/types/user';

export default function Home() {
  const test: EditorShowCoreMiddleware = {
    sticky: true,
  };

  // eslint-disable-next-line no-console
  console.log(test);

  return <div>{greetTest('test')}</div>;
}
