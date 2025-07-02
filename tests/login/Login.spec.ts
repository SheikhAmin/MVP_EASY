import test from "playwright/test";
import { Login } from "./Login";
import { Common } from "../../common/Common";

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

  test("Login with Valid credentials", async ({ page }: { page: any }) => {
    // Create a new instance of required classes
    const obj: Login = new Login(page);
    const obj1: Common = new Common();
    // call getcredentails fn to fetch the credentials
    const credentials: { userName: string; pass: string; id: string } = obj1.getCredentials();
    userName = credentials.userName;
    pass = credentials.pass;
    account = credentials.id;
    // Attempt to log in using the loaded credentials
    await obj.login(account, userName, pass);
  });

  test("Login with Invalid id", async ({ page }: { page: any }) => {
    const obj: Login = new Login(page); // Create a new instance of the Login page object
    // Attempt to log in with deliberately incorrect credentials
    await obj.login("500501", userName, pass);

    // Verify that the correct error message is displayed on the page
    await obj.checkErrorMessage("Invalid username or password");
  });

  test("Login with Customer", async ({ page }: { page: any }) => {
    const obj: Login = new Login(page); // Create a new instance of the Login page object
    // Attempt to log in with deliberately incorrect credentials
    await obj.customerLogin();

  });

  test("Login with Invalid Password", async ({ page }: { page: any }) => {
    // Create a new instance of the Login page object
    const obj: Login = new Login(page);

    // Attempt to log in with deliberately incorrect credentials
    await obj.login(account, userName, "500532askjdk");

    // Verify that the correct error message is displayed on the page
    await obj.checkErrorMessage("Invalid username or password");
  });

  test("Login with Invalid UserName", async ({ page }: { page: any }) => {
    // Create a new instance of the Login page object
    const obj: Login = new Login(page);
    // Attempt to log in with deliberately incorrect credentials
    await obj.login(account, "wrong username", pass);
    // Verify that the correct error message is displayed on the page
    await obj.checkErrorMessage("Invalid username or password");
  });
});
