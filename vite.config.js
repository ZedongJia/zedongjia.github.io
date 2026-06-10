import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import yaml from 'js-yaml'
import fs from 'node:fs'

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
})