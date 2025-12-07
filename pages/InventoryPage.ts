import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartButton: Locator;
    readonly removeButton: Locator;
    readonly checkoutButton: Locator;
    readonly productsTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', {name: 'Add to cart'});
        this.removeButton = page.getByRole('button', {name: 'Remove'});
        this.checkoutButton = page.locator('a.shopping_cart_link');
        this.productsTitle = page.getByText('Products');
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async goToCheckout(){
        await this.checkoutButton.click();
    }

    async assertVisibility() {
        for (const addButton of await this.addToCartButton.all()) {
            await expect(addButton).toBeEnabled();
        }
        await expect(this.checkoutButton).toBeEnabled();
        await expect(this.productsTitle).toBeVisible();

    }
}