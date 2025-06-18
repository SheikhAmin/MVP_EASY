import { describe } from "node:test";
import test from "playwright/test";
import fs from "fs";
import path from "path";
import { Login } from "./Login";

describe("Login Test Suite", () => {
    test.beforeEach('Visit Login Page', async ({ page }) => {
        await page.goto('/');
    });

    test('Login',async({page})=>{
        const obj = new Login(page);
        const fixturePath = path.join('fitures', 'credentials.json');
        if(!fs.existsSync(fixturePath)){
            console.error("Credentials file not found. Please run the registration test first.");
            return;
        }
        const credentials = JSON.parse(fs.readFileSync(fixturePath, 'utf-8'));
        let userName : string = credentials.userName;
        let pass : string = credentials.pass;
        let id : string = credentials.id;
        await obj.login(userName, pass,id);
        await page.waitForTimeout(10000);

    })
});