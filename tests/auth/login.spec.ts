import {test, expect} from '@playwright/test'
import { login } from '../helpers/login'

test('usuario consegue fazer login', async ({page}) => {

    await login(page)
    await expect(page).toHaveURL(/.*hub/)
})