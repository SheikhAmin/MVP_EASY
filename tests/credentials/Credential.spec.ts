import { test, expect, devices } from '@playwright/test';


import Credentials from "./Credential";
import {Login} from "../login/Login";
import {Common} from "../../common/Common";


test.describe("Credentials Test", () => {
    let userName: string;
    let pass: string;
    let account: string;



    test("Checking the Visibility of the module", async ({page} : {page})=>{
        await page.goto('/');

        const obj:Credentials = new Credentials(page);
        const obj1:Login = new Login(page);
        const obj2: Common = new Common();

        // call getCredentails fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj2.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj1.login(account, userName, pass);


        await obj.clickPeople_Credential();
        await obj.checkVisibility();

    })
})