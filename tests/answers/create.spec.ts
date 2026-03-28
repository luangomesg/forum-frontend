import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'

test('usuario consegue responder pergunta', async ({ page }) => {
  await login(page)

  await page.click('text=Fazer uma pergunta')

  const title = `Pergunta ${Date.now()}`
  const body = 'Pergunta criada no teste'

  await page.fill('input[name="title"]', title)
  await page.fill('textarea[name="body"]', body)
  await page.click('button[type="submit"]')

  await page.click(`text=${title}`)

  await page.fill('textarea', 'Resposta via teste E2E')
  await page.click('button:has-text("Responder")')

  await expect(
    page.locator('text=Resposta via teste E2E')
  ).toBeVisible()
})