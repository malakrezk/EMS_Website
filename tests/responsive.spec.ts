import { expect, test, type Page } from '@playwright/test'

// Every page with its own layout; template pages are represented by one example each.
const routes = [
  '/', '/about', '/services', '/services/building-management', '/services/iot', '/services/scada', '/services/artificial-intelligence',
  '/industries/hospitals', '/solutions', '/projects', '/projects/data-center-operations', '/partners', '/mobile-app',
  '/store', '/cart', '/contact', '/missing-page',
]
const viewports = [
  { width: 320, height: 568 }, { width: 375, height: 667 }, { width: 768, height: 1024 },
  { width: 1024, height: 768 }, { width: 1440, height: 900 }, { width: 2560, height: 1440 },
]
const menuPages = [
  { label: 'Home', path: '/' }, { label: 'Solutions', path: '/solutions' }, { label: 'Projects', path: '/projects' },
  { label: 'Products', path: '/store' }, { label: 'About', path: '/about' },
]

async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight)
  for (let top = 0; top < height; top += 500) await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top)
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
}

// Text, images and controls that reach past the edge of the screen without a component clipping them on purpose.
function contentPastTheEdge() {
  const width = document.documentElement.clientWidth
  const found: string[] = []
  for (const element of document.querySelectorAll<HTMLElement>('body *')) {
    if (!element.checkVisibility({ visibilityProperty: true })) continue
    if (element.closest('[aria-hidden="true"], [aria-roledescription="carousel"]')) continue
    // Background images (decorative, or covering their section) are cropped by the section on purpose, often while they zoom.
    if (element.tagName === 'IMG') {
      const style = getComputedStyle(element)
      if (element.getAttribute('alt') === '' || (style.position === 'absolute' && style.objectFit === 'cover')) continue
    }
    const hasText = [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim())
    if (!hasText && !/^(IMG|VIDEO|BUTTON|A|INPUT|SELECT|TEXTAREA)$/.test(element.tagName)) continue
    const box = element.getBoundingClientRect()
    if (box.width < 2 || box.height < 2 || (box.right <= width + 1 && box.left >= -1)) continue
    let clippedOnPurpose = false
    for (let parent = element.parentElement; parent && parent !== document.documentElement; parent = parent.parentElement) {
      if (getComputedStyle(parent).overflowX === 'visible') continue
      const bounds = parent.getBoundingClientRect()
      if (bounds.width < width - 2 || bounds.left > 1) { clippedOnPurpose = true; break }
    }
    if (!clippedOnPurpose) found.push(`${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 2).join('.')} "${(element.textContent ?? '').trim().slice(0, 30)}"`)
  }
  return found
}

for (const viewport of viewports) {
  test(`every page fits the screen at ${viewport.width}px`, async ({ page }) => {
    test.setTimeout(240000)
    await page.setViewportSize(viewport)
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator('h1').first(), route).toBeAttached()
      await scrollThrough(page)
      expect(await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth), `${route} scrolls sideways`).toBe(false)
      expect(await page.evaluate(contentPastTheEdge), `${route} has content past the screen edge`).toEqual([])
      const broken = await page.locator('img').evaluateAll(images => images
        .filter(image => image.checkVisibility() && (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 0)
        .map(image => image.getAttribute('src')))
      expect(broken, `${route} has broken images`).toEqual([])
    }
    expect(errors).toEqual([])
  })
}

for (const viewport of [{ width: 320, height: 568 }, { width: 390, height: 844 }, { width: 844, height: 390 }]) {
  test(`mobile menu reaches every page at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/about')
    const toggle = page.getByRole('button', { name: 'Open menu' })
    const menu = page.locator('#mobile-menu')

    // Opening locks the page behind it; Escape closes it and hands focus back to the toggle.
    await toggle.click()
    await expect(menu).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('hidden')
    await page.keyboard.press('Escape')
    await expect(menu).toBeHidden()
    await expect(toggle).toBeFocused()
    expect(await page.evaluate(() => document.documentElement.style.overflow)).toBe('')

    // A tap on the dimmed page closes it too. On a short landscape screen the menu fills the screen, so the X closes it.
    await toggle.click()
    await expect(menu).toBeVisible()
    const menuBottom = (await menu.boundingBox())?.y ?? 0
    const menuHeight = (await menu.boundingBox())?.height ?? 0
    if (menuBottom + menuHeight < viewport.height - 20) await page.mouse.click(viewport.width / 2, viewport.height - 10)
    else await page.getByRole('button', { name: 'Close menu' }).click()
    await expect(menu).toBeHidden()

    for (const { label, path } of menuPages) {
      await page.getByRole('button', { name: 'Open menu' }).click()
      const link = menu.getByRole('link', { name: label, exact: true })
      // On a short landscape screen the menu scrolls inside itself.
      await link.scrollIntoViewIfNeeded()
      await expect(link).toBeInViewport()
      await link.click()
      await expect(page).toHaveURL(new RegExp(`${path === '/' ? '/$' : path}$`))
      await expect(menu).toBeHidden()
      await expect(page.locator('h1').first()).toBeAttached()
    }
  })
}
