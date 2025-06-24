import { Page } from "playwright";

export default class e2e{
    private readonly page : Page;
    private readonly people_credentials : string = "div.card:nth-child(1)";
    private readonly doors : string =  "div.card:nth-child(2)";
    private readonly hardware : string =  "div.card:nth-child(3)";
    private readonly access : string =  "div.card:nth-child(4)";
    private readonly reports : string =  "div.card:nth-child(5)";
    private readonly customerList : string =  "div.card:nth-child(6)";



    constructor(page : Page){
        this.page = page;
    }

    async check_people_credential(){
        await this.page.locator(this.people_credentials).click();
        //await this.page.getConsoleMessages();
    }

    async check_doors(){
        await this.page.locator(this.doors).click();
      
    }

    async check_hardware(){
        await this.page.locator(this.hardware).click();
      
    }

    async check_access(){
        await this.page.locator(this.access).click();
        //await this.page.getConsoleMessages();
    }

    async check_reports(){
        await this.page.locator(this.reports).click();
        //await this.page.getConsoleMessages();
    }

    async check_customer_List(){
        await this.page.locator(this.customerList).click();
        //await this.page.getConsoleMessages();
    }
}