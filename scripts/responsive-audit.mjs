// Responsive audit. Opens every route at every viewport in each browser engine, scrolls through it like a reader,
// measures layout problems and saves a full-page screenshot.
//
//   npm run build && npx vite preview --host 127.0.0.1 --port 4173 --strictPort
//   node scripts/responsive-audit.mjs [options]
//
// Options:
//   --browsers chromium,firefox,webkit  engines (chromium drives the installed Chrome; the others need `npx playwright install`)
//   --viewports 320x568,390x844         viewports; default is the full device matrix below
//   --routes /,/about                   routes; default is every route in ROUTES
//   --extended                          also audit the other industry, project and service pages (no screenshots)
//   --motion                            keep animations on; the default is reduced motion, which lays pinned scenes out as lists
//   --sweep                             instead of the matrix, resize each page from 320px to 1920px in 10px steps and record overflow
//   --no-shots                          skip screenshots
//   --out artifacts/responsive          output folder
//   --concurrency 4
// The site address comes from AUDIT_BASE_URL (default http://127.0.0.1:4173).
import { chromium, firefox, webkit } from '@playwright/test'
import fs from 'node:fs/promises'
import path from 'node:path'

const args = process.argv.slice(2)
const option = (name, fallback) => {
  const index = args.indexOf(`--${name}`)
  return index === -1 ? fallback : args[index + 1]
}
const flag = name => args.includes(`--${name}`)

const BASE = process.env.AUDIT_BASE_URL || 'http://127.0.0.1:4173'
const OUT = option('out', 'artifacts/responsive')
const CONCURRENCY = Number(option('concurrency', 4))
const MOTION = flag('motion')
const SHOTS = !flag('no-shots')

// Phones, tablets, laptops and large screens, phones in landscape, and widths between the usual breakpoints.
const DEVICE_VIEWPORTS = [
  '320x568', '360x780', '375x667', '390x844', '430x932',
  '600x960', '768x1024', '1024x768', '1024x1366',
  '1280x800', '1366x768', '1440x900', '1920x1080', '2560x1440', '3840x2160',
  '667x375', '844x390', '932x430',
  '500x900', '900x1200', '1180x820', '1600x900',
]
// Pages with their own layout. Pages that share a template are represented by one or two examples.
const ROUTES = [
  '/', '/about', '/services', '/services/building-management', '/services/iot', '/services/scada', '/services/artificial-intelligence',
  '/industries/hospitals', '/solutions', '/projects', '/projects/data-center-operations', '/partners', '/mobile-app',
  '/store', '/cart', '/cart?filled', '/contact', '/missing-page',
]
const EXTENDED_ROUTES = [
  '/services/digital-twin', '/services/robotics-iot',
  ...['industrial', 'hotels', 'schools', 'water-systems', 'oil-gas', 'residential', 'commercial-buildings', 'airports', 'data-centers', 'smart-cities', 'government-facilities'].map(id => `/industries/${id}`),
  ...['zia-building-complex', 'water-treatment-plant-automation', 'smart-hospital', 'industrial-scada-system', 'al-attal-new-cairo', 'wadi-zaha-project'].map(id => `/projects/${id}`),
]
// A cart with an item, so the filled cart layout is audited too.
const FILLED_CART = [{ id: 'audit-cpu-1510', name: 'SIMATIC S7-1500 CPU 1510SP-1 PN for distributed automation', partNumber: '6ES7510-1DJ01-0AB0', price: null, image: '/store-products/CPU 1510.jpg', quantity: 2 }]

const browsers = option('browsers', 'chromium').split(',')
const viewports = option('viewports', DEVICE_VIEWPORTS.join(',')).split(',').map(value => {
  const [width, height] = value.split('x').map(Number)
  return { width, height, label: value }
})
const routes = option('routes', null)?.split(',') ?? [...ROUTES, ...(flag('extended') ? EXTENDED_ROUTES : [])]
const launchers = {
  chromium: () => chromium.launch({ channel: 'chrome', headless: true }),
  firefox: () => firefox.launch({ headless: true }),
  webkit: () => webkit.launch({ headless: true }),
}
const slug = route => route === '/' ? 'home' : route.slice(1).replace(/[/?]/g, '-')

/* ---------- Measurements, run inside the page ---------- */
function measure() {
  const vw = document.documentElement.clientWidth
  const vh = window.innerHeight
  const laidOut = el => el.checkVisibility ? el.checkVisibility({ visibilityProperty: true }) : getComputedStyle(el).visibility !== 'hidden'
  const painted = el => el.checkVisibility ? el.checkVisibility({ visibilityProperty: true, opacityProperty: true }) : laidOut(el)
  const decorative = el => !!el.closest('[aria-hidden="true"]')
  const describe = el => {
    const classes = [...el.classList].filter(name => /^[\w-]+$/.test(name)).slice(0, 3)
    const landmark = el.closest('section[id], footer, header, [id]')
    const where = landmark && landmark !== el ? ` in ${landmark.tagName.toLowerCase()}${landmark.id ? '#' + landmark.id : landmark.className && typeof landmark.className === 'string' ? '.' + landmark.className.trim().split(/\s+/)[0] : ''}` : ''
    return `${el.tagName.toLowerCase()}${el.id ? '#' + el.id : ''}${classes.length ? '.' + classes.join('.') : ''}${where}`
  }
  const sample = el => (el.innerText || el.getAttribute('alt') || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50)
  // The element and its ancestors that clip their content; full-width wrappers count as the page edge rather than as a component that clips on purpose.
  const clipCache = new Map()
  const clippers = el => {
    if (clipCache.has(el)) return clipCache.get(el)
    const list = []
    for (let node = el; node && node !== document.documentElement; node = node.parentElement) {
      const style = getComputedStyle(node)
      const x = style.overflowX, y = style.overflowY
      if (x === 'visible' && y === 'visible') continue
      const rect = node.getBoundingClientRect()
      const pageLevel = rect.width >= vw - 2 && rect.left <= 1
      list.push({ node, rect, x, y, pageLevel })
    }
    clipCache.set(el, list)
    return list
  }
  const scrolls = value => value === 'auto' || value === 'scroll'

  const result = {
    vw, vh, innerWidth, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth,
    pageHeight: document.documentElement.scrollHeight,
    escaping: [], clippedText: [], truncated: [], overlaps: [], stretched: [], upscaled: [], brokenMedia: [], pendingImages: [],
    smallTargets: [], smallText: { count: 0, examples: [] }, headings: [], heroRatio: null, maxFontSize: 0, scrollContainers: [],
  }

  // Text: every visible text node, with the box it occupies.
  const textBoxes = []
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, { acceptNode: node => node.textContent.trim() ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT })
  const range = document.createRange()
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    const owner = node.parentElement
    if (!owner || ['SCRIPT', 'STYLE', 'NOSCRIPT', 'TITLE'].includes(owner.tagName) || !laidOut(owner)) continue
    // Visually hidden text for screen readers is clipped to 1px on purpose.
    const ownerBox = owner.getBoundingClientRect()
    if (ownerBox.width <= 1 && ownerBox.height <= 1) continue
    range.selectNodeContents(node)
    const rect = range.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) continue
    // One box per rendered line: a wrapped phrase's overall box would otherwise cover its neighbours.
    const lines = [...range.getClientRects()].filter(line => line.width >= 1 && line.height >= 1).map(line => ({ left: line.left, right: line.right, top: line.top, bottom: line.bottom }))
    const style = getComputedStyle(owner)
    const size = parseFloat(style.fontSize)
    if (size > result.maxFontSize) result.maxFontSize = Math.round(size)
    if (size < 12 && painted(owner) && !decorative(owner)) {
      result.smallText.count++
      if (result.smallText.examples.length < 8) result.smallText.examples.push(`${size}px "${node.textContent.trim().slice(0, 30)}" ${describe(owner)}`)
    }
    // The part of each line that can actually be seen, after every clipping box around it. A line box is taller than
    // the letters in it, so the comparison uses the middle of the line (about the height of the ink).
    const inset = size * .22
    const seen = lines.map(line => {
      const box = { left: line.left, right: line.right, top: line.top + inset, bottom: line.bottom - inset }
      for (const clip of clippers(owner)) {
        if (clip.x !== 'visible') { box.left = Math.max(box.left, clip.rect.left); box.right = Math.min(box.right, clip.rect.right) }
        if (clip.y !== 'visible') { box.top = Math.max(box.top, clip.rect.top); box.bottom = Math.min(box.bottom, clip.rect.bottom) }
      }
      return box
    })
    textBoxes.push({ node, owner, rect, seen, size, painted: painted(owner), decorative: decorative(owner) || !!owner.closest('[aria-roledescription="carousel"]') })
  }

  for (const box of textBoxes) {
    const { owner, rect } = box
    const list = clippers(owner)
    const local = list.filter(clip => !clip.pageLevel)
    // Past the edge of the screen and not inside a component that clips it on purpose.
    if ((rect.right > vw + 1 || rect.left < -1) && !local.some(clip => clip.node !== owner && clip.x !== 'visible')) {
      result.escaping.push({ kind: 'text', el: describe(owner), text: box.node.textContent.trim().slice(0, 40), left: Math.round(rect.left), right: Math.round(rect.right), decorative: box.decorative })
      continue
    }
    // Cut off inside a component: past an ancestor that hides its overflow (scrollable containers are reported separately).
    // Ellipsis and line clamps cut text on purpose, so those are listed as truncated instead.
    const ownerStyle = getComputedStyle(owner)
    const clamp = ownerStyle.webkitLineClamp
    const intended = ownerStyle.textOverflow === 'ellipsis' || (clamp && clamp !== 'none')
    // Vertically, a line box overhangs its letters by about a fifth of the font size above and below, so allow that much.
    const slack = box.size * .3
    for (const clip of local) {
      const cutX = !scrolls(clip.x) && clip.x !== 'visible' && (rect.left < clip.rect.left - 1 || rect.right > clip.rect.right + 1)
      const cutY = !scrolls(clip.y) && clip.y !== 'visible' && (rect.top < clip.rect.top - slack || rect.bottom > clip.rect.bottom + slack)
      if (!cutX && !cutY) continue
      // Text pushed far outside its clipper is a slide or panel parked off-stage, not text cut in half.
      const parked = rect.right < clip.rect.left || rect.left > clip.rect.right || rect.bottom < clip.rect.top || rect.top > clip.rect.bottom
      if (!parked && box.painted) (intended ? result.truncated : result.clippedText).push({ el: describe(owner), text: box.node.textContent.trim().slice(0, 40), clipper: describe(clip.node), axis: cutX ? 'x' : 'y', decorative: box.decorative })
      break
    }
  }

  // Overlapping text: boxes of different elements, neither inside the other, that cross by more than a few pixels.
  const solid = textBoxes.filter(box => box.painted && !box.decorative)
  for (let i = 0; i < solid.length; i++) {
    for (let j = i + 1; j < solid.length; j++) {
      const a = solid[i], b = solid[j]
      if (a.owner === b.owner || a.owner.contains(b.owner) || b.owner.contains(a.owner)) continue
      if (a.rect.right < b.rect.left || b.rect.right < a.rect.left || a.rect.bottom < b.rect.top || b.rect.bottom < a.rect.top) continue
      const hit = a.seen.find(p => b.seen.some(q => Math.min(p.right, q.right) - Math.max(p.left, q.left) > 4 && Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top) > 2))
      if (hit && result.overlaps.length < 25) result.overlaps.push({ a: `${describe(a.owner)} "${a.node.textContent.trim().slice(0, 24)}"`, b: `${describe(b.owner)} "${b.node.textContent.trim().slice(0, 24)}"`, at: Math.round(hit.top + scrollY) })
    }
  }

  // Media and controls that leave the screen.
  for (const el of document.querySelectorAll('img, video, svg, canvas, iframe, a, button, input, select, textarea')) {
    if (el.closest('svg') !== el && el.closest('svg')) continue
    if (!laidOut(el)) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 2 || rect.height < 2) continue
    if (!(rect.right > vw + 1 || rect.left < -1)) continue
    if (clippers(el.parentElement ?? el).some(clip => !clip.pageLevel && clip.x !== 'visible')) continue
    // Slides of a carousel that peek past the edge are part of its design, and so are cropped background images (alt="").
    const imgStyle = el.tagName === 'IMG' ? getComputedStyle(el) : null
    const background = !!imgStyle && (el.getAttribute('alt') === '' || (imgStyle.position === 'absolute' && imgStyle.objectFit === 'cover'))
    const carousel = !!el.closest('[aria-roledescription="carousel"]') || background
    result.escaping.push({ kind: el.tagName.toLowerCase(), el: describe(el), text: sample(el), left: Math.round(rect.left), right: Math.round(rect.right), decorative: decorative(el) || carousel })
  }

  // Images and video: distorted, upscaled well past their file size, broken or never loaded.
  for (const el of document.querySelectorAll('img, video')) {
    if (!laidOut(el)) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 8 || rect.height < 8) continue
    const style = getComputedStyle(el)
    const isImg = el.tagName === 'IMG'
    const natural = isImg ? [el.naturalWidth, el.naturalHeight] : [el.videoWidth, el.videoHeight]
    const src = (isImg ? el.currentSrc || el.src : el.currentSrc || el.src || el.querySelector('source')?.src || '').replace(location.origin, '')
    if (isImg && el.complete && el.naturalWidth === 0) { result.brokenMedia.push({ el: describe(el), src }); continue }
    if (isImg && !el.complete) { result.pendingImages.push(src); continue }
    if (!isImg && el.error) { result.brokenMedia.push({ el: describe(el), src, error: el.error.code }); continue }
    if (!natural[0] || /\.svg(\?|$)/.test(src)) continue
    // Layout size, not the on-screen box: a 3D turn or scale changes the box without distorting the image itself.
    const boxW = el.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight)
    const boxH = el.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom)
    if (style.objectFit === 'fill') {
      const distortion = (boxW / boxH) / (natural[0] / natural[1])
      if (Math.abs(distortion - 1) > .03) result.stretched.push({ el: describe(el), src, box: `${Math.round(boxW)}x${Math.round(boxH)}`, natural: natural.join('x'), distortion: +distortion.toFixed(2) })
    }
    const scale = style.objectFit === 'cover' ? Math.max(boxW / natural[0], boxH / natural[1]) : Math.min(boxW / natural[0], boxH / natural[1])
    if (scale > 1.35 && boxW > 300) result.upscaled.push({ el: describe(el), src, scale: +scale.toFixed(2), box: `${Math.round(boxW)}x${Math.round(boxH)}`, natural: natural.join('x') })
  }

  // Controls smaller than 24px (WCAG 2.5.8), skipping links inside running text.
  for (const el of document.querySelectorAll('a[href], button, input:not([type=hidden]), select, textarea, [role="button"], summary')) {
    if (!painted(el) || decorative(el)) continue
    const rect = el.getBoundingClientRect()
    if (rect.width < 1 || rect.height < 1) continue
    const style = getComputedStyle(el)
    const inline = style.display === 'inline' && el.parentElement && /^(P|LI|SPAN|DD|TD)$/.test(el.parentElement.tagName)
    if (inline) continue
    // A positioned pseudo-element (as .touch-target adds) widens the hit area beyond the box.
    let [width, height] = [rect.width, rect.height]
    for (const pseudo of ['::before', '::after']) {
      const extra = getComputedStyle(el, pseudo)
      if (extra.content === 'none' || extra.position !== 'absolute') continue
      width = Math.max(width, parseFloat(extra.width) || 0)
      height = Math.max(height, parseFloat(extra.height) || 0)
    }
    if (width < 24 || height < 24) result.smallTargets.push({ el: describe(el), text: sample(el), size: `${Math.round(width)}x${Math.round(height)}` })
  }

  // Containers that scroll sideways: fine when intended, but they must look scrollable.
  for (const el of document.querySelectorAll('body *')) {
    const style = getComputedStyle(el)
    if (!scrolls(style.overflowX) || el.scrollWidth <= el.clientWidth + 2 || !laidOut(el)) continue
    result.scrollContainers.push({ el: describe(el), overflowBy: el.scrollWidth - el.clientWidth })
  }

  // Headings: size and number of lines.
  for (const el of document.querySelectorAll('h1, h2')) {
    if (!laidOut(el)) continue
    range.selectNodeContents(el)
    const tops = new Set([...range.getClientRects()].filter(rect => rect.width > 1).map(rect => Math.round(rect.top)))
    if (!tops.size) continue
    result.headings.push({ tag: el.tagName.toLowerCase(), text: el.textContent.trim().replace(/\s+/g, ' ').slice(0, 48), size: Math.round(parseFloat(getComputedStyle(el).fontSize)), lines: tops.size })
  }

  const hero = document.querySelector('main section, main > div > section, main > div > div > section')
  if (hero) result.heroRatio = +(hero.getBoundingClientRect().height / vh).toFixed(2)
  return result
}

// Lighter check used while the page scrolls with animations on: anything with content that leaves the screen.
function escapingNow() {
  const vw = document.documentElement.clientWidth
  const found = []
  for (const el of document.querySelectorAll('main *, footer *')) {
    const rect = el.getBoundingClientRect()
    if (rect.bottom < 0 || rect.top > innerHeight || rect.width < 2 || !(rect.right > vw + 1 || rect.left < -1)) continue
    if (el.closest('[aria-hidden="true"], [aria-roledescription="carousel"]')) continue
    const hasContent = /^(IMG|VIDEO|CANVAS|BUTTON|A|INPUT)$/.test(el.tagName) || [...el.childNodes].some(node => node.nodeType === 3 && node.textContent.trim())
    if (!hasContent) continue
    let clipped = false
    for (let node = el.parentElement; node && node !== document.body; node = node.parentElement) {
      const style = getComputedStyle(node)
      if (style.overflowX === 'visible') continue
      const box = node.getBoundingClientRect()
      if (!(box.width >= vw - 2 && box.left <= 1)) { clipped = true; break }
    }
    if (!clipped) found.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')} ${Math.round(rect.left)}..${Math.round(rect.right)}`)
  }
  return { overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth, found: found.slice(0, 6) }
}

/* ---------- Driving the pages ---------- */
async function scrollThrough(page, onStep) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  const step = await page.evaluate(() => Math.round(innerHeight * .7))
  for (let y = 0; y < height; y += step) {
    await page.evaluate(top => window.scrollTo(0, top), y)
    await page.waitForTimeout(MOTION ? 260 : 90)
    if (onStep) await onStep(y)
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight))
  await page.waitForTimeout(400)
  await page.evaluate(() => window.scrollTo(0, 0))
  await page.waitForTimeout(MOTION ? 900 : 400)
}

async function audit(browser, engine, viewport, route) {
  const touch = viewport.width < 1024 || viewport.height < 600
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    deviceScaleFactor: 1,
    hasTouch: touch,
    ...(engine === 'firefox' ? {} : { isMobile: touch && viewport.width < 1024 }),
    reducedMotion: MOTION ? 'no-preference' : 'reduce',
  })
  if (route === '/cart?filled') await context.addInitScript(items => window.localStorage.setItem('ems-store-cart', JSON.stringify(items)), FILLED_CART)
  const page = await context.newPage()
  const record = { engine, viewport: viewport.label, route, console: [], failed: [] }
  page.on('pageerror', error => record.console.push(`pageerror: ${error.message.slice(0, 200)}`))
  page.on('console', message => { if (message.type() === 'error') record.console.push(`console: ${message.text().slice(0, 200)}`) })
  page.on('requestfailed', request => {
    const reason = request.failure()?.errorText ?? ''
    // Media streams are cancelled on navigation and when a video pauses; that is not a failure.
    if (/ABORTED|NS_BINDING_ABORTED|cancelled/i.test(reason) && ['media', 'image'].includes(request.resourceType())) return
    // Firefox reports a video it already holds in its cache this way; nothing failed.
    if (/NS_ERROR_PARSED_DATA_CACHED/.test(reason)) return
    record.failed.push(`${request.resourceType()} ${request.url().replace(BASE, '')} ${reason}`)
  })
  page.on('response', response => { if (response.status() >= 400 && !response.url().includes('/missing-page')) record.failed.push(`${response.status()} ${response.url().replace(BASE, '')}`) })
  try {
    await page.goto(`${BASE}${route === '/cart?filled' ? '/cart' : route}`, { waitUntil: 'load', timeout: 60000 })
    await page.locator('h1').first().waitFor({ state: 'attached', timeout: 15000 }).catch(() => record.console.push('no h1 found'))
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(MOTION ? 1600 : 500)
    if (MOTION) {
      const steps = []
      await scrollThrough(page, async y => {
        const now = await page.evaluate(escapingNow)
        if (now.overflow > 0 || now.found.length) steps.push({ y, ...now })
      })
      record.motion = steps
    } else {
      await scrollThrough(page)
    }
    Object.assign(record, await page.evaluate(measure))
    if (SHOTS && !EXTENDED_ROUTES.includes(route)) {
      const file = path.join(OUT, engine, viewport.label, `${slug(route)}.jpg`)
      await fs.mkdir(path.dirname(file), { recursive: true })
      await page.screenshot({ path: file, fullPage: true, type: 'jpeg', quality: 55, timeout: 60000 })
        .catch(async error => {
          record.console.push(`full-page screenshot failed (${error.message.slice(0, 80)}); saved the first screen instead`)
          await page.screenshot({ path: file, type: 'jpeg', quality: 55 })
        })
      record.screenshot = file
    }
  } catch (error) {
    record.error = error.message.slice(0, 300)
  } finally {
    await context.close()
  }
  return record
}

async function sweep(browser, engine, route) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await context.newPage()
  const record = { engine, route, widths: [] }
  try {
    await page.goto(`${BASE}${route}`, { waitUntil: 'load', timeout: 60000 })
    await page.evaluate(() => document.fonts.ready)
    await scrollThrough(page)
    for (let width = 320; width <= 1920; width += 10) {
      await page.setViewportSize({ width, height: 900 })
      await page.waitForTimeout(140)
      const result = await page.evaluate(() => {
        const vw = document.documentElement.clientWidth
        const offenders = []
        for (const el of document.querySelectorAll('body *')) {
          if (!el.checkVisibility({ visibilityProperty: true })) continue
          const hasText = [...el.childNodes].some(node => node.nodeType === 3 && node.textContent.trim())
          if (!hasText && !/^(IMG|VIDEO|BUTTON|A|INPUT)$/.test(el.tagName)) continue
          if (el.closest('[aria-hidden="true"], [aria-roledescription="carousel"]')) continue
          const rect = el.getBoundingClientRect()
          if (rect.width < 2 || !(rect.right > vw + 1 || rect.left < -1)) continue
          let clipped = false
          for (let node = el.parentElement; node && node !== document.documentElement; node = node.parentElement) {
            const style = getComputedStyle(node)
            if (style.overflowX === 'visible') continue
            const box = node.getBoundingClientRect()
            if (!(box.width >= vw - 2 && box.left <= 1)) { clipped = true; break }
          }
          if (!clipped) offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].slice(0, 2).join('.')} "${(el.textContent || el.getAttribute('alt') || '').trim().slice(0, 24)}" ${Math.round(rect.left)}..${Math.round(rect.right)}`)
        }
        return { overflow: document.documentElement.scrollWidth - vw, offenders: offenders.slice(0, 4) }
      })
      if (result.overflow > 0 || result.offenders.length) record.widths.push({ width, ...result })
    }
  } catch (error) {
    record.error = error.message.slice(0, 300)
  } finally {
    await context.close()
  }
  return record
}

async function pool(jobs, size) {
  const results = []
  let next = 0
  await Promise.all(Array.from({ length: size }, async () => {
    while (next < jobs.length) {
      const job = jobs[next++]
      results.push(await job())
    }
  }))
  return results
}

/* ---------- Report ---------- */
// One line per distinct finding, with every viewport it appears at, grouped by route.
function summarise(records) {
  const findings = new Map()
  const add = (record, category, detail) => {
    const key = `${record.route}\u0000${category}\u0000${detail}`
    if (!findings.has(key)) findings.set(key, { route: record.route, category, detail, where: [] })
    findings.get(key).where.push(`${record.engine === 'chromium' ? '' : record.engine + ' '}${record.viewport}`)
  }
  for (const record of records) {
    if (record.error) add(record, 'error', record.error)
    if (record.scrollWidth > record.vw) add(record, 'page scrolls sideways', `${record.scrollWidth - record.vw}px`)
    for (const item of record.escaping?.filter(item => !item.decorative) ?? []) add(record, 'past the screen edge', `${item.kind} ${item.el} "${item.text}"`)
    for (const item of record.clippedText ?? []) add(record, 'cut-off text', `${item.el} "${item.text}" (${item.axis}, clipped by ${item.clipper})`)
    for (const item of record.overlaps ?? []) add(record, 'overlapping text', `${item.a} × ${item.b}`)
    for (const item of record.stretched ?? []) add(record, 'stretched media', `${item.el} ${item.src}`)
    for (const item of record.brokenMedia ?? []) add(record, 'broken media', `${item.el} ${item.src}`)
    for (const src of new Set(record.pendingImages ?? [])) add(record, 'image not loaded after scrolling', src)
    for (const item of new Set(record.failed ?? [])) add(record, 'failed request', item)
    for (const item of new Set(record.console ?? [])) add(record, 'console error', item)
    for (const item of record.smallTargets ?? []) add(record, 'target under 24px', `${item.el} "${item.text}"`)
    for (const step of record.motion ?? []) for (const item of step.found) add(record, 'leaves the screen while scrolling', item.replace(/ -?\d+\.\.-?\d+$/, ''))
  }
  const byRoute = new Map()
  for (const finding of findings.values()) {
    if (!byRoute.has(finding.route)) byRoute.set(finding.route, [])
    byRoute.get(finding.route).push(finding)
  }
  const lines = []
  for (const [route, list] of byRoute) {
    lines.push(route)
    for (const finding of list.sort((a, b) => a.category.localeCompare(b.category))) {
      const where = [...new Set(finding.where)]
      lines.push(`  - ${finding.category}: ${finding.detail}  [${where.length > 6 ? `${where.length} viewports: ${where.slice(0, 6).join(', ')}…` : where.join(', ')}]`)
    }
  }
  return lines.join('\n')
}

await fs.mkdir(OUT, { recursive: true })
const all = []
for (const engine of browsers) {
  const browser = await launchers[engine]()
  const started = Date.now()
  let records
  if (flag('sweep')) {
    records = await pool(routes.map(route => () => sweep(browser, engine, route)), CONCURRENCY)
    for (const record of records) {
      const bad = record.widths ?? []
      console.log(`${engine} ${record.route}: ${record.error ? 'ERROR ' + record.error : bad.length ? `${bad.length} widths with overflow, first ${bad[0].width}px: ${bad[0].offenders.join(' | ')}` : 'no overflow 320–1920'}`)
    }
  } else {
    const jobs = []
    for (const viewport of viewports) for (const route of routes) jobs.push(() => audit(browser, engine, viewport, route))
    records = await pool(jobs, CONCURRENCY)
    records.sort((a, b) => a.route.localeCompare(b.route) || parseInt(a.viewport) - parseInt(b.viewport))
    console.log(summarise(records) || 'No issues found.')
  }
  console.log(`${engine}: ${records.length} checks in ${Math.round((Date.now() - started) / 1000)}s`)
  all.push(...records)
  await browser.close()
}
const reportFile = path.join(OUT, `report${flag('sweep') ? '-sweep' : MOTION ? '-motion' : ''}-${browsers.join('-')}.json`)
await fs.writeFile(reportFile, JSON.stringify(all, null, 2))
console.log(`Report: ${reportFile}`)
