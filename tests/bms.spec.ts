import { expect, test } from '@playwright/test'
import { industries } from '../src/data/industries'
import { images } from '../src/constants/images'

for (const width of [1440, 768, 390]) {
  test(`BMS page navigation, interactions and layout at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1000 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/services', { waitUntil: 'domcontentloaded' })
    const bmsLink = width >= 1024
      ? page.getByRole('link', { name: 'Explore Building Management Systems', exact: true })
      : page.locator('section[class*="lg:hidden"]').getByRole('link', { name: 'Explore Building Management Systems', exact: true })
    await bmsLink.click()
    await expect(page).toHaveURL(/\/services\/building-management$/)
    await expect(page).toHaveTitle('BMS System Integration & Building Automation | EMS')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Intelligent BuildingManagement & Automation')
    expect(await page.evaluate(() => window.scrollY)).toBeLessThan(5)
    await expect(page.locator('.bms-page section')).toHaveCount(7)
    await expect(page.locator('.bms-hero-image').first()).toHaveAttribute('src', images.bmsHeroDay)
    await expect(page.locator('.bms-hero-image-night')).toHaveAttribute('src', images.bmsHeroNight)
    await expect(page.locator('.bms-page a[href="/contact"]')).toHaveCount(2)
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /BMS system integration/)
    await page.getByRole('link', { name: 'Explore Our Solutions' }).click()
    await expect.poll(() => page.locator('#bms-services').evaluate(node => node.getBoundingClientRect().top)).toBeLessThan(160)
    const scopeButton = page.getByRole('button', { name: 'Explore scope: BMS System Integration' })
    await scopeButton.focus()
    await page.keyboard.press('Enter')
    await expect(page.locator('#bms-scope-integration')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Close scope: BMS System Integration' })).toHaveAttribute('aria-expanded', 'true')
    const tech = page.getByRole('button', { name: /Digital Twin/ })
    await tech.focus()
    await page.keyboard.press('Enter')
    await expect(tech).toHaveAttribute('aria-pressed', 'true')
    await expect(page.locator('#bms-tech-description')).toContainText('Digital representations and simulation capabilities')
    await expect(page.getByText('not a mandatory sequential architecture', { exact: false })).toBeVisible()
    for (const link of await page.locator('.bms-industry-card').all()) {
      const to = await link.getAttribute('href')
      expect(industries.some(item => to === `/industries/${item.id}`)).toBe(true)
    }
    for (const image of await page.locator('.bms-page img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(node => (node as HTMLImageElement).naturalWidth), { timeout: 20000 }).toBeGreaterThan(0)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    // Expertise uses a 12-column asymmetric grid on desktop, two columns on tablet and one on phones.
    expect(await page.locator('.bms-xp-grid').evaluate(node => getComputedStyle(node).gridTemplateColumns.split(' ').length)).toBe(width >= 1024 ? 12 : width >= 768 ? 2 : 1)
    expect(errors).toEqual([])
    await page.evaluate(() => window.scrollTo(0, 0))
    await page.screenshot({ path: `artifacts/bms/${width}-full.png`, fullPage: true, animations: 'disabled' })
    await page.getByRole('link', { name: 'Request a BMS Project Consultation' }).click()
    await expect(page).toHaveURL(/\/contact$/)
  })
}

test('BMS page supports motion without runtime errors and leaves other service routes intact', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  await page.goto('/services/building-management', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('.bms-hero-content')).toBeVisible()
  await page.getByRole('link', { name: 'Explore Our Solutions' }).click()
  await expect.poll(() => page.locator('#bms-services').evaluate(node => node.getBoundingClientRect().top)).toBeLessThan(160)
  await page.goto('/services/scada', { waitUntil: 'domcontentloaded' })
  await expect(page.locator('h1')).toHaveText('SCADA & Infrastructure Control')
  await expect(page.locator('.bms-page')).toHaveCount(0)
  expect(errors).toEqual([])
})

for (const width of [1440, 1366, 1024, 768, 390, 375]) {
  test(`BMS hero scrubs from day to night and reverses at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto('/services/building-management')
    const night = page.locator('.bms-hero-image-night')
    await expect.poll(() => night.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0), { timeout: 20000 }).toBe(true)
    await expect(night).toHaveCSS('opacity', '0')
    await expect(page.locator('header.fixed')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(page.locator('header.fixed')).toHaveCSS('background-image', 'none')
    const scrollToProgress = async (progress: number) => {
      await page.locator('.bms-hero-sequence').evaluate((sequence, value) => {
        window.scrollTo({ top: sequence.getBoundingClientRect().top + scrollY + (sequence.getBoundingClientRect().height - innerHeight) * value, behavior: 'instant' })
      }, progress)
    }
    await scrollToProgress(.45)
    const opacity = () => night.evaluate(image => parseFloat(getComputedStyle(image).opacity))
    await expect.poll(opacity).toBeGreaterThan(.45)
    await expect.poll(opacity).toBeLessThan(.55)
    const middle = await opacity()
    await page.waitForTimeout(300)
    expect(Math.abs(await opacity() - middle)).toBeLessThan(.01)
    await scrollToProgress(.9)
    await expect(night).toHaveCSS('opacity', '1')
    await expect(page.getByRole('link', { name: 'Explore Our Solutions' })).toBeHidden()
    expect(await page.locator('.bms-hero').evaluate(node => node.getBoundingClientRect().bottom)).toBeGreaterThanOrEqual(await page.evaluate(() => innerHeight - 1))
    await page.screenshot({ path: `artifacts/bms/night-scroll-${width}.png` })
    await expect(page.locator('header.fixed')).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(page.locator('header.fixed')).toHaveCSS('backdrop-filter', 'none')
    if (width < 1024) {
      await page.getByRole('button', { name: 'Open menu' }).click()
      await expect(page.locator('header.fixed')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
      await page.getByRole('button', { name: 'Close menu' }).click()
    }
    await scrollToProgress(.25)
    await expect.poll(opacity).toBeGreaterThan(.15)
    await expect.poll(opacity).toBeLessThan(.3)
    await scrollToProgress(0)
    await expect(night).toHaveCSS('opacity', '0')
    await expect(page.getByRole('link', { name: 'Explore Our Solutions' })).toBeVisible()
    await scrollToProgress(1)
    await page.evaluate(() => window.scrollBy(0, 250))
    await expect.poll(() => page.locator('.bms-hero').evaluate(node => node.getBoundingClientRect().bottom)).toBeLessThan(800)
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
    await page.locator('#bms-overview').evaluate(node => window.scrollTo({ top: scrollY + node.getBoundingClientRect().top, behavior: 'instant' }))
    await expect(page.locator('header.fixed')).not.toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
  })
}

test('BMS reduced-motion hero stays in daylight without a scroll hold', async ({ page }) => {
  await page.goto('/services/building-management')
  await expect(page.locator('.bms-hero')).toHaveCSS('position', 'relative')
  await page.evaluate(() => window.scrollTo(0, 150))
  await expect(page.locator('.bms-hero-image-night')).toHaveCSS('opacity', '0')
  await expect(page.getByRole('link', { name: 'Explore Our Solutions' })).toBeVisible()
})

test('Home BMS service destination opens the dedicated canonical page', async ({ page }) => {
  await page.goto('/services/building-management-systems', { waitUntil: 'domcontentloaded' })
  await expect(page).toHaveURL(/\/services\/building-management$/)
  await expect(page.locator('.bms-page h1')).toContainText('Intelligent Building')
})
