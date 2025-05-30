import { beforeEach, describe } from "node:test";
import { DealerRegistration } from "../Pom/DealerRegistration";
import { queryLatestUser } from "../database/fetchCredentials";
import { Common } from "../Pom/Common";

import { test, expect } from "@playwright/test";

describe("Test Cases",()=>{
    const obj1 = new Common();
    let userName  : string = obj1.generateRandomStringWithNumber();
    let pass : string = obj1.generateRandomStringWithNumber();
    let id : string;
    test.beforeEach('Visit', async ({page})=>{
        await page.goto('/');
    })


    test("New Dealer Registration",async ({page})=>{
        const obj = new DealerRegistration(page);
        await obj.clickNewDealerReg("New Dealer Registration");
        //id, pass, addr, company, first, last, city, email, phone, zipcode
        id = await obj.formFillUp(userName,pass,"Tejgaon","Ael_napco","Sheikh","Amin","Dhaka","samin@ael-bd.com","0152125565","1215");
        await page.screenshot({ path: 'screenshots/fullpage.png', fullPage: true })
    })
/*
    test('Login',async({page})=>{
        await page.locator("input#Account").fill("500502");
        await page.locator("input#Username").fill("CustomerDealer123");
        await page.locator("input#passwordField").fill("Cic!23456789");
        await page.locator("button[type='submit'].btn.btn-primary.w-100").click();
        await page.waitForTimeout(10000);
    })

*/
})