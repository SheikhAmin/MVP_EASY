import {Page} from "playwright";

export default class CustomerList {
    private readonly page: Page;
    private readonly nextBtn: string = "div.position-relative"




    constructor(page: Page) {
        this.page = page;
    }

    async clickNext(){
        await this.page.locator(this.nextBtn).click();
    }
}