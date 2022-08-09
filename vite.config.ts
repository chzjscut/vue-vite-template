import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path';
import purgeIcons from 'vite-plugin-purge-icons';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: /(\/)?@\//,
        //replacement: 'src/'
        replacement: pathResolve('src') + '/'
      }
    ]
  },
  // css: {
  //   preprocessorOptions: {
  //     less: {
        
  //     }
  //   }
  // },
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'http://172.23.20.135:12580/',
        changeOrigin: true
      }
    }
  },
  plugins: [
    vue(),
    purgeIcons({})
  ]
})
