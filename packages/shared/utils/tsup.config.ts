import { dualConfig } from '@imkdw-dev/typescript-config/tsup/dual';
import { defineConfig } from 'tsup';

export default defineConfig({
  ...dualConfig,
  entry: {
    index: 'src/index.ts',
    'client/index': 'src/client/index.ts',
    'server/index': 'src/server/index.ts',
  },
  external: ['react', 'react-dom', 'lucide-react'],
});
