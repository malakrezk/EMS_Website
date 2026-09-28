import { expect, test, type Page } from '@playwright/test'
import { industries } from '../src/data/industries'
import { projects } from '../src/data/projects'
import { services } from '../src/data/services'

const routes = ['/', '/about', '/services', '/services/scada', '/industries/hospitals', '/solutions', '/case-studies', '/case-studies/data-center-operations', '/partners', '/contact', '/store', '/cart', '/missing-page']

for (const width of [1440, 768, 390]) {
  test(`pages render without runtime errors or horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('h1:visible').first()).toBeVisible()
      await expect(page.locator('main')).toHaveCount(1)
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true)
    }
    expect(errors).toEqual([])
  })
}

test('legacy and invalid detail routes retain their redirects', async ({ page }) => {
  for (const [from, to] of [
    ['/projects', '/case-studies'], ['/projects/data-center-operations', '/case-studies/data-center-operations'],
    ['/digital-twin', '/solutions#digital-twin'], ['/services/unknown', '/services'], ['/industries/unknown', '/'],
    ['/case-studies/unknown', '/case-studies'],
  ]) {
    await page.goto(from)
    await expect(page).toHaveURL(new RegExp(to.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '$'))
  }
})

test('mobile navigation opens and closes after choosing a page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/')
  await page.getByRole('button', { name: 'Open menu' }).click()
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true')
  await page.locator('header').getByRole('link', { name: 'Products', exact: true }).last().click()
  await expect(page).toHaveURL(/\/store$/)
  await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false')
})

test('catalog search, empty state, category filter and pagination', async ({ page }) => {
  await page.goto('/store')
  const search = page.getByRole('searchbox')
  await search.fill('nonexistent-part-number')
  await expect(page.getByText('No products found')).toBeVisible()
  await search.fill('6ES7510-1DJ01-0AB0')
  await expect(page.getByRole('heading', { name: 'CPU 1510', exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Add to Cart', exact: true })).toHaveCount(1)
  await search.fill('')
  await page.getByRole('button', { name: 'HMI', exact: true }).click()
  await expect(page.getByRole('heading', { name: 'HMI', exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'All Products', exact: true }).click()
  await page.getByRole('button', { name: 'Next', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Go to products page 2' })).toHaveAttribute('aria-current', 'page')
})

test('product dialog traps focus, closes on Escape and restores focus', async ({ page }) => {
  await page.goto('/store')
  const trigger = page.getByRole('button', { name: 'View Details' }).first()
  await trigger.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Shift+Tab')
  expect(await dialog.evaluate(node => node.contains(document.activeElement))).toBe(true)
  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

async function addProduct(page: Page) {
  await page.goto('/store')
  await page.getByRole('button', { name: 'Add to Cart', exact: true }).first().click()
  await page.locator('header').getByRole('link', { name: /Open cart with/ }).click()
  await expect(page.getByRole('heading', { name: 'Request Order', exact: true })).toBeVisible()
}
async function fillCustomer(page: Page) {
  const inputs = page.locator('form input')
  for (const [index, value] of ['Ada', 'Lovelace', 'ada@example.com', '+201000000000', 'Example Engineering'].entries()) {
    await inputs.nth(index).fill(value)
  }
  await page.locator('#order-address').fill('Cairo, Egypt')
}

test('cart persists and failed order submission keeps items; success clears them', async ({ page }) => {
  await addProduct(page)
  await page.reload()
  await expect(page.getByRole('heading', { name: 'CPU 1510', exact: true })).toBeVisible()
  await page.route('**/api/send-order', route => route.fulfill({ status: 500, json: { error: 'Test failure' } }))
  await fillCustomer(page)
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByRole('alert')).toContainText('could not be sent')
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ems-store-cart') || '[]').length)).toBe(1)
  await page.unroute('**/api/send-order')
  await page.route('**/api/send-order', async route => {
    const payload = route.request().postDataJSON()
    expect(payload.customer.firstName).toBe('Ada')
    expect(payload.items[0].partNumber).toBe('6ES7510-1DJ01-0AB0')
    await route.fulfill({ json: { success: true, messageId: 'test-only' } })
  })
  await page.locator('form button[type="submit"]').click()
  await expect(page.getByRole('heading', { name: /Thank You, Ada/ })).toBeVisible()
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem('ems-store-cart') || '[]').length)).toBe(0)
})

test('malformed persisted cart does not crash the application', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('ems-store-cart', '{"quantity":"broken"}'))
  await page.goto('/cart')
  await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible()
})

test('quote modal displays server failure instead of false confirmation', async ({ page }) => {
  await page.route('**/api/send-order', route => route.fulfill({ status: 500, json: { error: 'Test failure' } }))
  await page.goto('/store')
  await page.getByRole('button', { name: 'Request Price', exact: true }).first().click()
  const dialog = page.getByRole('dialog')
  const inputs = dialog.locator('input:not([type="number"])')
  for (const [index, value] of ['Ada', 'Lovelace', 'ada@example.com', '+201000000000'].entries()) await inputs.nth(index).fill(value)
  await dialog.locator('#modal-address').fill('Cairo, Egypt')
  await dialog.locator('button[type="submit"]').click()
  await expect(dialog.getByRole('alert')).toContainText('could not be sent')
})

test('all data-backed detail routes resolve', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  const paths = [
    ...services.map(item => `/services/${item.id}`),
    ...industries.map(item => `/industries/${item.id}`),
    ...projects.map(item => `/case-studies/${item.id}`),
  ]
  for (const route of paths) {
    await page.goto(route, { waitUntil: 'domcontentloaded' })
    await expect(page.locator('h1:visible')).toBeVisible()
    expect(new URL(page.url()).pathname).toBe(route)
  }
  expect(errors).toEqual([])
})

test('home carousels and video preview work with motion enabled', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  const next = page.getByRole('button', { name: 'Next service', exact: true })
  await next.click()
  await expect(next.locator('..').locator('span').first()).toHaveText('02')
  await page.locator('[aria-label="Next industry"]').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: 'Next industry', exact: true }).click()
  await expect(page.getByRole('group', { name: 'HOSPITALS, selected', exact: true })).toHaveAttribute('aria-current', 'true')
  await page.locator('[aria-label^="Preview Data Center video"]').scrollIntoViewIfNeeded()
  await page.getByRole('button', { name: /Preview Data Center video/ }).click()
  await expect(page.getByRole('dialog', { name: /Data Center video player/ })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).toHaveCount(0)
})

test('sector switching and project filters remain functional', async ({ page }) => {
  await page.goto('/solutions')
  await page.locator('.solutions-sector-rail button').nth(1).click()
  await expect(page.locator('.solutions-sector-rail button').nth(1)).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByRole('link', { name: 'Explore Compounds', exact: true }).first()).toBeVisible()
  await page.goto('/case-studies')
  await page.getByRole('button', { name: 'Healthcare', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Healthcare', exact: true })).toHaveAttribute('aria-pressed', 'true')
  await expect(page.locator('#project-index article')).toHaveCount(projects.filter(item => item.categories.includes('healthcare')).length)
})

test('cart quantity changes and removal update shared navigation state', async ({ page }) => {
  await addProduct(page)
  await page.getByRole('button', { name: 'Increase CPU 1510' }).click()
  await expect(page.locator('header').getByRole('link', { name: 'Open cart with 2 items' })).toBeVisible()
  await page.getByRole('button', { name: 'Decrease CPU 1510' }).click()
  await expect(page.locator('header').getByRole('link', { name: 'Open cart with 1 items' })).toBeVisible()
  await page.getByRole('button', { name: 'Remove CPU 1510' }).click()
  await expect(page.getByRole('heading', { name: 'Your Cart is Empty' })).toBeVisible()
})
