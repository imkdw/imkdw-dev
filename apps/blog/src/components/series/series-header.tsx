import { SeriesMainCard } from './series-main-card';
import { SeriesStatsCards } from './series-stats-cards';
import type { ISeriesDetailDto } from '@imkdw-dev/types';

interface DeleteDialogTranslations {
  title: string;
  description: string;
  cancel: string;
  delete: string;
  deleting: string;
}

interface ToastTranslations {
  copySuccess: string;
  copyError: string;
  deleteSuccess: string;
  deleteError: string;
}

interface ButtonTranslations {
  share: string;
  edit: string;
  delete: string;
}

interface SeriesActionsTranslations {
  deleteDialog: DeleteDialogTranslations;
  toast: ToastTranslations;
  buttons: ButtonTranslations;
}

interface Translations {
  seriesLabel: string;
  seriesActions: SeriesActionsTranslations;
}

interface Props {
  seriesData: ISeriesDetailDto;
  translations: Translations;
}

export function SeriesHeader({ seriesData, translations }: Props) {
  return (
    <div className="space-y-6 mb-8">
      <SeriesMainCard seriesData={seriesData} translations={translations} />
      <SeriesStatsCards seriesData={seriesData} />
    </div>
  );
}
