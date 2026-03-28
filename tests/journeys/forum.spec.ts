import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'

test('jornada completa do usuário', async ({ page }) => {
  await login(page)

  // Criar pergunta
  await page.click('text=Fazer uma pergunta')

  const titleText = `Pergunta ${Date.now()}`
  const bodyText = 'Pergunta criada no teste de jornada'

  await page.fill('input[name="title"]', titleText)
  await page.fill('textarea[name="body"]', bodyText)
  await page.click('button[type="submit"]')

  await expect(page.locator(`text=${titleText}`)).toBeVisible()

  // Abrir pergunta
  await page.click(`text=${titleText}`)

  // Criar resposta
  const answerText = `Resposta ${Date.now()}`

  await page.fill('textarea', answerText)
  await page.click('button:has-text("Responder")')

  await expect(page.locator(`text=${answerText}`)).toBeVisible()

  // Deletar resposta
  await page.getByTestId('delete-answer').click()
  await page.click('text=Excluir')

  await expect(page.locator(`text=${answerText}`)).not.toBeVisible()

  // Deletar pergunta
  await page.getByTestId('delete-question').click()
  await page.click('text=Excluir')

  await expect(
  page.locator('.Card').filter({ hasText: titleText })
).toHaveCount(0)
})