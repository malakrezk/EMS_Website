import { expect, test } from '@playwright/test'

for (const width of [1440, 768, 390]) {
  test(`footer keeps its links and contact details at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/about')
    const footer = page.locator('footer.site-footer')
    await footer.scrollIntoViewIfNeeded()

    const navigate = footer.getByRole('navigation', { name: 'Navigate' })
    for (const [label, href] of [['Home', '/'], ['Solutions', '/solutions'], ['Services', '/services'], ['Projects', '/projects'], ['Products', '/store'], ['About', '/about']]) {
      await expect(navigate.getByRole('link', { name: label, exact: true })).toHaveAttribute('href', href)
    }
    await expect(navigate.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('aria-current', 'page')
    await expect(footer.getByRole('navigation', { name: 'Capabilities' }).getByRole('link')).not.toHaveCount(0)
    await expect(footer.locator('a[href="tel:+201202542095"]')).toBeVisible()
    await expect(footer.locator('a[href="mailto:info@ems-me.com"]')).toBeVisible()
    await expect(footer.getByText('Saudi Arabia', { exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)

    await footer.getByRole('button', { name: 'Back to top' }).click()
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0)
  })
}
