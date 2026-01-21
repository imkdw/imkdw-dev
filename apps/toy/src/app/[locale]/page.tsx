import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-lg text-gray-600">{t('description')}</p>
        <div className="flex gap-4 justify-center mt-8">
          <Link href="/" locale="ko" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            한국어
          </Link>
          <Link href="/" locale="en" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            English
          </Link>
        </div>
      </div>
    </main>
  );
}
