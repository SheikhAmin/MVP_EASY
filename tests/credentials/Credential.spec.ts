import { test, expect, devices } from '@playwright/test';


import Credentials from "./Credential";
import {Login} from "../login/Login";
import {Common} from "../../common/Common";


test.describe("Credentials Test", () => {
    let userName: string;
    let pass: string;
    let account: string;

    test.beforeEach('Log in' ,async ({page}:{page}) => {
        await page.goto('/');

        const obj1:Login = new Login(page);
        const obj2: Common = new Common();

        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj2.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj1.login(account, userName, pass);
    })

    test.afterEach('Sign out' ,async ({page}:{page}) => {
        await page.locator("div.profile-container").click();
        //await page.waitForTimeout(10000);
        await page.locator('a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]').click();
        await page.close();
    })

    test.skip('Sign out' ,async ({page}:{page}) => {
        //await page.pause();
        await page.locator("div.profile-container").click();
        //await page.waitForTimeout(10000);
        await page.locator('a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]').click();

    })

    test("Checking the Visibility of the module", async ({page} : {page})=>{
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.checkVisibility();

    })

    test('Click People, Credentials',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
    })

    test('From top left button, click it then click credentials',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.click_topleft_credential();
    })


    test('From People section, click add',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await page.locator("div.profile-container").click();
        //await page.waitForTimeout(10000);
        await page.locator('a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]').click();
    })

    test('From People section, click add then back',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.verify_back();
    })

    test('From People section, click add then save check error message',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.check_error_msg();
    })

    test('From People section, click add then save & then back',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.check_error_msg();
        await obj.verify_back();
    })

    test('Provide First & Last Name, click save; check error message from credentials field',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.check_credentials_error('f_name','l_name');
    })

    // need to know search logic for implementation
    test('Provide First ,Last Name, Credential & then click save  & then open that credential & check the info',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.add_standard_credentials_min('standard', 'account','52945');
        await page.waitForTimeout(2000);
        await obj.search_credentials("standard");
        await obj.check_standard_credentials_min('standard', 'account','52945');

    })


    test('Provide First ,Last Name, duplicate Credential & then click save, check error message',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.click_add_btn();
        await obj.add_standard_credentials_min('standard', 'account','52945');
        await obj.check_duplicate_standard_credentials_f();
    })

    // need to know search logic for implementation
    test.skip('Open a previously create standard crededntial click delete',async ({page}:{page}) => {
        const obj:Credentials = new Credentials(page);


    })
})