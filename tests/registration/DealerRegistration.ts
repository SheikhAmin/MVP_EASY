import { Page, Locator, expect } from '@playwright/test';

export class DealerRegistration {
  private readonly page: Page;
  private readonly newDealerRegBtn : string = '.text-muted > a';
  private readonly newDealerTxt : string = 'h2.text-center';
  private readonly userName : string = 'input#UserName';
  private readonly address1 : string = 'input#Address1';
  private readonly password : string = 'input#passwordField';
  private readonly city : string = 'input#City';
  private readonly retypePass : string = 'input#confirmPasswordField';
  private readonly firtName : string = 'input#FirstName';
  private readonly lastName : string = 'input#LastName';
  private readonly companyName : string = 'input#CompanyName';
  private readonly zipcode : string = 'input#Zip';
  private readonly email : string = 'input#Email';
  private readonly phone : string = 'input#HostedManagerDirectPhoneNumber';
  private readonly sumbitBtn : string = 'button#submitButton';
  private readonly promptModal : string = '#modalOkButton';
  private readonly accountNum : string = "input#Account";

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
    await this.page.locator(this.promptModal).click();
    await this.page.waitForTimeout(2000);
    const inputVal = await this.page.locator(this.accountNum).inputValue();
    return inputVal as string;
  }
  
}
