import { Page } from "playwright";
import { expect } from "playwright/test";
import { Login } from "../login/Login";
import { Common } from "../../common/Common";

export default class e2e {
  private readonly page: Page;
  private readonly people_credentials: string = "div.card:nth-child(1)";
  private readonly doors: string = "div.card:nth-child(2)";
  private readonly hardware: string = "div.card:nth-child(3)";
  private readonly access: string = "div.card:nth-child(4)";
  private readonly reports: string = "div.card:nth-child(5)";
  private readonly customerList: string = "div.card:nth-child(6)";
  private readonly userDropdown: string = "i.fas.fa-user-circle.profile-icon";
  private readonly userProfileText: string =
    "p.mt-3.mb-1.fw-bold.fs-5.text-dark";
  private readonly userProfileIdIcon: string =
    "i.fas.fa-id-badge.text-muted.me-2";
  private readonly userProfileEmailIcon: string =
    "i.fas.fa-envelope.text-muted.me-2";
  private readonly userProfileNameIcon: string =
    "i.fas.fa-user.text-muted.me-2";
  private readonly userProfileCompanyIcon: string =
    "i.fas.fa-building.text-muted.me-2";
  private readonly userAccountIdText: string = "#userId";
  private readonly userCompanyNameText: string = "#userCompany";
  private lastConsoleError: string | null = null;
  private currentContext: string = "";

  constructor(page: Page) {
    this.page = page;
    this.page.on("console", (msg) => {
      if (msg.type() === "error") {
        this.lastConsoleError = `${this.currentContext}: ${msg.text()}`;
      }
    });
  }

  async checkDashboard() {
    this.currentContext = "checkDashboard";
    await this.page.goto('/');
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_people_credential() {
    this.currentContext = "check_people_credential";
    
    await this.page.locator(this.people_credentials).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_doors() {
    this.currentContext = "check_doors";
  
    await this.page.locator(this.doors).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_hardware() {
    this.currentContext = "check_hardware";
    
    await this.page.locator(this.hardware).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_access() {
    this.currentContext = "check_access";
  
    await this.page.locator(this.access).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_reports() {
    this.currentContext = "check_reports";
    
    await this.page.locator(this.reports).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async check_customer_List() {
    this.currentContext = "check_customer_List";
    
    await this.page.locator(this.customerList).click();
    // Wait for the page to load
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }
  }

  async checkUserDropdown() {
    this.currentContext = "checkUserDropdown";
    
    await this.page.locator(this.userDropdown).click();
    await this.page.waitForTimeout(1000);
    if (this.lastConsoleError) {
      throw new Error(this.lastConsoleError);
    }

    // Verify that the user profile text is visible
    await expect(this.page.locator(this.userProfileIdIcon)).toBeVisible();
    await expect(this.page.locator(this.userProfileText)).toHaveText(
      "User Profile"
    );
    const obj: Login = new Login(this.page);
    let userId: string =
      (await this.page.locator(this.userAccountIdText).textContent()) || "";
    // Append "_Customer" to the userId becz in the bacend the html is rendered as hN@66H+Gz, so plawright only extract it.

    let userCompany: string =
      (await this.page.locator(this.userCompanyNameText).textContent()) || "";
    const obj1: Common = new Common();
    const credentials: {
      company_name: string;
      user_name: string;
      account_no: string;
    } = obj1.getCustomerCredentials();
    // Verify that the user profile ID text matches the expected format
    await expect(userId).toMatch(credentials.user_name ?? "");
    // Verify that the user profile company name text matches the expected format
    await expect(userCompany).toMatch(credentials.company_name ?? "");
    // Verify that the user profile ID icon is visible
    await expect(this.page.locator(this.userProfileIdIcon)).toBeVisible();
    // Verify that the user profile email icon is visible
    await expect(this.page.locator(this.userProfileEmailIcon)).toBeVisible();
    // Verify that the user profile name icon is visible
    await expect(this.page.locator(this.userProfileNameIcon)).toBeVisible();
    // Verify that the user profile company icon is visible
    await expect(this.page.locator(this.userProfileCompanyIcon)).toBeVisible();
    /*
    const userIdLocator = this.page.locator(this.userAccountIdText);

    const rawHtml = await userIdLocator.evaluate((node) => node.outerHTML);
    const text = await userIdLocator.textContent();
    console.log("Raw HTML:", rawHtml);
    console.log("Text content:", text);
    */
  }
}
