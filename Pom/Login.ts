import { Page } from "playwright";

export class Login {
    private readonly page: Page;
    private readonly userAccountName = "input#Account";
    private readonly userName = "input#Username"; 
    private readonly passwordInput = "input#passwordField";
    private readonly submitBtn = "button[type='submit'].btn.btn-primary.w-100";

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
}