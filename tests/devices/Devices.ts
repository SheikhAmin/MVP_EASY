import {Page} from "playwright";
import {expect} from "playwright/test";
import {Common} from "../../common/Common";
import {error} from "console";

export default class Devices {
    private readonly page : Page;
    private readonly devices : string = "i.fas.fa-cogs"
    private readonly total_text : string = "span.total-text";
    private readonly add_new_device_text: string = "div.toolbar-center";
    private readonly people_text : string = "div.toolbar-center";
    private readonly addBtn: string = "#btnAddInFooter";
    private readonly user_Profile_icon: string = "div.profile-container";
    private readonly wireless_gateway : string = "div.form-check>#wirelessGateway";
    private readonly panel : string = "#panel";
    private readonly wirelessLock : string = "#wirelessLock";
    private readonly mobileLinkLock : string = "#mobileLinkLock";
    private readonly addDeviceBtn : string = "#submitButton";
    private readonly name : string = "#Name";
    private readonly macAddress : string = "#MacAddress";
    private readonly backBtn : string = "i.fa.fa-arrow-left.back-icon.icon-only";
    private readonly panelType : string = "#PanelType";
    private readonly allDeviceList = "ul.list-group.rounded-0"

    constructor(page : Page) {
        this.page = page;
    }


    // this checks visibility of the common feature of this module such as people text, search bar, total text
    async checkVisibility(){
        await expect(this.page.locator(this.total_text)).toContainText("Total:");
        await expect(this.page.locator(this.people_text)).toContainText("Devices");
        await this.page.waitForTimeout(2000);
        await expect(this.page.locator(this.addBtn)).toBeVisible();
        await expect(this.page.locator(this.user_Profile_icon)).toBeVisible();
    }

    async clickDevices(){
        await this.page.locator(this.devices).nth(1).click();
    }

    async checkScrollFunctionality(){
        const initialScroll = await this.page.evaluate(() => window.scrollY);
        // Try to scroll to the bottom of the page
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        // Wait for the scroll to complete
        await this.page.waitForTimeout(300); // optional for slow UIs
        // Get updated scroll position
        const afterScroll = await this.page.evaluate(() => window.scrollY);
        await expect(afterScroll).toBeGreaterThan(initialScroll);
    }

    async clickAddDevice(){
        await this.page.locator(this.addBtn).click();
    }

    async checkAddDeviceModule(){

        await expect(this.page.locator(this.add_new_device_text)).toBeVisible();
        await expect(this.page.locator(this.add_new_device_text)).toContainText('Add New Device');
        await expect(this.page.locator(this.addDeviceBtn)).toBeVisible();
        await expect(this.page.locator(this.panel)).toBeVisible();
        await expect(this.page.locator(this.mobileLinkLock)).toBeVisible();
        await expect(this.page.locator(this.wirelessLock)).toBeVisible();
        await expect(this.page.locator(this.wireless_gateway)).toBeVisible();
        await expect(this.page.locator(this.wireless_gateway)).toBeChecked();


        await expect(this.page.locator(this.name)).toHaveAttribute('data-val-required', 'Name is required');
        await expect(this.page.locator(this.macAddress)).toHaveAttribute('data-val-required', 'MAC Address is required');
        await this.page.locator(this.backBtn).click();
        await expect(this.page.locator(this.people_text)).toContainText("Devices");

    }

    async createPanel(panelType:string){
        await expect(this.page.locator(this.panel)).toBeVisible();
        //await expect(this.page.locator(this.panel)).toBeChecked();
        await this.page.locator(this.panel).check();
        const obj = new Common();
        let deviceName : string;
        let mac = obj.generateDummyMAC();
        if (panelType.toUpperCase() === 'NA-1' || panelType.toUpperCase() === 'NA-2'){
            await this.page.selectOption(this.panelType,panelType.toUpperCase());
            deviceName = `test_${panelType.toUpperCase()}`
            await this.page.locator(this.name).fill(`test_${panelType.toUpperCase()}`);
        }
        else {
            throw new error("Unsupported Panel Type");
        }
        //console.log(mac);
        await this.page.locator(this.macAddress).fill(mac);
        await this.page.locator(this.addDeviceBtn).click();
        await this.page.waitForTimeout(5000);
        //await this.page.selectOption(this.allDeviceList,)
        await  this.page.waitForTimeout(5000);




        // Wait for the list to load (important if data loads dynamically)
        await this.page.waitForSelector('ul.list-group.rounded-0');

        // Locate all <li> items inside the UL
        const items = await this.page.locator('ul.list-group.rounded-0>li');

        const count = await items.count();
        let found = false;

        for (let i = 0; i < count; i++) {
            const text = await items.nth(i).innerText();
            if (text.includes(deviceName)) {
                found = true;
                console.log(`✅ Device "${deviceName}" found in list.`);
                break;
            }
        }

        expect(found).toBeTruthy(); // Fails test if not found
    }




}