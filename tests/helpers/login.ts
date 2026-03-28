import { Page } from "@playwright/test"

export async function login(page: Page) {
  await page.goto('http://localhost:3000/login')

  await page.fill('input[type="email"]', "test@email.com")
  await page.fill('input[type="password"]', "123456")
  await page.click('button:has-text("Entrar")')

  await page.waitForURL('**/hub')
}