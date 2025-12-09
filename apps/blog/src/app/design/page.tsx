'use client';

import { ProgressBar } from '@imkdw-dev/ui';
import { useNavigationProgress } from '@/hooks';

export default function DesignPage() {
  const { isLoading, progress, start, done } = useNavigationProgress();

  return (
    <section className="p-8">
      <ProgressBar progress={progress} isVisible={isLoading} />
      <h1 className="text-2xl font-bold mb-4">Design</h1>
      <p className="mb-4">
        Progress: {Math.round(progress)}% | Loading: {isLoading ? 'Yes' : 'No'}
      </p>
      <div className="flex gap-4">
        <button onClick={start} className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Start
        </button>
        <button onClick={done} className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
          Done
        </button>
      </div>
    </section>
  );
}
