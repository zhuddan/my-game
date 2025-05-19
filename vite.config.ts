import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import React from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, './')
  return {
    plugins: [
      tailwindcss(),
      React(),
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
