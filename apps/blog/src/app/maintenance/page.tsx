import type { Metadata } from 'next';

import { MaintenanceTerminal } from './maintenance-terminal';

export const metadata: Metadata = {
  title: '점검중입니다',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <MaintenanceTerminal />
    </div>
  );
}
