import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  // 确保在项目启动前加载polyfill
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-polyfills',
          setup(build) {
            // 更新 filter 以更精确地匹配 vite 相关文件路径
            build.onLoad({ filter: /node_modules\/vite\/dist\/node\/chunks\/dep-.*\.js/ }, async (args) => {
              const contents = await fs.promises.readFile(args.path, 'utf8');
              return {
                contents: `import '../../src/polyfills';\n${contents}`,
                loader: 'js',
              };
            });
          },
        },
      ],
    },
  },
});