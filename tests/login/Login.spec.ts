import { describe } from "node:test";
import test from "playwright/test";
import fs from "fs";
import path from "path";
import { Login } from "./Login";

describe("Login Test Suite", () => {
    let userName : string;
    let pass : string;
    let id : string;

    test.beforeEach('Visit Login Page', async ({ page }) => {
        await page.goto('/');
    });

    test('Login with Valid Credentials',async({page})=>{
        const obj = new Login(page);
        const fixturePath = path.join('fitures', 'credentials.json');
        if(!fs.existsSync(fixturePath)){
            console.error("Credentials file not found. Please run the registration test first.");
            return;
        }
        const credentials = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
        userName = credentials.userName;
        pass = credentials.pass;
        id  = credentials.id;
        await obj.login(userName, pass,id);
        await page.waitForTimeout(10000);

    });

    test('Login with Invalid Credentials', async ({ page }) => {
        const obj = new Login(page);
        await obj.login("invalidUser", "invalidPass", "invalidId");
        // Verify that the error message is displayed
        await obj.checkErrorMessage("Invalid username or password");
        
        
      
    });
});