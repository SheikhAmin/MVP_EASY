import { beforeEach, describe } from "node:test";
import { DealerRegistration } from "../Pom/DealerRegistration";

import { Common } from "../common/Common";

import { test, expect } from "@playwright/test";
import path from "path";
import fs from "fs";
import { Login } from "../Pom/Login";

describe("Test Cases",()=>{
    const obj1 = new Common();
    let userName  : string = obj1.generateRandomStringWithNumber();
    let pass : string = obj1.generateRandomStringWithNumber();
    let id : string;
    test.beforeEach('Visit', async ({page})=>{
        await page.goto('/');
    })


    test.only("New Dealer Registration",async ({page})=>{
        const obj = new DealerRegistration(page);
        await obj.clickNewDealerReg("New Dealer Registration");
        //id, pass, addr, company, first, last, city, email, phone, zipcode
        id = await obj.formFillUp(userName,pass,"Tejgaon","Ael_napco","Sheikh","Amin","Dhaka","samin@ael-bd.com","0152125565","1215");
        await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true });
        const credentials = {userName, pass, id};   
        const fixturePath = path.join('fixtures', 'credentials.json');
        fs.writeFileSync(fixturePath, JSON.stringify(credentials, null, 3));
    })

    test('Login',async({page})=>{
        const obj = new Login(page);
        const fixturePath = path.join('fitures', 'credentials.json');
        if(!fs.existsSync(fixturePath)){
            console.error("Credentials file not found. Please run the registration test first.");
            return;
        }
        const credentials = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
        userName = credentials.userName;
        pass = credentials.pass;
        id = credentials.id;
        await obj.login(userName, pass,id);
        await page.waitForTimeout(10000);

    })


})