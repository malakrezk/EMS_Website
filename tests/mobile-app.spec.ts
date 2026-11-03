import { expect, test, type Page } from '@playwright/test'

const chapters = [
  { label: 'Home', title: 'Your community at a glance.' },
  { label: 'My Unit', title: 'Your unit and payments, always clear.' },
  { label: 'Visitors & parking', title: 'Guests welcomed, parking sorted.' },
  { label: 'Maintenance', title: 'Repairs, requested and tracked.' },
  { label: 'EMS AI', title: 'Ask, and the app answers.' },
]

async function imagesLoaded(page: Page) {
  // Every image the visitor can see has loaded; hidden fallbacks are ignored.
  return page.locator('.app-page img').evaluateAll(images => images
    .filter(image => image.checkVisibility())
    .every(image => (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0))
}

for (const width of [1440, 768, 390]) {
  test(`mobile app page renders every section at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/mobile-app')
    await expect(page).toHaveTitle(/PARK LANE Smart Community App/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Smarter Living. Intelligently Connected.')
    for (const name of ['Your home, in your hand.', 'One app for everyday community life.', 'Everything residents use, up close.', 'Just ask Parklane.', 'Intelligent Communities Start Here.']) {
      await expect(page.getByRole('heading', { level: 2, name })).toBeAttached()
    }
    await expect(page.getByRole('link', { name: 'Explore the experience' })).toHaveAttribute('href', '#app-experience')
    await expect(page.locator('.app-closing').getByRole('link', { name: 'Contact EMS' })).toHaveAttribute('href', '/contact')
    // Scroll through like a reader, so every lazy-loaded screenshot comes into range.
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let top = 0; top < height; top += 600) await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top)
    await expect.poll(() => imagesLoaded(page)).toBe(true)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
  })
}

test('the pinned story changes screen as the page scrolls and from its chapter buttons', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/mobile-app')
  await page.evaluate(() => document.fonts.ready)
  const stage = page.locator('.app-story-stage')
  await expect(stage.locator('..')).toHaveClass(/pin-spacer/)
  const counter = stage.locator('.app-story-count')
  const scrollStory = (progress: number) => stage.evaluate((node, position) => {
    const spacer = node.parentElement
    if (!spacer) throw new Error('Story is not pinned')
    const start = spacer.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: start + (spacer.offsetHeight - (node as HTMLElement).offsetHeight) * position, behavior: 'instant' })
  }, progress)

  await scrollStory(0)
  await expect(counter).toHaveText('01 / 05')
  await scrollStory(.5)
  await expect(counter).toHaveText('03 / 05')
  await scrollStory(1)
  await expect(counter).toHaveText('05 / 05')

  const nav = page.getByRole('navigation', { name: 'App chapters' })
  for (const [index, chapter] of [[1, chapters[1]], [3, chapters[3]], [0, chapters[0]]] as const) {
    await nav.getByRole('button', { name: chapter.label, exact: true }).click()
    await expect(counter).toHaveText(`0${index + 1} / 05`)
    await expect(nav.getByRole('button', { name: chapter.label, exact: true })).toHaveAttribute('aria-current', 'step')
    await expect.poll(() => stage.locator('.app-story-copy').nth(index).evaluate(node => Number(getComputedStyle(node).opacity))).toBeGreaterThan(.95)
  }
})

test('without motion the story is a readable list of every chapter', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/mobile-app')
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(page.locator('.app-story-stage')).toBeHidden()
  const list = page.locator('.app-story-list')
  for (const chapter of chapters) await expect(list.getByRole('heading', { level: 3, name: chapter.title })).toBeVisible()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('.pin-spacer')).toHaveCount(0)
  await expect(list.getByRole('heading', { level: 3 })).toHaveCount(chapters.length)
})
