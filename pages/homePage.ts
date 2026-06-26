import { Locator, Page } from "@playwright/test";

export class HomePage{

    readonly page:Page;
    readonly completeProfile: Locator;
    readonly updateResume: Locator;
    readonly chooseFile: Locator;
    readonly uploadedDate: Locator;

    constructor(page: Page)
    {
        this.page = page;
        this.completeProfile= page.getByRole('link',{name:"Complete profile"})
        this.updateResume = page.getByRole('button', { name: 'Update resume' });
        this.chooseFile = page.getByRole('button', { name: 'Choose File' });
        this.uploadedDate = page.locator(".updateOn.typ-14Regular");
    }

    async goto()
    {
        await this.page.goto('/mnjuser/homepage')
         // ✅ Wait for page to fully settle after session injection
    await this.page.waitForURL('**/mnjuser/homepage', {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    }

    async profileComplete()
    {
      await this.completeProfile.click();
      await this.updateResume.click();
      await this.chooseFile.setInputFiles('uploads/mohan.docx')
  
    }

  
}