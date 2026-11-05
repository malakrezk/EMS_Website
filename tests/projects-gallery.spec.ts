import { expect, test, type Page } from '@playwright/test'
import { images } from '../src/constants/images'

// Expected homepage showcase order (the order named under its heading), assets, button labels and destinations.
// `heading` is the title over the service text when it differs from the card's short title.
// `wide` is the image of the large card when it differs from the background; `fit` is 'contain' where that image shows whole, smaller.
const homeServiceShowcase: { title: string; heading?: string; points?: string[]; background: string; cta: string; to: string; wide?: string; fit?: 'contain' }[] = [
  { title: 'BMS', heading: 'Building Management Systems', points: ['Centralized Building Management', 'Smart Automation & Energy Efficiency', 'Intelligent Building Integration', 'BMS Modernization & Digital Transformation'], background: images.showcaseBmsDashboard, cta: 'Explore BMS Solutions', to: '/services/building-management' },
  { title: 'SCADA', points: ['Water & Wastewater Automation', 'Centralized Monitoring & Control', 'PLC & SCADA Integration', 'SCADA Modernization & Digital Operations'], background: images.homeServiceDigitalTwin, cta: 'Explore SCADA Solutions', to: '/services/scada' },
  { title: 'IoT', points: ['Connected Assets & Sensors', 'Remote Asset Monitoring', 'IoT Dashboards & Operational Insights', 'BMS & SCADA Integration'], background: images.iotDashboard, cta: 'Explore IoT Solutions', to: '/services/iot' },
  { title: 'AI', heading: 'Artificial Intelligence', points: ['Predictive Maintenance & Fault Detection', 'Intelligent Energy Management', 'Operational Analytics & Anomaly Detection', 'AI & Digital Twin Integration'], background: images.homeServiceAi, cta: 'Explore AI Solutions', to: '/services/artificial-intelligence' },
  { title: 'Digital Twin', points: ['Connected Digital Asset Representation', 'Operational Status & Performance Visualization', 'Maintenance & Energy Analysis', 'BMS, SCADA & AI Integration'], background: images.solutionsApproachDashboard, cta: 'Explore Digital Twin Solutions', to: '/services/digital-twin' },
  { title: 'Robotics', points: ['Interactive Virtual Assistant', 'Voice & Text Interaction', 'Operational Data Assistance', 'Integrated Platform Support'], background: images.homeServiceRobotics, cta: 'Explore Robotics Solutions', to: '/services/robotics-iot', fit: 'contain' },
  { title: 'Mobile Applications', points: ['Mobile Monitoring & Dashboards', 'Alarms & Event Notifications', 'Maintenance & Work Order Management', 'Connected Multi-Site Operations'], background: images.parkLaneMobileApp, fit: 'contain', cta: 'Explore Mobile App Solutions', to: '/mobile-app' },
]

// Scroll progress that settles on scene k (0-based) of the 6-scene gallery timeline.
const sceneProgress = (scene: number) => (scene * 2.6 + .4) / (5 * 2.6 + .8)

async function scrollStory(page: Page, progress: number) {
  await page.locator('#project-gallery').evaluate((section, position) => {
    const spacer = section.parentElement
    if (!spacer?.classList.contains('pin-spacer')) throw new Error('Gallery is not pinned')
    const start = spacer.getBoundingClientRect().top + window.scrollY
    const distance = spacer.offsetHeight - (section as HTMLElement).offsetHeight
    window.scrollTo({ top: start + distance * position, behavior: 'instant' })
  }, progress)
}

for (const width of [1440, 768]) {
  test(`layered story scrubs forward and backward at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    await page.goto('/projects')
    await page.evaluate(() => document.fonts.ready)
    const gallery = page.locator('#project-gallery')
    await expect(gallery.locator('..')).toHaveClass(/pin-spacer/)
    const photos = gallery.locator('.project-story-photo')
    const counter = gallery.locator('.project-story-counter')
    await scrollStory(page, .06)
    await expect(counter).toHaveText('01 / 06')
    await expect.poll(async () => Math.abs((await gallery.boundingBox())?.y ?? -999)).toBeLessThan(1)
    const initial = await photos.first().getAttribute('style')
    const initialProgress = await gallery.locator('.project-story-progress-fill').getAttribute('style')
    for (const image of await photos.locator('img').all()) {
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      expect(await image.getAttribute('src')).toMatch(/^\//)
    }
    // Halfway through the first transition, while both photos overlap.
    await scrollStory(page, sceneProgress(.5))
    await expect.poll(() => photos.first().getAttribute('style')).not.toBe(initial)
    const boxes = await photos.evaluateAll(nodes => nodes.map(node => {
      const box = node.getBoundingClientRect()
      return { left: box.left, right: box.right, top: box.top, bottom: box.bottom }
    }))
    expect(boxes[0].left).toBeLessThan(boxes[1].right)
    expect(boxes[0].right).toBeGreaterThan(boxes[1].left)
    expect(boxes[0].bottom).toBeGreaterThan(boxes[1].top)
    await scrollStory(page, sceneProgress(1))
    await expect(counter).toHaveText('02 / 06')
    await expect(gallery.getByRole('heading', { name: 'ZIA Building Complex', exact: true })).toBeVisible()
    await expect(gallery.getByRole('link', { name: 'View Project', exact: true })).toHaveAttribute('href', '/projects/zia-building-complex')
    await page.screenshot({ path: `artifacts/projects-cinematic/${width}-layered-scene.png` })
    await scrollStory(page, .96)
    await expect(counter).toHaveText('06 / 06')
    await expect(gallery.getByRole('button', { name: 'Next project', exact: true })).toBeDisabled()
    await expect(gallery.getByRole('heading', { name: 'Investors-Ext Sewage Lifting Station', exact: true })).toBeVisible()
    await expect(gallery.getByRole('link', { name: 'Explore Water', exact: true })).toHaveAttribute('href', '/industries/water-systems')
    await scrollStory(page, .06)
    await expect(counter).toHaveText('01 / 06')
    await expect.poll(() => photos.first().getAttribute('style')).toBe(initial)
    expect(await gallery.locator('.project-story-progress-fill').getAttribute('style')).toBe(initialProgress)
    await scrollStory(page, 1.2)
    await expect.poll(async () => (await gallery.boundingBox())?.y ?? 0).toBeLessThan(-50)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('buttons use the scroll timeline and clean up on detail navigation', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/projects')
  await page.evaluate(() => document.fonts.ready)
  const gallery = page.locator('#project-gallery')
  await expect(gallery.locator('..')).toHaveClass(/pin-spacer/)
  await scrollStory(page, .06)
  await gallery.getByRole('button', { name: 'Next project', exact: true }).click()
  await expect(gallery.locator('.project-story-counter')).toHaveText('02 / 06')
  await gallery.getByRole('group', { name: 'EMS projects gallery' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(gallery.locator('.project-story-counter')).toHaveText('03 / 06')
  await gallery.getByRole('button', { name: 'Previous project', exact: true }).click()
  await expect(gallery.locator('.project-story-counter')).toHaveText('02 / 06')
  await gallery.getByRole('link', { name: 'View Project', exact: true }).click()
  await expect(page).toHaveURL(/\/projects\/zia-building-complex$/)
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await page.goBack()
  await expect(page.locator('#project-gallery').locator('..')).toHaveClass(/pin-spacer/)
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
})

test('media changes remove pinning and preserve readable project content', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/projects')
  const gallery = page.locator('#project-gallery')
  await expect(gallery.locator('..')).toHaveClass(/pin-spacer/)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(gallery.getByRole('link', { name: 'View Project', exact: true })).toHaveCount(2)
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('.pin-spacer')).toHaveCount(1)
  await page.setViewportSize({ width: 390, height: 844 })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(gallery.getByRole('heading', { level: 3 })).toHaveCount(6)
  const boxes = await gallery.locator('.project-story-scene').evaluateAll(nodes => nodes.map(node => {
    const box = node.getBoundingClientRect()
    return { top: box.top, bottom: box.bottom }
  }))
  expect(boxes[1].top).toBeGreaterThan(boxes[0].bottom)
  expect(boxes[2].top).toBeGreaterThan(boxes[1].bottom)
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('home services showcase pairs every service with its photo and route', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const services = page.locator('#home-services')
  await services.scrollIntoViewIfNeeded()
  await expect(services.getByRole('heading', { level: 2 })).toHaveText('Engineering Solutions')
  // One pill per service, in the order of the cards.
  const pills = services.getByRole('group', { name: 'Choose a service' }).getByRole('button')
  await expect(pills).toHaveText(['BMS', 'SCADA', 'IoT', 'AI', 'Digital Twin', 'Robotics', 'Mobile Applications'])
  // The button names the service in focus but keeps one width throughout.
  const ctaWidths: number[] = []
  for (const [index, service] of homeServiceShowcase.entries()) {
    await expect(services.locator('.home-showcase-title').last()).toHaveText(service.heading ?? service.title)
    // A service with key points lists them in place of its one-line description.
    if (service.points) await expect(services.locator('.home-showcase-description:not(.is-sizer)').last().locator('.home-showcase-points:not([aria-hidden]) .home-showcase-point-title')).toHaveText(service.points)
    // Only the pill of the service in focus is pressed.
    await expect(pills.nth(index)).toHaveAttribute('aria-pressed', 'true')
    await expect(services.locator('.home-showcase-pill[aria-pressed="true"]')).toHaveCount(1)
    // The large card shows the service's photo, the wide image or else the background, over the strip's view of the same photo.
    const card = services.locator('.home-showcase-card.is-active img.is-strip')
    await expect(card).toHaveAttribute('src', service.wide ?? service.background)
    await expect(card).not.toHaveAttribute('alt', '')
    const wide = services.locator('.home-showcase-card.is-active img.is-wide')
    await expect(wide).toHaveAttribute('src', service.wide ?? service.background)
    await expect.poll(() => wide.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    // The next service waits in the strip beside it, showing the photo its large card will show.
    const next = homeServiceShowcase[(index + 1) % homeServiceShowcase.length]
    await expect(services.locator('.home-showcase-card:not(.is-active):not([aria-hidden="true"]) img.is-strip')).toHaveAttribute('src', next.wide ?? next.background)
    const cta = services.getByRole('link', { name: service.cta, exact: true })
    await expect(cta).toHaveAttribute('href', service.to)
    ctaWidths.push(Math.round((await cta.boundingBox())?.width ?? 0))
    await pills.nth((index + 1) % homeServiceShowcase.length).click()
  }
  expect(new Set(ctaWidths).size).toBe(1)
  await expect(services.locator('.home-showcase-title').last()).toHaveText(homeServiceShowcase[0].heading ?? homeServiceShowcase[0].title)
})

for (const width of [1440, 768, 390]) {
  test(`home services showcase shows a wide card beside a narrow strip, fully filled, at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const services = page.locator('#home-services')
    await services.scrollIntoViewIfNeeded()
    for (let step = 0; step < homeServiceShowcase.length; step++) {
      const frame = services.locator('.home-showcase-card.is-active .home-showcase-card-frame')
      const strip = services.locator('.home-showcase-card:not(.is-active):not([aria-hidden="true"]) .home-showcase-card-frame')
      const image = frame.locator('img.is-wide')
      await expect(image).toHaveCSS('object-fit', homeServiceShowcase[step].fit ?? 'cover')
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
      await expect(strip).toHaveCount(1)
      const [frameBox, imageBox, stripBox] = await Promise.all([frame.boundingBox(), image.boundingBox(), strip.boundingBox()])
      if (!frameBox || !imageBox || !stripBox) throw new Error('Active showcase card or strip is missing')
      // The shown card is landscape; the next one is a narrow strip of the same height to its right.
      expect(frameBox.width).toBeGreaterThan(frameBox.height)
      expect(stripBox.width).toBeLessThan(frameBox.width * .3)
      expect(Math.abs(stripBox.height - frameBox.height)).toBeLessThan(2)
      expect(stripBox.x).toBeGreaterThan(frameBox.x + frameBox.width)
      // The strip ends inside the page, short of its edge, rather than running off it.
      expect(stripBox.x + stripBox.width).toBeLessThanOrEqual(width - 12)
      expect(Math.abs(imageBox.width - frameBox.width)).toBeLessThan(3)
      expect(Math.abs(imageBox.height - frameBox.height)).toBeLessThan(3)
      await services.locator('.home-showcase-pill').nth((step + 1) % homeServiceShowcase.length).click()
    }
    // The pills wrap inside the page rather than running off it.
    const pills = await services.locator('.home-showcase-pills').boundingBox()
    expect(pills && pills.x + pills.width).toBeLessThanOrEqual(width)
    for (const pill of await services.locator('.home-showcase-pill').all()) {
      const box = await pill.boundingBox()
      expect(box && box.x + box.width).toBeLessThanOrEqual(width)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

for (const [width, height] of [[1440, 900], [1280, 800]]) {
  test(`home services showcase text lines up with the heading, pills and card at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const services = page.locator('#home-services')
    await services.scrollIntoViewIfNeeded()
    const frame = services.locator('.home-showcase-card.is-active .home-showcase-card-frame')
    const image = frame.locator('img.is-wide')
    await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    const [frameBox, titleBox, windowBox, ctaBox, pillsBox, introBox] = await Promise.all([
      frame.boundingBox(),
      services.locator('.home-showcase-text .home-showcase-title:not(.is-sizer)').boundingBox(),
      services.locator('.home-showcase-desc-row').boundingBox(),
      services.locator('.home-showcase-cta').boundingBox(),
      services.locator('.home-showcase-pills').boundingBox(),
      services.locator('.home-showcase-intro').boundingBox(),
    ])
    if (!frameBox || !titleBox || !windowBox || !ctaBox || !pillsBox || !introBox) throw new Error('Showcase card, text, button, pills or heading is missing')
    // The service's title is centred above the row, with the pills centred under it. Under them the text and the photo stand apart, with no
    // panel shared between them and no caption over either card: the key points' window starts level with the photo's top, and the button
    // follows the window and ends level with its bottom.
    await expect(services.locator('.home-showcase-intro')).toHaveCSS('text-align', 'center')
    expect(titleBox.y + titleBox.height).toBeLessThanOrEqual(pillsBox.y)
    expect(pillsBox.y + pillsBox.height).toBeLessThanOrEqual(introBox.y + introBox.height)
    expect(Math.abs(pillsBox.x + pillsBox.width / 2 - (titleBox.x + titleBox.width / 2))).toBeLessThan(2)
    const pillRow = await services.locator('.home-showcase-pill').evaluateAll(pills => pills.map(pill => pill.getBoundingClientRect().top))
    expect(new Set(pillRow.map(Math.round)).size).toBe(1)
    expect(introBox.y + introBox.height).toBeLessThan(frameBox.y)
    await expect(services.locator('.home-showcase-panel')).toHaveCount(0)
    expect(windowBox.x + windowBox.width).toBeLessThan(frameBox.x)
    await expect(services.locator('.home-showcase-card-caption')).toHaveCount(0)
    expect(Math.abs(windowBox.y - frameBox.y)).toBeLessThan(2)
    expect(Math.abs(ctaBox.x - windowBox.x)).toBeLessThan(2)
    expect(ctaBox.y).toBeGreaterThan(windowBox.y + windowBox.height)
    expect(Math.abs(ctaBox.y + ctaBox.height - (frameBox.y + frameBox.height))).toBeLessThan(2)
    // The photo stands whole on its own card, with no fade into the text beside it.
    await expect(frame).toHaveCSS('mask-image', 'none')
    // The card has its image's shape, so the dashboard in it shows whole.
    const ratio = await image.evaluate(node => (node as HTMLImageElement).naturalWidth / (node as HTMLImageElement).naturalHeight)
    expect(Math.abs(frameBox.width / frameBox.height - ratio)).toBeLessThan(.02)
  })
}

test('home services showcase loops the key points beside the photo and holds them under the pointer', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const services = page.locator('#home-services')
  await services.scrollIntoViewIfNeeded()
  const pointsWindow = services.locator('.home-showcase-desc-row')
  const loop = services.locator('.home-showcase-description:not(.is-sizer) .home-showcase-loop')
  // The list climbs inside a clipped window, followed by a copy that assistive technology skips.
  await expect(pointsWindow).toHaveCSS('overflow', 'hidden')
  await expect(loop).toHaveCSS('animation-name', 'homeShowcaseLoop')
  await expect(loop.locator('.home-showcase-points')).toHaveCount(2)
  await expect(loop.locator('.home-showcase-points').nth(1)).toHaveAttribute('aria-hidden', 'true')
  // It moves on its own and holds still while the pointer is over it.
  const offset = () => loop.evaluate(node => new DOMMatrix(getComputedStyle(node).transform).m42)
  const start = await offset()
  await expect.poll(offset).toBeLessThan(start - 5)
  await pointsWindow.hover()
  await expect(loop).toHaveCSS('animation-play-state', 'paused')
  const held = await offset()
  await page.waitForTimeout(600)
  expect(await offset()).toBeCloseTo(held, 0)
})
