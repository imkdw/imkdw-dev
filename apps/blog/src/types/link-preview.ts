export interface LinkPreviewData {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
}

export type LinkPreviewResult =
  | {
      success: true;
      data: LinkPreviewData;
    }
  | {
      success: false;
      error: string;
    };
