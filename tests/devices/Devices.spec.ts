import { test, expect, devices } from '@playwright/test';

import {Login} from "../login/Login";
import {Common} from "../../common/Common";
import Devices from "./Devices";
import CustomerList from "../customer_list/Customer_List";

//test.use(devices['iPhone 13 Pro']);

test.describe("Devices", () => {
    let userName: string;
    let pass: string;
    let account: string;


    test("Devices Test", async ({page}:{page}) => {
        await page.goto('/');

        const obj:Devices = new Devices(page);
        const obj1:Login = new Login(page);
        const obj2: Common = new Common();
        const obj3:CustomerList = new CustomerList(page);

        // call getCredentials fn to fetch the credentials
        const credentials = obj2.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj1.login(account,userName,pass);
        await obj3.clickNext();
        await obj.clickDevices();
        await obj.checkVisibility();
        await obj.checkScrollFunctionality();

        await obj.clickAddDevice();
        //Checks overall visibility of AddDevice section
        await obj.checkAddDeviceModule();


    })
})