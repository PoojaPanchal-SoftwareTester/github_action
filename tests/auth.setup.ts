import { test as setup } from "../fixtures/loginFixture.ts";
import { expect } from "@playwright/test";
import playwrightConfig from "../playwright.config";
import { HomePage } from "../pages/homePage";

import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config();

const authFile = path.join(__dirname, '../.auth/user.json');

setup('authenticate', async ({ loggedInPage,page }) => {

  // ✅ If session exists — exit immediately, no login
/*  if (fs.existsSync(authFile)) {
    console.log('⚡ Session exists — skipping login');
    return;  // ← done in milliseconds
  }*/

  const homePage = new HomePage(page);
  //await loggedInPage.open();
  console.log('📍 Current URL after open():', page.url());


  // ✅ Wait for page to be ready before interacting
  await page.waitForLoadState('domcontentloaded');


 // await loggedInPage.loginForm(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

 
  await page.waitForURL('/mnjuser/homepage');
  await expect(homePage.completeProfile).toBeVisible();


  // Step 5: Save the session state to file
  await page.context().storageState({ path: authFile });
  console.log('✅ Auth state saved to', authFile);
});