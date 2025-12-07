import { chromium, expect } from '@playwright/test';
import * as path from 'path';

const authFile = path.join(__dirname, 'storageState.json');

async function globalSetup() {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://www.saucedemo.com/');
    
    const loginButton = page.getByRole('button', { name: 'Login'});
    const usernameField = page.getByPlaceholder('Username');
    const passwordField = page.getByPlaceholder('Password');

    await expect(loginButton).toBeVisible();
    await expect(usernameField).toBeVisible();
    await expect(passwordField).toBeVisible();

    await usernameField.fill('standard_user');
    await passwordField.fill('secret_sauce');

    await loginButton.click();

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');

    // Save to globalSetup for post-login tests.
    await page.context().storageState({ path: authFile });
    await browser.close();
};

export default globalSetup;