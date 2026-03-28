import { test, expect } from '@playwright/test'
import { login } from '../helpers/login'

test('usuario consegue deletar pergunta', async ({page}) => {
    await login(page)

    await page.click('text=Fazer uma pergunta')

    const titleText = `Title ${Date.now()}`
    const bodyText = 'Pergunta para deletar'

    await page.fill('input', titleText)
    await page.fill('textarea', bodyText)
    await page.click('button[type=submit]')

    await expect(page.locator(`text=${titleText}`)).toBeVisible()

    await page.click(`text=${titleText}`)

    await page.getByTestId('delete-question').click()
    await page.click('text=Excluir')
    await page.waitForURL('**/questions')

    await expect(
  page.locator('.Card').filter({ hasText: titleText })
).toHaveCount(0)
})
