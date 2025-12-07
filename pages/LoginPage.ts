import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.getByPlaceholder('Username');
        this.passwordField = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', {name: 'Login'});
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async assertVisibility() {
        await expect(this.usernameField).toBeEditable();
        await expect(this.passwordField).toBeEditable();
        await expect(this.loginButton).toBeEditable();
    }
    
    async login(username: string, password: string) {
        await this.usernameField.fill(username);
        await this.passwordField.fill(password);
        await this.loginButton.click();
    }
}