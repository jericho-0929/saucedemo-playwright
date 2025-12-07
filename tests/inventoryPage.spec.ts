import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { Cart } from '../pages/Cart'; 
import * as path from 'path';

const authFile = path.join(__dirname, 'storageState.json');

test.use({storageState: authFile});

test('add and remove buttons check', async ({page}) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await inventoryPage.assertVisibility();
});

test('add and remove all items', async ({page}) => {
    const inventoryPage = new InventoryPage(page);

    await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const addToCartCount = inventoryPage.addToCartButton.count();

    while (await inventoryPage.addToCartButton.count() > 0) {
        await inventoryPage.addToCartButton.first().click();
    }
    
    if (await inventoryPage.removeButton.count() < await addToCartCount || await inventoryPage.removeButton.count() > await addToCartCount) {
        expect(false, "Failed to click all 'Add to cart' buttons!");
    }
    
    while (await inventoryPage.removeButton.count() > 0) {
        await inventoryPage.removeButton.first().click();
    }

    if (await inventoryPage.removeButton.count() < await addToCartCount || await inventoryPage.removeButton.count() > await addToCartCount) {
        expect(false, "Failed to click all 'Remove' buttons!");
    }
});

test('Cart entry and exit', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new Cart(page);
    
    await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');

    await inventoryPage.goToCheckout();
    
    await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
    await cartPage.assertEssentialVisibility();

    await cartPage.clickContinueShopping();
    
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});

test('Cart entry and deletion, multiple items to zero', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const cartPage = new Cart(page);

    await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html');
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');

    const addToCartCount =  inventoryPage.addToCartButton.count();

    while (await inventoryPage.addToCartButton.count() > 0) {
        await inventoryPage.addToCartButton.first().click();
    }
    
    await inventoryPage.goToCheckout();
    await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
    await cartPage.assertEssentialVisibility();

    await expect(cartPage.removeButton).toHaveCount(await addToCartCount);

    while (await cartPage.removeButton.count() > 0) {
        await cartPage.removeButton.first().click();
    }

    await expect(cartPage.removeButton).toHaveCount(0);
    await cartPage.clickContinueShopping();
    await expect(inventoryPage.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});