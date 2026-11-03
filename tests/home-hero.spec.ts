import { expect, test } from '@playwright/test'
import { images } from '../src/constants/images'

test('Home retains its original video hero and audio controls', async ({ page }) => {
  await page.goto('/')
  const hero = page.locator('#home-hero')
  await expect(hero.locator('video source')).toHaveAttribute('src', images.alNamaHero)
  await expect(hero.locator('.home-hero-scene')).toHaveCount(0)
  await expect(hero).toHaveCSS('position', 'relative')
  await page.getByRole('button', { name: 'Unmute video' }).click()
  await expect(page.getByRole('button', { name: 'Mute video', exact: true })).toBeVisible()
  await expect(page.locator('header.fixed')).not.toHaveCSS('background-image', 'none')
})
