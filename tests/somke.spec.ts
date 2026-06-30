import { test, expect } from "@playwright/test";

import { HomePage } from "../pages/homePage";
import { JobPage } from "../pages/jobPage";
import SearchKeywords from "../utils/searchData.json"

test("Checking login", async ({ page }) => {

  const homePage = new HomePage(page);
  const jobPage = new JobPage(page);


  await homePage.goto();

  // ✅ Confirm session is working — should NOT redirect to login
  await expect(page).toHaveURL(/mnjuser\/homepage/, { timeout: 30000 });

  /*await homePage.profileComplete();

  const date = new Date(); //current date

  const formattedDate = date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  console.log(formattedDate); //current date in format jun 25, 2026

  await expect(homePage.uploadedDate).toContainText(`Uploaded on ${formattedDate}`);*/

  //calling job pagr

  await jobPage.gotoJobPage();

  //await page.pause();

  //search jobs

  await jobPage.searchJobs(SearchKeywords);

})