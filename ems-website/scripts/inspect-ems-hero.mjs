import { chromium } from 'playwright-core'
import os from 'node:os'
import path from 'node:path'

const browser = await chromium.launch({ headless: true, executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe' })
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } })
await page.setContent('<style>body{margin:0;background:#000}video{width:100vw;height:100vh;object-fit:contain}</style><video muted src="http://127.0.0.1:5177/ems-infrastructure-hero.mp4"></video>')
await page.waitForFunction(() => document.querySelector('video').readyState >= 2)
const duration = await page.locator('video').evaluate(video => video.duration)
for (let index = 0; index < 6; index += 1) {
  await page.locator('video').evaluate((video, time) => { video.currentTime = time }, duration * ((index + .5) / 6))
  await page.waitForTimeout(550)
  await page.screenshot({ path: path.join(os.tmpdir(), `ems-infrastructure-frame-${index + 1}.png`) })
}
console.log(`duration=${duration}`)
await browser.close()
