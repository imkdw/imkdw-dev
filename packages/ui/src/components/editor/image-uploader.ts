import { Uploader } from '@milkdown/kit/plugin/upload';
import { Node } from '@milkdown/kit/prose/model';

interface CreateImageUploaderOptions {
  uploadImage: (file: File) => Promise<{ success: boolean; data?: string; error?: { message: string } }>;
  onUploadImage: (imageName: string) => void;
}

export function createImageUploader({ uploadImage, onUploadImage }: CreateImageUploaderOptions): Uploader {
  return async (files, schema) => {
    const images: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) {
        continue;
      }

      if (!file.type.includes('image')) {
        continue;
      }

      images.push(file);
    }

    const nodes: Node[] = await Promise.all(
      images.map(async image => {
        const result = await uploadImage(image);

        if (!result.success || !result.data) {
          const errorMessage = result.error?.message ?? '이미지 업로드에 실패했습니다.';
          // showErrorToast(errorMessage);
          throw new Error(errorMessage);
        }

        const src = result.data;
        const alt = image.name;
        onUploadImage(src);

        return schema.nodes.image?.createAndFill({
          src,
          alt,
        }) as Node;
      })
    );

    return nodes.filter(node => node !== null);
  };
}
