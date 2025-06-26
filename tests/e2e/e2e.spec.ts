import { test} from "@playwright/test";
import { describe } from "node:test";
import e2e from "./e2e"
import { Login } from "../login/Login";
import { error } from "console";
import { Common } from "../../common/Common";

describe('MVP EZ e2e test',()=>{

    test('conduct e2e', async({page})=>{
        //visit the page
        page.goto('/');
        //create necessary obj
        const obj = new e2e(page);
        const obj1 = new Login(page);
        const obj2 = new Common();
        //Login to the application
        const credentials = obj2.getCredentials();
        const userName = credentials.userName;
        const pass = credentials.pass;
        const account = credentials.id;

        // Login to the application using the credentials
        await obj1.login(account, userName, pass);
        await obj1.customerLogin();
        // Check various functionalities of the application
        await obj.checkDashboard();
        // Check for console errors after loading the dashboard 
        await obj.check_people_credential();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.check_doors();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.check_hardware();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.check_access();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.check_reports();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.check_customer_List();
        await page.goto('/');
        await page.waitForTimeout(1000);
        await obj.checkUserDropdown();
    })
})