import { Page, Locator, expect } from '@playwright/test';

export class Cart {
    readonly page: Page;
    readonly checkoutButton: Locator;
    readonly continueShoppingButton: Locator;
    readonly removeButton: Locator;
    readonly itemNameLabel: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkoutButton = page.getByRole('button', {name: 'Checkout'});
        this.continueShoppingButton = page.getByRole('button', {name: 'Continue Shopping'});
        this.removeButton = page.getByRole('button', {name: 'Remove'});
        this.itemNameLabel = page.locator('.inventory_item_name');
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async assertFirstItemName(itemName: string) {
        await expect(this.itemNameLabel.first()).toHaveText(itemName);
    }

    async clickCheckout() {
        await this.checkoutButton.click();
    }

    async clickContinueShopping() {
        await this.continueShoppingButton.click();
    }

    async assertSpecificItem(itemName: string) {
        await expect(this.itemNameLabel).toHaveText(itemName);
    }

    async assertEssentialVisibility() {
        await expect(this.checkoutButton).toBeEnabled();
        await expect(this.continueShoppingButton).toBeEnabled();
    }
}