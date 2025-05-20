import fs from 'node:fs'
import path from 'node:path'
import React from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import { version } from './package.json'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')
  return {
    base: '/my-game',
    plugins: [
      React(),
      {
        name: '',
        buildStart() {
          const assetFiles = fs.readdirSync('public/game').map((it) => {
            const name = it.split('.')[0]
            return {
              alias: toPascalCase(name),
              src: `/${it}?v=${version}`,
            }
          })
          fs.writeFileSync(
            'src/constants/assets.ts',
            `/** 所有静态资源 */\nexport const ASSETS = ${
              JSON.stringify(assetFiles, null, 2)
                .replace(/"/g, '\'')
                .replace(/'alias'/g, 'alias')
                .replace(/'src'/g, 'src')
            } as const\n\nexport type SpriteAssetName = typeof ASSETS[number]['alias']`,
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

function toPascalCase(input: string): string {
  return input
    .split('-') // 按横线分割
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // 首字母大写，其他字母小写
    .join('') // 合并成一个字符串
}
