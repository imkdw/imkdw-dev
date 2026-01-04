import { Link } from '@/i18n/navigation';
import { Button } from '@imkdw-dev/ui';
import { ArrowLeft } from 'lucide-react';

export function SeriesBackButton() {
  return (
    <div className="pb-6">
      <Link href="/series">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          시리즈 목록으로
        </Button>
      </Link>
    </div>
  );
}
