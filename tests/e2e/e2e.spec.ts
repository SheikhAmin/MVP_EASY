import { test } from "@playwright/test";
import e2e from "./e2e";
import { Login } from "../login/Login";
import { error } from "console";
import { Common } from "../../common/Common";

test.describe("MVP EZ e2e test", () => {
  // this test checks if any console errors are present after loading the dashboard and checking various functionalities
  test("Conduct e2e test", async ({ page }) => {
    //visit the page
    await page.goto("/");
    //create necessary obj
    const obj: e2e = new e2e(page);
    const obj1: Login = new Login(page);
    const obj2: Common = new Common();
    //Login to the application
    const credentials = obj2.getCredentials();
    const userName: string = credentials.userName;
    const pass: string = credentials.pass;
    const account: string = credentials.id;

    // Login to the application using the credentials
    await obj1.login(account, userName, pass);
    await obj1.customerLogin();
    // Check various functionalities of the application
    await obj.checkDashboard();
    await page.goto("/");
    // Check for console errors after loading the dashboard
    await obj.check_people_credential();
    await page.goto("/");
    await obj.check_doors();
    await page.goto("/");
    await obj.check_hardware();
    await page.goto("/");
    await obj.check_access();
    await page.goto("/");
    await obj.check_reports();
    await page.goto("/");
    await obj.check_customer_List();
    await page.goto("/");
    await obj.checkUserDropdown();
  });
});
