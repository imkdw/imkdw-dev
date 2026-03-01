'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent } from '@imkdw-dev/ui';

export function ManualImage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Image
        src="/image-compose-manual.webp"
        alt="배경 합성 사용 가이드 - 업로드, 다듬기, 캔버스 배치, 완성 4단계"
        width={600}
        height={600}
        className="cursor-zoom-in rounded-lg"
        onClick={() => setOpen(true)}
      />

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogContent onClose={() => setOpen(false)} className="max-w-fit">
          <Image
            src="/image-compose-manual.webp"
            alt="배경 합성 사용 가이드 - 업로드, 다듬기, 캔버스 배치, 완성 4단계"
            width={1200}
            height={1200}
            className="rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
