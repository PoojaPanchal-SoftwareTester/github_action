import { Locator, Page } from "@playwright/test";
import playwrightConfig from "../playwright.config";
import { HomePage } from "./homePage";

export class LoginPage{

    readonly page: Page;
    readonly emailInput : Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;
    readonly homeLoginBtn:Locator;
    readonly homeTitle:Locator;
     
    constructor(page:Page)
    {
        this.page = page;
        this.homeLoginBtn= page.getByRole('link', { name: 'Login', exact: true });
        this.emailInput = page.getByRole('textbox', { name: 'Enter your active Email ID /' });
        this.password = page.getByRole('textbox', { name: 'Enter your password' });
        this.loginBtn = page.getByRole('button', { name: 'Login', exact: true });
        this.homeTitle = page.locator('.info__heading');

    } 

    async open()
    {

        await this.page.goto('/')
         //await this.page.pause();
        // console.error('Login failed - Login button not found. Current URL:', this.page.url());
    }
    
    async loginForm(email:string,pass:string) 
    {
        try{
           //await this.homeLoginBtn.waitFor({ state: 'visible', timeout: 15000 });
       await this.homeLoginBtn.click();
       await this.emailInput.click();
        await this.emailInput.fill(email);
        await this.password.click();
        await this.password.fill(pass);
        await this.loginBtn.click();
        
        return HomePage;
        }
        catch(error){
console.error('Login failed - Login button not found. Current URL:', this.page.url());
        throw error;
        }
         
        
    }

}