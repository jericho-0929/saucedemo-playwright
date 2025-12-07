import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepTwo {
    readonly page: Page;
    readonly finishButton: Locator;
    readonly cancelButton: Locator;
    readonly itemName: Locator;

    constructor(page: Page) {
        this.page = page;
        this.finishButton = page.getByRole('button', {name: 'Finish'});
        this.cancelButton = page.getByRole('button', {name: 'Cancel'});
        this.itemName = page.locator('.inventory_item_name');
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async finishOrder() {
        await this.finishButton.click();
    }

    async cancelOrder() {
        await this.cancelButton.click();
    }

    async assertItemVisiblity(itemName: string) {
        await expect(this.itemName).toHaveText(itemName);
    }

    async assertVisibility() {
        await expect(this.finishButton).toBeEnabled();
        await expect(this.cancelButton).toBeEnabled();
        await expect(this.itemName).toBeVisible();
    }
}