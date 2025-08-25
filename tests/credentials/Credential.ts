import {Page} from "playwright";
import {expect} from "playwright/test";

export default class Credentials {
    private readonly page : Page;
    private readonly People_Credentials: string = "People, Credentials";
    private readonly total_text : string = "span.total-text";
    private readonly people_text: string = "div.toolbar-center";
    private readonly search_bar: string = "#searchForm";
    private readonly addBtn: string = "#btnAddInFooter";
    private readonly user_Profile_icon: string = "div.profile-container";
    private readonly profile_Dropdown : string = "#profile-dropdown";
    private readonly sign_Out_btn : string = 'a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]';
    private readonly credentials_text : string = "People, Credentials";

    constructor(page : Page) {
        this.page = page;
    }

    async clickPeople_Credential(){
        await this.page.getByText(this.People_Credentials).click();
    }

    // this checks visibility of the common feature of this module such as people text, search bar, total text
    async checkVisibility(){
        await expect(this.page.locator(this.total_text)).toContainText("Total:");
        await expect(this.page.locator(this.people_text)).toContainText("People");
        await expect(this.page.locator(this.search_bar)).toBeVisible();
        await expect(this.page.locator(this.addBtn)).toBeVisible();
        await expect(this.page.locator(this.user_Profile_icon)).toBeVisible();
    }


}