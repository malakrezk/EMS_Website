import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const before = JSON.parse(await fs.readFile('artifacts/before/routes.json', 'utf8'))
const after = JSON.parse(await fs.readFile('artifacts/after/routes.json', 'utf8'))
const differences = after.flatMap(current => {
  const original = before.find(item => item.width === current.width && item.route === current.route)
  return ['title', 'headings', 'links', 'overflow'].filter(key => JSON.stringify(original[key]) !== JSON.stringify(current[key])).map(key => ({ width: current.width, route: current.route, key, before: original[key], after: current[key] }))
})
await fs.writeFile('artifacts/content-comparison.json', JSON.stringify(differences, null, 2))
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const page = await browser.newPage()
const imageResults = []
for (const current of after) {
  const name = current.route === '/' ? 'home' : current.route.slice(1).replaceAll('/', '-')
  const filename = `${current.width}-${name}.png`
  const original = (await fs.readFile(`artifacts/before/${filename}`)).toString('base64')
  const updated = (await fs.readFile(`artifacts/after/${filename}`)).toString('base64')
  const result = await page.evaluate(async ({ original, updated }) => {
    const pixels = async base64 => {
      const image = new Image()
      image.src = 'data:image/png;base64,' + base64
      await image.decode()
      const canvas = document.createElement('canvas')
      canvas.width = image.width; canvas.height = image.height
      const context = canvas.getContext('2d')
      context.drawImage(image, 0, 0)
      return context.getImageData(0, 0, image.width, image.height).data
    }
    const [a, b] = await Promise.all([pixels(original), pixels(updated)])
    let different = 0
    for (let i = 0; i < a.length; i += 4) if (Math.max(Math.abs(a[i] - b[i]), Math.abs(a[i+1] - b[i+1]), Math.abs(a[i+2] - b[i+2])) > 20) different++
    return { changedPixelPercent: Math.round(different / (a.length / 4) * 10000) / 100 }
  }, { original, updated })
  imageResults.push({ filename, ...result })
}
await browser.close()
await fs.writeFile('artifacts/visual-comparison.json', JSON.stringify(imageResults, null, 2))
console.log(JSON.stringify({ contentDifferences: differences.length, images: imageResults }, null, 2))
