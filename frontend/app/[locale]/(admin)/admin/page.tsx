import { Button } from '../../../../components/ui/button';

export default function Page() {
  return (
    <div className="p-6">
      <div className="p-6 bg-card flex gap-4">
        <Button variant="default">Test</Button>
        <Button variant="destructive">Test</Button>
        <Button variant="ghost">Test</Button>
        <Button variant="link">Test</Button>
        <Button variant="outline">Test</Button>
        <Button variant="secondary">Test</Button>
      </div>
    </div>
  );
}
