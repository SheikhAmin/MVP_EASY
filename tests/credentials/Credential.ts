import {Page} from "playwright";
import {expect} from "playwright/test";
import {error} from "console";

export default class Credentials {
    private readonly page : Page;
    private readonly People_Credentials: string = "People, Credentials";
    private readonly total_text : string = "span.total-text";
    private readonly people_text: string = "div.toolbar-center";
    private readonly search_bar: string = "#searchForm>input.form-control";
    private readonly addBtn: string = "#btnAddInFooter";
    private readonly user_Profile_icon: string = "div.profile-container";
    //private readonly profile_Dropdown : string = "div.profile-container";
    private readonly sign_Out_btn : string = 'a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]';
    private readonly credentials_text : string = "People, Credentials";
    private readonly menu_btn : string = "button.menu-btn";
    private readonly menu_btn_credentials : string = "a[href = '/Personnel']";
    private readonly add_btn : string = "#btnAddInFooter";
    private readonly create_people_text: string = "div.toolbar-center>h3";
    private readonly save_btn: string = "#btnSave";
    private readonly back_btn: string = "i.fa.fa-arrow-left.back-icon.icon-only";
    private readonly first_name_error: string = "#firstName-error";
    private readonly last_name_error: string = "#lastName-error";
    private readonly first_name: string = "#firstName";
    private readonly last_name: string = "#lastName";
    private readonly credentials: string = "input.form-control.credential-input";
    private readonly credentials_error:string = "#validation-summary>div>ul>li";
    private readonly credentials_name_list:string = "ul.list-group.rounded-0>li>div>div.ms-3>.name";
    // here credentials_name_list has been split in specific way for implementation purpose(credentials_name_item_list,credentials_name_list_name_el)
    private readonly credentials_name_item_list:string = "ul.list-group.rounded-0>li";
    private readonly credentials_name_list_name_el:string = "div>div.ms-3>.name";
    private readonly total_count:string = "#total-count";
    private readonly search_btn:string = "button.input-group-text"
    private readonly people_list:string = "ul.list-group.rounded-0";
    private readonly people_list_name_el:string = "div.ms-3>.name";

    constructor(page : Page) {
        this.page = page;
    }

    async clickPeople_Credential(){
        await this.page.getByText(this.People_Credentials).click();
    }

    async click_topleft_credential(){
        await this.page.locator(this.menu_btn).click();
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.menu_btn_credentials).first().click();
    }

    async click_add_btn (){
        await this.page.locator(this.addBtn).click();
        await expect(this.page.locator(this.create_people_text)).toBeVisible();
        await expect(this.page.locator(this.create_people_text)).toContainText(" Create People ");
        await expect(this.page.locator((this.save_btn))).toBeVisible();
    }

    async verify_back(){
        await this.page.locator(this.back_btn).click();
        await expect(this.page.locator(this.people_text)).toBeVisible();
        await expect(this.page.locator(this.people_text)).toContainText("People");
    }

    async check_error_msg(){
        await this.page.locator(this.save_btn).click();
        await expect(this.page.locator(this.first_name_error)).toBeVisible();
        await expect(this.page.locator(this.first_name_error)).toContainText("The First Name field is required.");
        await expect(this.page.locator(this.last_name_error)).toContainText("The Last Name field is required.");
    }

    async check_credentials_error(f_name :string, l_name:string){
        await this.page.locator(this.first_name).fill(f_name);
        await this.page.locator(this.last_name).fill(l_name);
        await this.page.locator(this.save_btn).click();
        await expect(this.page.locator(this.credentials_error)).toBeVisible();
        await expect(this.page.locator(this.credentials_error)).toContainText("The Credential field is required.")
    }

    async add_standard_credentials_min(f_name:string, l_name:string, credentials:string){
        await this.page.locator(this.first_name).fill(f_name);
        await this.page.locator(this.last_name).fill(l_name);
        await this.page.locator(this.credentials).fill(credentials);
        await this.page.locator(this.save_btn).click();
        await this.page.waitForTimeout(2000);
    }

    /*
    async search_credentials(input_data:string){
        await this.page.locator(this.search_bar).fill(input_data);
        await this.page.locator(this.search_btn).click();

        const list = this.page.locator(this.people_list);
        const matches = list.locator('li').filter({has: this.page.locator(this.people_list_name_el, {hasText:input_data})});

        const count = await matches.count();
        if(count > 1) throw new Error(`Multiple match found ${count}`);
        if (count == 0) throw new Error(`No matches found ${count}`);
        await matches.click();
    }
    */

    async search_credentials(input_data: string): Promise<void> {
        const q = (input_data ?? '').trim();

        await this.page.locator(this.search_bar).fill(q);
        await this.page.locator(this.search_btn).click();

        const list = this.page.locator(this.people_list);
        await list.first().waitFor({ state: 'visible' }); // wait for results to render

        const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const nameRe = new RegExp(`^${escapeRe(q)}$`, 'i'); // exact, case-insensitive

        console.log(nameRe);
        const matches = list
            .locator('li')
            .filter({
                has: this.page.locator(this.people_list_name_el, { hasText: nameRe }),
            });

        const count = await matches.count();
        if (count === 0) throw new Error(`No matches found for "${q}"`);
        if (count > 1) throw new Error(`Multiple matches found (${count}) for "${q}"`);

        // exactly one match → strict click is safe
        await matches.click();
    }

    async check_standard_credentials_min(f_name:string, l_name:string, credentials:string){
        const first_name: string = await this.page.locator(this.first_name).inputValue();
        await expect(this.page.locator(this.first_name)).toContainText(first_name);

        const last_name: string = await this.page.locator(this.last_name).inputValue();
        await expect(this.page.locator(this.last_name)).toContainText(last_name);

        const credentials_value:string = await this.page.locator(this.credentials).inputValue();
        await expect(this.page.locator(this.credentials)).toContainText(credentials_value);
    }

    async check_duplicate_standard_credentials_f(){
        await expect(this.page.locator(this.credentials_error)).toBeVisible();
        await expect(this.page.locator(this.credentials_error)).toContainText("Badge Exists");
    }

    async delete_standard_credentials_f(f_name:string,l_name:string){
        const full_name = f_name+ " " +l_name;
        const count = await this.page.locator(this.total_count).inputValue();
        const items = await this.page.locator(this.credentials_name_item_list)
        const loop_count:number = await items.count();
        await expect(Number(count)).toEqual(loop_count);

        for(let i=0; i < loop_count; i++){
            //const name_el = items.nth(i).locator(this.credentials_name_item_list[i]);
            const name_el = items.nth(i).locator(this.credentials_name_item_list);
            const text = await name_el.innerText();
            if(text.includes(full_name)){
                await name_el.click();
                return;
            }
        }

        throw new error(`Customer is not found for ${full_name}`);
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