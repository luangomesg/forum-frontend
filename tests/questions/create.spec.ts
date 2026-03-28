import {test, expect} from '@playwright/test'
import { login } from '../helpers/login'

test('usuario consegue criar pergunta', async ({page}) => {
    await login(page)

    await page.click('text=Fazer uma pergunta')
    await page.fill(`input[name="title"]`, 'Pergunta teste E2E')
    await page.fill(`textarea[name="body"]`, 'Essa é uma pergunta criada via teste automatizado')
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL(/.*questions/);
})