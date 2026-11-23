import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const normalize = value => value.replace(/\r\n/g, '\n')
const switcher = normalize(readFileSync(join(root, 'templates/dsh-style-switcher.js'), 'utf8'))
const kit = normalize(readFileSync(join(root, 'templates/workbench-ui.js'), 'utf8'))
const themesCss = normalize(readFileSync(join(root, 'templates/dsh-themes-motion.css'), 'utf8'))
const workbenchCss = normalize(readFileSync(join(root, 'templates/workbench.css'), 'utf8'))
const css = themesCss + '\n' + workbenchCss
let client = normalize(readFileSync(join(root, 'templates/client.js'), 'utf8'))
const directory = join(root, 'templates/panels')
const parts = existsSync(directory) ? readdirSync(directory).filter(name => name.endsWith('.js')).sort().map(name => normalize(readFileSync(join(directory, name), 'utf8'))).join('\n') : ''
const marker = 'const W = createWorkbenchUI(React, require);'
if (!client.includes(marker)) throw new Error('Workbench source marker missing')
client = client.replace(marker, () => marker + '\nconst CITE_WORKBENCH_CSS = ' + JSON.stringify(css) + ';\n' + parts)
mkdirSync(join(root, 'lib'), { recursive: true })
writeFileSync(join(root, 'lib/client.js'), '// Generated from templates/client.js, templates/panels/ and templates/workbench-ui.js. Edit the sources.\n(function () {\n' + switcher + '\n' + kit + '\n' + client + '\n})();\n')
