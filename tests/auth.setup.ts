import {test as setup, expect} from "@playwright/test";
import { LoginPage } from "../pages/login";
import playwrightConfig from "../playwright.config";
import { HomePage } from "../pages/homePage";

import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ page }) => {

      // ✅ If session exists — exit immediately, no login
  /*if (fs.existsSync(authFile)) {
    console.log('⚡ Session exists — skipping login');
    return;  // ← done in milliseconds
  }*/

  const loginPage = new LoginPage(page);
      const homePage = new HomePage(page);
     await loginPage.open();
     console.log('📍 Current URL after open():', page.url());


    // ✅ Wait for page to be ready before interacting
    await page.waitForLoadState('domcontentloaded');

  /*   const loginRequestPromise = page.waitForRequest(request =>
  request.method() === 'POST'
);*/
     await loginPage.loginForm(process.env.TEST_USERNAME!,process.env.TEST_PASSWORD!);

    // const loginRequest = await loginRequestPromise;

//console.log('URL:', loginRequest.url());
//console.log('Payload:', loginRequest.postData());
   await page.waitForURL('/mnjuser/homepage');
    await expect(homePage.completeProfile).toBeVisible();

    
      // Step 5: Save the session state to file
  await page.context().storageState({ path: authFile });
   console.log('✅ Auth state saved to', authFile);
});