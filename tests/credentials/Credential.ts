import {Page} from "playwright";
import {expect} from "playwright/test";
import {error} from "console";
import {Common} from "../../common/Common";
// @ts-ignore
import path from "path";
// @ts-ignore
import fs from "fs";

export default class Credentials {
    private readonly page : Page;
    private readonly People_Credentials: string = "People, Credentials";
    private readonly total_text : string = "span.total-text";
    private readonly people_text: string = "div.toolbar-center";
    private readonly search_bar: string = "#searchForm>input.form-control";
    private readonly addBtn: string = "#btnAddInFooter";
    private readonly user_Profile_icon: string = "div.profile-container";
    //private readonly profile_Dropdown : string = "div.profile-container";
    private readonly sign_out_btn : string = 'a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]';
    private readonly credentials_text : string = "People, Credentials";
    private readonly menu_btn : string = "button.menu-btn";
    private readonly menu_btn_credentials : string = "a[href = '/Personnel']";
    private readonly create_people_text: string = "div.toolbar-center>h3";
    private readonly save_btn: string = "#btnSave";
    private readonly back_btn: string = "i.fa.fa-arrow-left.back-icon.icon-only";
    private readonly first_name_error: string = "#firstName-error";
    private readonly last_name_error: string = "#lastName-error";
    private readonly first_name: string = "#firstName";
    private readonly last_name: string = "#lastName";
    private readonly mid_name: string = "#middleName";
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
    private readonly additional_personal_info:string = "#btn-additional-person";
    private readonly location:string = "#SelectedLocation";
    private readonly department:string = "#SelectedDepartment";
    private readonly note:string = "#Remarks";
    private readonly enable_mobile_opr:string = "#createOperatorToggle";
    private readonly personnel_userId:string = "#personnelUserId";
    private readonly personnel_password:string = "#passwordField";
    private readonly personnel_retype_password:string = "#confirmPasswordField";
    private readonly mobile_number:string = "#mobileNo";
    private readonly email:string = "#Email";
    private readonly image_up:string = "#photoUpload";
    private readonly old_password:string = "#oldPassword";
    private readonly new_password:string = "#newPassword";
    private readonly confirm_password:string = "#confirmPassword";
    private readonly update_password:string = "button.btn.btn-primary.w-100[type='submit']";

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

    async click_additional_info(){
        await this.page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.additional_personal_info).click();
    }

    async check_visible_additional_info(){
        await expect(this.page.locator(this.location)).toBeVisible();
        await expect(this.page.locator(this.department)).toBeVisible();
        await expect(this.page.locator(this.note)).toBeVisible();
    }

    async check_Hidden_additional_info(){
        await expect(this.page.locator(this.location)).toBeHidden();
        await expect(this.page.locator(this.department)).toBeHidden();
        await expect(this.page.locator(this.note)).toBeHidden();
    }

    async add_common_info(f_name :string, l_name:string, m_name:string, location:string, department:string, note:string, email:string, mobile:string){
        await this.page.locator(this.first_name).fill(f_name);
        await this.page.locator(this.last_name).fill(l_name);
        await this.page.locator(this.mid_name).fill(m_name);
        await this.page.locator(this.additional_personal_info).click();
        await this.page.locator(this.location).fill(location);
        await this.page.locator(this.department).fill(department);
        await this.page.locator(this.note).fill(note);
        await this.page.locator(this.email).fill(email);
        await this.page.locator(this.mobile_number).fill(mobile);
    }

    async mobileopr_except_admin_enable(){
        await this.page.locator(this.enable_mobile_opr).check();
        await expect(this.page.locator(this.personnel_userId)).toBeVisible();
        await expect(this.page.locator(this.personnel_password)).toBeVisible();
        await expect(this.page.locator(this.personnel_retype_password)).toBeVisible();
        const userName : string = "mobileopr_except_admin_enable3";
        const password: string = "Cic!2345678";
        await this.page.locator(this.personnel_userId).fill(userName);
        await this.page.locator(this.personnel_password).fill(password);
        await this.page.locator(this.personnel_retype_password).fill(password);

        const obj = new Common();

        const credentials : {userName: string, pass: string, id: string} = obj.getCredentials("credentials.json");
        let my_id = Number(credentials.id);
        const account_num : string = my_id.toString();

        const my_credentials  = {userName,password,account_num,};
        const fixturePath = path.join('fixtures', 'Enable_Administrator_Unchecked.json');
        fs.writeFileSync(fixturePath, JSON.stringify(my_credentials, null, 3));

        await this.image_upload();
        await this.page.locator(this.save_btn).click();
        await this.page.waitForTimeout(5000);
    }

    async image_upload(){
        await this.page.locator(this.image_up).setInputFiles('upload_files/image.jpg');
    }

    async sign_out(){
        await this.page.locator(this.user_Profile_icon).click();
        await this.page.locator(this.sign_out_btn).click();
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

    async check_password_change_module(){
        await expect(this.page.locator(this.old_password)).toBeVisible();
        await expect(this.page.locator(this.new_password)).toBeVisible();
        await expect(this.page.locator(this.confirm_password)).toBeVisible();
        await expect(this.page.locator(this.update_password)).toBeVisible();
    }

}