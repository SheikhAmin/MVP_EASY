import {Page} from "playwright";
import {expect} from "playwright/test";

export default class Devices {
    private readonly page : Page;

    private readonly total_text : string = "span.total-text";
    private readonly people_text: string = "div.toolbar-center";

    private readonly addBtn: string = "#btnAddInFooter";
    private readonly user_Profile_icon: string = "div.profile-container";





    constructor(page : Page) {
        this.page = page;
    }


    // this checks visibility of the common feature of this module such as people text, search bar, total text
    async checkVisibility(){
        await expect(this.page.locator(this.total_text)).toContainText("Total:");
        await expect(this.page.locator(this.people_text)).toContainText("Devices");
        await expect(this.page.locator(this.addBtn)).toBeVisible();
        await expect(this.page.locator(this.user_Profile_icon)).toBeVisible();
    }

}