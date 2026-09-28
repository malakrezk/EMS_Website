import { chromium } from '@playwright/test'
import fs from 'node:fs/promises'

const phase = process.argv[2] || 'after'
const browser = await chromium.launch({ channel: 'chrome', headless: true })
const routes = ['/', '/about', '/services', '/services/scada', '/industries/hospitals', '/solutions', '/case-studies', '/case-studies/data-center-operations', '/partners', '/contact', '/store', '/cart', '/missing-page']
const results = []
await fs.mkdir(`artifacts/${phase}`, { recursive: true })
for (const width of [1440, 768, 390]) {
  const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  for (const route of routes) {
    errors.length = 0
    await page.goto(`http://127.0.0.1:5173${route}`, { waitUntil: 'domcontentloaded' })
    await page.locator('h1').first().waitFor({ state: 'attached' })
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(500)
    await page.evaluate(() => document.querySelectorAll('video').forEach(video => { video.pause(); video.currentTime = 0 }))
    const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '-')
    await page.screenshot({ path: `artifacts/${phase}/${width}-${name}.png`, animations: 'disabled' })
    const metrics = await page.evaluate(() => ({
      title: document.title,
      headings: [...document.querySelectorAll('h1,h2,h3')].map(node => node.textContent),
      overflow: document.documentElement.scrollWidth > innerWidth,
      links: [...document.querySelectorAll('a')].map(node => node.getAttribute('href')),
      fonts: document.fonts.status,
    }))
    results.push({ width, route, ...metrics, errors: [...errors] })
  }
  await context.close()
}
await fs.writeFile(`artifacts/${phase}/routes.json`, JSON.stringify(results, null, 2))
await browser.close()
console.log(`Captured ${results.length} route/viewport combinations to artifacts/${phase}`)

