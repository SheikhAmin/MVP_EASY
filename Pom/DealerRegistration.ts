import { Page, Locator, expect } from '@playwright/test';

export class DealerRegistration {
  readonly page: Page;
  readonly newDealerRegBtn = '.text-muted > a';
  readonly newDealerTxt = 'h2.text-center';
  readonly userName = 'input#UserName';
  readonly address1 = 'input#Address1';
  readonly password = 'input#passwordField';
  readonly city = 'input#City';
  readonly retypePass = 'input#confirmPasswordField';
  readonly firtName = 'input#FirstName';
  readonly lastName = 'input#LastName';
  readonly companyName = 'input#CompanyName';
  readonly zipcode = 'input#Zip';
  readonly email = 'input#Email';
  readonly phone = 'input#HostedManagerDirectPhoneNumber';
  readonly sumbitBtn = 'button#submitButton';
  readonly promptModal = '#modalOkButton';
  readonly accountNum = "input#Account";

  constructor(page: Page) {
    this.page = page;
  }

  async clickNewDealerReg(text: string) {
    await this.page.locator(this.newDealerRegBtn).click();
    await expect(this.page.locator(this.newDealerTxt)).toHaveText(text);
  }

  async formFillUp(
    id: string,
    pass: string,
    addr: string,
    company: string,
    first: string,
    last: string,
    city: string,
    email: string,
    phone: string,
    zipcode: string
  ) {
    await this.page.locator(this.userName).fill(id);
    await this.page.locator(this.password).fill(pass);
    await this.page.locator(this.retypePass).fill(pass);
    await this.page.locator(this.address1).fill(addr);
    await this.page.locator(this.companyName).fill(company);
    await this.page.locator(this.firtName).fill(first);
    await this.page.locator(this.lastName).fill(last);
    await this.page.locator(this.city).fill(city);
    await this.page.locator(this.zipcode).fill(zipcode);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.phone).fill(phone);
    await this.page.locator(this.sumbitBtn).click();

    await this.page.waitForTimeout(10000);
    await this.page.locator(this.promptModal).click();
    
    const inputVal = await this.page.locator(this.accountNum).inputValue();
    return inputVal as string;
  }
  
}
