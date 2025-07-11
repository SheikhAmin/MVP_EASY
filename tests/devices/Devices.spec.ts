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



    test.beforeEach('Visit & login', async ({page}:{page}) => {
        await page.goto('/');



        const obj2: Common = new Common();


        // call getCredentials fn to fetch the credentials
        const credentials = obj2.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
    })

    test("Devices Test: Test overall device set", async ({page}:{page}) => {


        const obj:Devices = new Devices(page);
        const obj1:Login = new Login(page);

        const obj3:CustomerList = new CustomerList(page);



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
    // this test creates dummy panel then check the hardware list for newly created panel
    test('Create a Dummy Panel', async ({page}:{page}) => {
        const obj:Devices = new Devices(page);
        const obj1:Login = new Login(page);

        const obj3:CustomerList = new CustomerList(page);
        await obj1.login(account,userName,pass);
        await obj3.clickNext();
        await obj.clickDevices();
        await obj.clickAddDevice();
        await obj.createPanel("NA-1");

    })
})