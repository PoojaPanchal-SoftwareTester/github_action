import { test as base } from "@playwright/test"

import { LoginPage } from "../pages/login"

type myFixture = {
    loggedInPage: LoginPage;
}

export const test = base.extend<myFixture>
    ({
        loggedInPage: async ({ page }, use) => {
            const loginPage = new LoginPage(page);
            await loginPage.open();
            await loginPage.loginForm(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
            await use(loginPage);
            // Cleanup after test (optional)
            console.log("Test Finished");
        }
    });