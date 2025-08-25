import test from "playwright/test";
import { Login } from "./Login";
import { Common } from "../../common/Common";
import {expect} from "@playwright/test";
import {Forgot_Password} from "./Forgot_Password";

test.describe("Login Test Suite", () => {
  // Variables to store user credentials loaded from file
  let account: string;
  let userName: string;
  let pass: string;

  // This hook runs before each test in this suite
  test.beforeEach("Visit Login Page", async ({ page }: { page: any }) => {
    // Navigates to the application's home/login page before each test
    await page.goto("/");
  });

  test.afterEach("Close Page", async ({ page }: { page: any }) => {
    // Wait for 1 seconds (for demonstration or waiting for page load)
    await page.waitForTimeout(1000);
    // Closes the page after each test to ensure a clean state for the next test
    await page.close();
  });

    test("Login With account number & username", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName,'');
    });

    test("Login With  username & password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.login('', userName,pass);
    });

    test("Login With account number & password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        account = credentials.id;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.login(account, '',pass);
    });

  test("Login with valid account number, username, password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName, pass);
  });

  test("Login with wrong account number, correct username & password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.login('111111', userName,pass);
        await obj.checkErrorMessage("Invalid username or password");
    });

    test("Login with wrong password, correct username &  account number", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName,'Cic!2345609');
        await obj.checkErrorMessage("Invalid username or password");
    });

    test("Login with wrong username, correct password & account number", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        account = credentials.id;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.login(account, 'userName_1',pass);
        await obj.checkErrorMessage("Invalid username or password");
    });


    test("Login in with wrong account , username, password", async ({ page }: { page: any }) => {
        const obj: Login = new Login(page); // Create a new instance of the Login page object
        // Attempt to log in with deliberately incorrect credentials
        await obj.login("1111111", 'userName_1', 'Cic!23456098');
        // Verify that the correct error message is displayed on the page
        await  expect(page.locator('#Account-error')).toContainText("Account is required.");
        await  expect(page.locator('#Username-error')).toContainText("Username is required.");
        await  expect(page.locator('#passwordField-error')).toContainText("Password is required.");
  });


    test("Log in, click sign out", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName, pass);
        await obj.sign_out();
    });


    test("Check remember me & login. Verify remember me", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        await page.lcator('#RememberMe').check();
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName, pass);
        await obj.sign_out();
        await page.locator("button[type='submit'].btn.btn-primary.w-100").click();
        await page.waitForTimeout(3000);
        await expect(page.locator("#profile-dropdown")).toBeVisible();
    });


















    //----------------------------------- Forgot Password ------------------------------------ //

    test('Click Forgot Password', async ({ page }: { page: any }) => {
        const obj: Forgot_Password = new Forgot_Password(page);
        await obj.forgot_password();
    })

    test('Provide correct account num & username, wrong email', async ({ page }: { page: any }) => {
        const obj: Forgot_Password = new Forgot_Password(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
        userName = credentials.userName;
        account = credentials.id;
        await obj.forgot_pass_request(account, userName, 'amremailnai@gmail.com');
        await obj.wrong_email();
    })

    test('Provide empty input click request', async ({ page }: { page: any }) => {
        const obj: Forgot_Password = new Forgot_Password(page);
        await obj.forgot_pass_request('', '', '');
        await obj.verify_required_field_error_msg();
    })

    test('Click back button', async ({ page }: { page: any }) => {
        const obj: Forgot_Password = new Forgot_Password(page);
        await page.locator("a.text-decoration-none.text-primary").click();
        await obj.back_btn_check();
    })
});
