import { expect, test } from '@playwright/test'

for (const width of [1440, 1366, 1024, 768, 390, 375]) {
  test(`home partners remain balanced at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await page.goto('/')
    const section = page.getByRole('region', { name: 'Our Partners', exact: true })
    await section.scrollIntoViewIfNeeded()
    const cards = section.locator('.home-partner-logo-card')
    await expect(cards).toHaveCount(3)
    for (const name of ['Siemens', 'Cisco', 'Oracle']) {
      const logo = section.getByAltText(`${name} logo`)
      await expect(logo).toHaveAttribute('src', `/${name.toLowerCase()}.png`)
      await expect.poll(() => logo.evaluate(image => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0)).toBe(true)
      await expect(logo).toHaveCSS('object-fit', 'contain')
      await expect(logo).toHaveCSS('filter', 'none')
      await expect(logo).toHaveCSS('opacity', '1')
    }
    await expect(section.getByAltText('AWS logo')).toHaveCount(0)
    const boxes = await cards.evaluateAll(elements => elements.map(element => {
      const { width, height, x, right } = element.getBoundingClientRect()
      return { width, height, x, right }
    }))
    for (const box of boxes) {
      expect(Math.abs(box.width - boxes[0].width)).toBeLessThan(1)
      expect(box.height).toBe(boxes[0].height)
      expect(box.height).toBeLessThanOrEqual(112)
      expect(box.x).toBeGreaterThanOrEqual(0)
      expect(box.right).toBeLessThanOrEqual(width)
    }
    await expect(section).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)')
    await expect(section).toHaveCSS('background-image', 'none')
    await expect(section.getByRole('heading', { name: 'Our Partners' })).toBeVisible()
    await expect(section.locator('.home-partners-grid')).toHaveCount(0)
    await expect(page.locator('.home-page-shell > .projects-bg > .projects-bg-floor')).toBeHidden()
    expect(await section.locator('.home-partners-cards').evaluate(element => parseFloat(getComputedStyle(element).marginTop))).toBe(40)
    if (width >= 768) {
      const tops = await cards.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().top))
      expect(new Set(tops).size).toBe(1)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    expect(errors).toEqual([])
    await page.screenshot({ path: `artifacts/partners/partners-${width}.png` })
  })
}

test('home partner hover is restrained and respects reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const card = page.locator('#home-partners .home-partner-logo-card').first()
  await card.scrollIntoViewIfNeeded()
  await card.hover()
  await expect(card).toHaveCSS('transform', 'matrix(1, 0, 0, 1, 0, -4)')
  await expect(card).toHaveCSS('border-top-color', 'rgba(56, 189, 248, 0.6)')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(card).toHaveCSS('transform', 'none')
  await expect(page.getByRole('heading', { name: 'Our Partners', exact: true })).toBeVisible()
})
