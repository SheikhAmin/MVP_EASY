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
        await page.locator("#profile-dropdown").click();
        await page.locator('a.btn.btn-primary.w-100.py-2.fw-bold[href="/Account/Logout"]').click();

        await page.close();
    })


    test("Checking the Visibility of the module", async ({page} : {page})=>{
        const obj:Credentials = new Credentials(page);

        await obj.clickPeople_Credential();
        await obj.checkVisibility();

    })
})