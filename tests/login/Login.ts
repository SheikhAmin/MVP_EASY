import { Page } from "playwright";
import { expect } from "playwright/test";

export class Login {
    private readonly page: Page;
    private readonly userAccountName : string = "input#Account";
    private readonly userName : string = "input#Username"; 
    private readonly passwordInput : string = "input#passwordField";
    private readonly submitBtn : string = "button[type='submit'].btn.btn-primary.w-100";
    private readonly errorMessage : string = "div.validation-summary-errors.text-danger>ul>li"; // Adjust selector as needed

    constructor(page: Page) {
        this.page = page;
    }
    async login(account: string, username: string, password: string) {
        await this.page.locator(this.userAccountName).fill(account);
        await this.page.locator(this.userName).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.submitBtn).click();
        await this.page.waitForTimeout(1000); // Adjust timeout as necessary
    }

    async checkErrorMessage(error_text: string) {
        await expect(this.page.locator(this.errorMessage)).toBeVisible();
        await expect(this.page.locator(this.errorMessage)).toContainText(error_text);
    }
}