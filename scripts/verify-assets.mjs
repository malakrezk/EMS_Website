import fs from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const source = fs.readFileSync('src/constants/images.ts', 'utf8')
const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
const { images } = await import('data:text/javascript;base64,' + Buffer.from(code).toString('base64'))
const missing = Object.values(images).filter(url => !fs.existsSync(path.join('public', decodeURIComponent(url))))
console.log(`Checked ${Object.keys(images).length} registered local media assets.`)
if (missing.length) {
  console.error('Missing assets:', missing)
  process.exitCode = 1
} else console.log('All registered local assets exist.')

for (const font of ['@fontsource/cormorant-garamond/600.css', '@fontsource/space-grotesk/500.css']) {
  if (!fs.existsSync(path.join('node_modules', font))) { console.error('Missing local font:', font); process.exitCode = 1 }
}
