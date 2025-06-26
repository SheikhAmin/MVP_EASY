import { Page } from "playwright";
import { expect } from "playwright/test";
import * as fs from "fs";

export class Login {
    private readonly page: Page;
    private readonly userAccountName : string = "input#Account";
    private readonly userName : string = "input#Username"; 
    private readonly passwordInput : string = "input#passwordField";
    private readonly submitBtn : string = "button[type='submit'].btn.btn-primary.w-100";
    private readonly errorMessage : string = "div.validation-summary-errors.text-danger>ul>li"; // Adjust selector as needed
    private readonly customerAccount : string =  "div.container";
    private readonly customerIdAccountCompanyName : string = "div.col-7.text-truncate";
 

 
 
    public customer_Account_No: string;
    public customer_Company_Name: string;
    public customer_Id: string;


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

    async customerLogin() {
        // Get all customer fields as an array
        const customerFields: (string | null)[] = await this.page.locator(this.customerIdAccountCompanyName).allTextContents();
        
        // Assign values based on the actual order in the array
        this.customer_Company_Name = customerFields[0] || '';
        this.customer_Id = customerFields[1] || '';
        this.customer_Account_No = customerFields[2] || '';
        const credentials = {company_name: this.customer_Company_Name, user_name: this.customer_Id, account_no: this.customer_Account_No};
        const fixturePath = 'fixtures/customer_credentials.json';
        // Write the customer credentials to a JSON file
        fs.writeFileSync(fixturePath, JSON.stringify(credentials, null, 3));
        //console.log(this.customer_Company_Name,this.customer_Id,this.customer_Account_No); // Debug: see the order and values
        // Click to show customer details
        await this.page.locator(this.customerAccount).click();
        await this.page.waitForTimeout(2000);
    }
    async checkErrorMessage(error_text: string) {
        await expect(this.page.locator(this.errorMessage)).toBeVisible();
        await expect(this.page.locator(this.errorMessage)).toContainText(error_text);
        
    }
}