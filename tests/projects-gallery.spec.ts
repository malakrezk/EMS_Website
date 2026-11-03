import { expect, test, type Page } from '@playwright/test'
import { images } from '../src/constants/images'

// Expected homepage showcase order (the order named under its heading), assets and destinations.
// `wide` is the image of the large card when it differs from the background.
const homeServiceShowcase: { title: string; card: string; background: string; to: string; wide?: string }[] = [
  { title: 'BMS', card: images.showcaseBmsCard, background: images.showcaseBmsBackground, wide: images.solutionsApproachDashboard, to: '/services/building-management' },
  { title: 'SCADA', card: images.showcaseScadaCard, background: images.serviceScadaHero, to: '/services/scada' },
  { title: 'IoT', card: images.homeServiceIotCard, background: images.showcaseIotBackground, wide: images.iotDashboard, to: '/services/iot' },
  { title: 'AI', card: images.showcaseAiCard, background: images.showcaseAiBackground, to: '/services/artificial-intelligence' },
  { title: 'Digital Twin', card: images.showcaseDigitalTwinCard, background: images.solutionsApproachDashboard, to: '/digital-twin' },
  { title: 'Robotics', card: images.homeServiceRoboticsCard, background: images.homeServiceRobotics, to: '/services/robotics-iot' },
  { title: 'Mobile Applications', card: images.showcaseMobileApplicationsCard, background: images.parkLaneMobileApp, to: '/mobile-app' },
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

test('home services showcase pairs every service with its portrait card, background and route', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  const services = page.locator('#home-services')
  await services.scrollIntoViewIfNeeded()
  await expect(services.getByRole('heading', { level: 2 })).toHaveText('Engineering Solutions')
  await expect(services.locator('.home-showcase-services')).toHaveText('BMS · SCADA · IoT · AI · Digital Twin · Robotics · Mobile Applications')
  // BMS lists its three key points in place of its one-line description.
  await expect(services.locator('.home-showcase-description:not(.is-sizer) .home-showcase-point-title')).toHaveText(['Centralized Building Management', 'Smart Automation & Energy Efficiency', 'Intelligent Building Integration'])
  for (const [index, service] of homeServiceShowcase.entries()) {
    await expect(services.locator('.home-showcase-title').last()).toHaveText(service.title)
    await expect(services.locator('.home-showcase-count').first()).toHaveText(String(index + 1).padStart(2, '0'))
    const card = services.locator('.home-showcase-card.is-active img.is-tall')
    await expect(card).toHaveAttribute('src', service.card)
    await expect(card).not.toHaveAttribute('alt', '')
    // The large card shows the wide image, which falls back to the background.
    const wide = services.locator('.home-showcase-card.is-active img.is-wide')
    await expect(wide).toHaveAttribute('src', service.wide ?? service.background)
    await expect.poll(() => wide.evaluate(node => (node as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await expect(services.locator('.home-showcase-backdrop-image').last()).toHaveAttribute('src', service.background)
    await expect(services.getByRole('link', { name: `Explore ${service.title}`, exact: true })).toHaveAttribute('href', service.to)
    await services.getByRole('button', { name: 'Next service', exact: true }).click()
  }
  await expect(services.locator('.home-showcase-title').last()).toHaveText(homeServiceShowcase[0].title)
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
      await expect(image).toHaveCSS('object-fit', 'cover')
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
      await services.getByRole('button', { name: 'Next service', exact: true }).click()
    }
    const next = await services.getByRole('button', { name: 'Next service', exact: true }).boundingBox()
    expect(next && next.x + next.width).toBeLessThanOrEqual(width)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
  })
}

for (const [width, height] of [[1440, 900], [1280, 800]]) {
  test(`home services showcase text lines up with the card and controls at ${width}x${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/')
    const services = page.locator('#home-services')
    await services.scrollIntoViewIfNeeded()
    const frame = services.locator('.home-showcase-card.is-active .home-showcase-card-frame')
    const [frameBox, titleBox, descriptionBox, ctaBox, arrowBox, introBox] = await Promise.all([
      frame.boundingBox(),
      services.locator('.home-showcase-text .home-showcase-title:not(.is-sizer)').boundingBox(),
      services.locator('.home-showcase-desc-row .home-showcase-description:not(.is-sizer)').boundingBox(),
      services.locator('.home-showcase-cta').boundingBox(),
      services.getByRole('button', { name: 'Next service', exact: true }).boundingBox(),
      services.locator('.home-showcase-intro').boundingBox(),
    ])
    if (!frameBox || !titleBox || !descriptionBox || !ctaBox || !arrowBox || !introBox) throw new Error('Showcase card, text, button, arrow or heading is missing')
    // The heading sits above the card. The service title's line box starts just above the card's top edge so its capitals sit on it,
    // and the button is level with the carousel arrows, with clear space between it and the text above.
    expect(introBox.y + introBox.height).toBeLessThan(frameBox.y)
    expect(titleBox.y).toBeLessThanOrEqual(frameBox.y)
    expect(titleBox.y).toBeGreaterThan(frameBox.y - 12)
    expect(Math.abs(ctaBox.y + ctaBox.height / 2 - (arrowBox.y + arrowBox.height / 2))).toBeLessThan(3)
    expect(ctaBox.y - (descriptionBox.y + descriptionBox.height)).toBeGreaterThan(24)
  })
}
