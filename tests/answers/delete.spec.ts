import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'

test('usuario consegue deletar resposta', async ({ page }) => {
  await login(page)

  await page.click('text=Perguntas')
  await page.locator('.Card').last().click()

  const answerText = `Resposta ${Date.now()}`

  await page.fill('textarea', answerText)
  await page.click('button:has-text("Responder")')

  await expect(
    page.locator(`text=${answerText}`)
  ).toBeVisible()

  await page.getByTestId('delete-answer').first().click()
  await page.click('text=Excluir')

  await expect(
    page.locator(`text=${answerText}`)
  ).not.toBeVisible()
})