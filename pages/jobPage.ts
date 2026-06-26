import {Locator, Page, test} from "@playwright/test"

export class JobPage{
     
    readonly page: Page;
    readonly jobLink:Locator;
    readonly searchInput: Locator;
    readonly keywords:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.jobLink = page.getByTitle("Recommended Jobs");
        this.searchInput = page.getByText("Search jobs here");
        this.keywords =  page.getByPlaceholder("Enter keyword / designation / companies");


    }

    async gotoJobPage()
    {
        await this.jobLink.click();
    }

    async searchJobs(searchData: any)
    {
          await this.searchInput.click();
          await this.keywords.click();
   
         

          for(const index of searchData.keywords)
          {
            await this.keywords.fill(index);
                 console.log(index);
          }
    }
}