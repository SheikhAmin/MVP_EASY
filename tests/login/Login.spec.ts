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
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login(account, userName,'')
        await obj.password_error_msg_verify("Password is required.");
    });

    test("Login With  username & password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login('', userName,pass)
        await obj.account_error_msg_verify("Account is required.");
    });

    test("Login With account number & password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        account = credentials.id;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login(account, '',pass)
        await obj.username_error_msg_verify("Username is required.");
    });

  test("Login with valid account number, username, password", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
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
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login('500582', userName,pass);
        await obj.checkErrorMessage("Invalid username or password");
    });

    test("Login with wrong password, correct username &  account number", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        account = credentials.id;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login(account, userName,'Cic!2345609');
        await obj.checkErrorMessage("Invalid username or password");
    });

    test("Login with wrong username, correct password & account number", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        account = credentials.id;
        pass = credentials.pass;
        // Attempt to log in using the loaded credentials
        await obj.invalid_login(account, 'userName_1',pass);
        await obj.checkErrorMessage("Invalid username or password");
    });


    test("Login in with wrong account , username, password", async ({ page }: { page: any }) => {
        const obj: Login = new Login(page); // Create a new instance of the Login page object
        // Attempt to log in with deliberately incorrect credentials
        await obj.invalid_login("1111111", 'userName_1', 'Cic!23456098');
        // Verify that the correct error message is displayed on the page
        await obj.checkErrorMessage("Invalid username or password");
  });

    test("Provide empty input click login", async ({ page }: { page: any }) => {
        const obj: Login = new Login(page); // Create a new instance of the Login page object
        // Attempt to log in with deliberately incorrect credentials
        await obj.invalid_login("", '', '');
        // Verify that the correct error message is displayed on the page
        await obj.username_error_msg_verify("Username is required.");
        await obj.password_error_msg_verify("Password is required.");
        await obj.account_error_msg_verify("Account is required.");
    });


    test("Log in, click sign out", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
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
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        pass = credentials.pass;
        account = credentials.id;
        await obj.check_remember_me();
        // Attempt to log in using the loaded credentials
        await obj.login(account, userName, pass);
        await obj.sign_out();
        await obj.verify_remember_me(account,userName,pass);
    });

    test("Log in with account number 111111; all other inputs are valid", async ({ page }: { page: any }) => {
        // Create a new instance of required classes
        const obj: Login = new Login(page);
        const obj1: Common = new Common();
        // call getCredentials fn to fetch the credentials
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
        userName = credentials.userName;
        pass = credentials.pass;

        // Attempt to log in using the loaded credentials
        await obj.invalid_login("111111", userName, pass)
        await obj.account_error_msg_verify("Account must be between 500500 and 999999999.");
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
        const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials("credentials.json");
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
        await obj.click_forgot_password();
        await obj.back_btn_check();
    })
});
