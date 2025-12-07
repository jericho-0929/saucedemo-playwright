import { test, expect } from '@playwright/test';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutStepOne } from '../pages/CheckoutStepOne';
import { CheckoutStepTwo } from '../pages/CheckoutStepTwo';
import { CheckoutComplete } from '../pages/CheckoutComplete';
import { Cart } from '../pages/Cart';

import * as path from 'path';

const authFile = path.join(__dirname, 'storageState.json');

test.use({storageState: authFile});

test('checkout process journey, single item', async ({page}) => {
    const productEntry = page.locator('.inventory_item').first();
    let productName: string; // Persist for checking when page changes.
    const inventoryPage = new InventoryPage(page);
    const cartPage = new Cart(page);
    const checkoutStepOnePage = new CheckoutStepOne(page);
    const checkoutStepTwoPage = new CheckoutStepTwo(page);
    const checkoutCompletePage = new CheckoutComplete(page);
   
    await test.step('Inventory page, select item', async () => {
        await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html')

        console.log('Selected product name: ' + productName);

        await productEntry.getByRole('button', {name: 'Add to cart'}).click();
        await productEntry.getByRole('button', {name: 'Remove'}).isVisible();

        productName = await productEntry.locator('.inventory_item_name').innerText();

        await inventoryPage.goToCheckout();
    });

    await test.step('Cart page, confirm product presence', async() => {
        await expect(cartPage.page).toHaveURL('https://www.saucedemo.com/cart.html');
        await cartPage.assertSpecificItem(productName);

        await cartPage.clickCheckout();
    });

    await test.step('Three steps of checkout', async() => {
        await expect(checkoutStepOnePage.page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
        
        await checkoutStepOnePage.assertVisibility();
        await checkoutStepOnePage.continueOrder('John', 'Doe', '1234');

        await expect(checkoutStepTwoPage.page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
        await checkoutStepTwoPage.assertVisibility();
        await checkoutStepTwoPage.assertItemVisiblity(productName);

        await page.getByRole('button', {name: 'Finish'}).click();

        await expect(checkoutCompletePage.page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
        await checkoutCompletePage.assertVisibility();
        await checkoutCompletePage.clickBackHome();

        await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    });
});

test('checkout process, no items', async ({page}) => {
    const inventoryPage = new InventoryPage(page);
    const continueButton = page.getByRole('button', {name: 'Checkout'});

    await inventoryPage.navigateToPage('https://www.saucedemo.com/inventory.html');
    
    await page.locator('a.shopping_cart_link').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Continue button should not exist.
    await expect(continueButton).toHaveCount(0);
})