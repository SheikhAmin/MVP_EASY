import { test, expect, devices } from '@playwright/test';
import Credentials from "../credentials/Credential";
import {Login} from "../login/Login";
import {Common} from "../../common/Common";
import Devices from "./Devices";

//test.use(devices['iPhone 13 Pro']);

test.describe("Devices", () => {
    let userName: string;
    let pass: string;
    let account: string;


    test("Devices", async ({page}:{page}) => {
        await page.goto('/');

        const obj:Devices = new Devices(page);
        const obj1:Login = new Login(page);
        const obj2: Common = new Common();

        // call getCredentails fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj2.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj1.login(account, userName, pass);


    })
})