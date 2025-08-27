import { Page } from "playwright";
import { expect } from "playwright/test";

export class Forgot_Password {
    private readonly page : Page;
    private readonly forgotPassword: string = "a.text-decoration-none.text-primary";
    private readonly forgotPasswordText: string = "h3.text-center";
    private readonly forgotPasswordLink: string = "a.btn.btn-primary.link";
    private readonly backBtn: string = "i.fa.fa-arrow-left.back-icon.icon-only.position-absolute.start-0.p-3";
    private readonly requestBtn: string = "#btnForgotPasswordRequest";
    private readonly account: string = "#Account";
    private readonly email: string = "#Email";
    private readonly username: string = "#Username";
    private readonly email_error:string = "#validation-error";
    private readonly email_err_msg:string = "Incorrect information.";
    private readonly account_empty_error:string = '#Account-error'
    private readonly account_empty_msg:string = "Account is required.";
    private readonly username_empty_error:string = "#Username-error";
    private readonly username_empty_msg:string = "Username is required.";
    private readonly email_empty_error:string = "#Email-error";
    private readonly email_empty_msg:string = "Email is required.";
    private readonly login_btn:string = "button.btn.btn-primary.w-100"

















    constructor(page : Page) {
        this.page = page;
    }
    async click_forgot_password(): Promise<void> {
        await this.page.locator(this.forgotPassword).click();
    }
    async forgot_password(): Promise<void> {
        await this.page.locator(this.forgotPassword).click();
        await expect(this.page.locator(this.forgotPasswordText)).toBeVisible();
        await expect(this.page.locator(this.forgotPasswordText)).toContainText("Forgot Password");
        await expect(this.page.locator(this.backBtn)).toBeVisible();
        await expect(this.page.locator(this.requestBtn)).toBeVisible();
    }

    async forgot_pass_request(account_num:string, user_name: string, email:string): Promise<void> {
        await this.page.locator(this.forgotPassword).click();
        await this.page.locator(this.account).fill(account_num);
        await this.page.locator(this.username).fill(user_name);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.requestBtn).click();
    }

    async wrong_email(): Promise<void> {
        await this.page.getByRole('button', { name: /request/i }).click();

        const errorText = this.page.locator(this.email_error);
        await expect(errorText).toHaveText(this.email_err_msg);

    }

    async verify_required_field_error_msg(){
        await expect(this.page.locator(this.account_empty_error)).toContainText(this.account_empty_msg);
        await expect(this.page.locator(this.username_empty_error)).toContainText(this.username_empty_msg);
        await expect(this.page.locator(this.email_empty_error)).toContainText(this.email_empty_msg);
    }

    async back_btn_check(){
        await this.page.locator(this.backBtn).click();
        await this.page.waitForTimeout(1000);
        await expect(this.page.locator(this.login_btn)).toBeVisible();
    }
}