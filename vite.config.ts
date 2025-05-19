import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')
  return {
    plugins: [
      tailwindcss(),
      React(),
      viteStaticCopy({
        targets: [
          {
            src: './src/assets/*',
            dest: '/assets',
          },
        ],
      }),
      {
        name: '',
        buildStart() {
          const assetFiles = fs.readdirSync('src/assets')
          fs.writeFileSync(
            'src/constants/assets.ts',
            `/** 所有静态资源 */\nexport const ASSETS = ${
              JSON.stringify(assetFiles, null, 2).replace(/"/g, '\'')
            }`,
          )
        },
      },
    ],
    server: {
      port: Number(env.VITE_APP_PORT),
      host: true,
    },
    define: {
      'process.env': {},
    },
    resolve: {
      alias: {
        '~/': `${path.resolve(__dirname, 'src')}/`,
      },
    },
    // build: {
    //   rollupOptions: {
    //     external: ['/mocks/*'], // 排除 mocks 目录下的所有文件
    //   },
    // },
  }
})
