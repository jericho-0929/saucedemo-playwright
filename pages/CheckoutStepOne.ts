import { Page, Locator, expect } from '@playwright/test';

export class CheckoutStepOne {
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly zipCodeField: Locator;
    readonly continueButton: Locator;
    readonly cancelButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameField = page.getByPlaceholder('First Name');
        this.lastNameField = page.getByPlaceholder('Last Name');
        this.zipCodeField = page.getByPlaceholder('Zip/Postal Code');
        this.continueButton = page.getByRole('button', {name: 'Continue'});
        this.cancelButton = page.getByRole('button', {name: 'Cancel'});
    }

    async navigateToPage(url: string) {
        await this.page.goto(url);
    }

    async continueOrder(firstName: string, lastName: string, zipCode: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
        await this.zipCodeField.fill(zipCode);
        await this.continueButton.click();
    }

    async assertVisibility() {
        await expect(this.firstNameField).toBeEditable();
        await expect(this.lastNameField).toBeEditable();
        await expect(this.zipCodeField).toBeEditable();
        await expect(this.continueButton).toBeEnabled();
        await expect(this.cancelButton).toBeEnabled();
    }
}