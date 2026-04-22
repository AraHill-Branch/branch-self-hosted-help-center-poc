import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import yaml from 'js-yaml'
import { usePaths } from 'vitepress-openapi'

const __dirname = dirname(fileURLToPath(import.meta.url))
const spec = yaml.load(readFileSync(resolve(__dirname, '../openapi.yaml'), 'utf8'))

export default {
  paths() {
    return usePaths({ spec })
      .getPathsByVerbs()
      .map(({ operationId, summary }) => ({
        params: {
          operationId,
          pageTitle: `${summary} - Deep Linking API`
        }
      }))
  }
}
