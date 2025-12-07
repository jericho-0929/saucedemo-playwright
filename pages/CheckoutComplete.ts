import { Page, Locator, expect } from '@playwright/test';

export class CheckoutComplete {
    readonly page: Page;
    readonly backHomeButton: Locator;
    readonly thankYouLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.backHomeButton = page.getByRole('button', {name: 'Back Home'});
        this.thankYouLabel = page.getByText('Thank you');
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async clickBackHome() {
        await this.backHomeButton.click();
    }

    async assertVisibility() {
        await expect(this.backHomeButton).toBeEnabled();
        await expect(this.thankYouLabel).toBeVisible();
    }
}