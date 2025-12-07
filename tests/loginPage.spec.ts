import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as path from 'path';

const authFile = path.join(__dirname, 'storageState.json');

test.use({storageState: authFile});

test('login components check', async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToPage('https://www.saucedemo.com/');
    await loginPage.assertVisibility();
});

test('login success', async ({page}) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.navigateToPage('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await expect(page.getByText('Products')).toBeVisible();
});

test('login fail, wrong password', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToPage('https://www.saucedemo.com/');
    await loginPage.login('standard_user', 'public_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('do not match')).toBeVisible();
});

test('login fail, wrong username', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.navigateToPage('https://www.saucedemo.com/');
    await loginPage.login('custom_user', 'secret_sauce');

    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.getByText('do not match')).toBeVisible();
});
