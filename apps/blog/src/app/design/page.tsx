import { ProgressBar } from '@imkdw-dev/ui';

export default function DesignPage() {
  return (
    <section>
      <h1>Design</h1>
      <ProgressBar progress={60} isVisible={true} />
    </section>
  );
}
