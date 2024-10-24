import { greet } from 'shared/core/test';

export default function Home() {
  return <div>{greet('test')}</div>;
}
