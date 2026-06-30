import { Locator, Page, test } from "@playwright/test"

export class JobPage {

    readonly page: Page;
    readonly jobLink: Locator;
    readonly searchInput: Locator;
    readonly keywords: Locator;
    readonly location: Locator;
    readonly searchBtn: Locator;
    readonly jobDiv: Locator;
    readonly applyBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.jobLink = page.getByTitle("Recommended Jobs");
        this.searchInput = page.getByText("Search jobs here");
        this.keywords = page.getByPlaceholder("Enter keyword / designation / companies");
        this.location = page.getByPlaceholder("Enter location");
        this.searchBtn = page.locator(".ni-gnb-icn.ni-gnb-icn-search");
        this.jobDiv = page.locator(".srp-jobtuple-wrapper");
        this.applyBtn = page.getByRole("button", { name: "Apply",exact:true });
        




    }

    async gotoJobPage() {
        await this.jobLink.click();
    }

    async searchJobs(searchData: any) {
        await this.searchInput.click();
        await this.keywords.click();


        for (const keyword of searchData.keywords) {
            await this.keywords.pressSequentially(keyword + " ,");
            //console.log(keyword);
        }

        await this.location.click();


        for (const location of searchData.locations) {
            await this.location.pressSequentially(location + " ,");
            //console.log(location);
        }

        await this.searchBtn.click();
        for (let i = 0; i <=10; i++) {
            const [newPage] = await Promise.all([
                this.page.context().waitForEvent("page"),
                this.jobDiv.nth(i).click(),
            ]);

            await newPage.waitForLoadState();

            // Perform actions on the new tab

            await newPage.getByRole("button", { name: "Apply" }).click();

            // Close the new tab
            await newPage.close();

            // Continue working on the parent tab
            await this.page.bringToFront();
        }


    }
}