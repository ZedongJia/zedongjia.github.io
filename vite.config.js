import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from 'js-yaml'
import fs from 'node:fs'
import { fileURLToPath, URL } from 'node:url'

const lastUpdated = process.env.LAST_UPDATED ?? ''

// Custom plugin to support YAML imports
function yamlPlugin() {
  return {
    name: 'vite-plugin-yaml',
    transform(src, id) {
      if (!id.endsWith('.yaml') && !id.endsWith('.yml')) return null
      const content = fs.readFileSync(id, 'utf-8')
      const data = yaml.load(content)
      return {
        code: `export default ${JSON.stringify(data)}`,
        map: null
      }
    }
  }
}

export default defineConfig({
  plugins: [vue(), yamlPlugin()],
  base: '/',
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated),
  },
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        publications: fileURLToPath(new URL('./publications.html', import.meta.url)),
      }
    }
  }
})
