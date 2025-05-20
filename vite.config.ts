import fs from 'node:fs'
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')
  return {
    base: '/my-game',
    plugins: [
      tailwindcss(),
      React(),
      {
        name: '',
        buildStart() {
          const assetFiles = fs.readdirSync('public/game')
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
