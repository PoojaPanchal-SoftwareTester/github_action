import {test,expect,request} from "@playwright/test";
import path from 'path';
import dotenv from 'dotenv';
import fs from 'fs';

const authFile = path.join(__dirname, '../.auth/user.json');
test("Login API", async ({ request }) => {

    const response=await request.post("https://logs.naukri.com/uba", {
        data: {
   "url":"https%3A%2F%2Fwww.naukri.com%2F",
   "referrer":"",
   "deviceType":"WEB",
   "screenReso":"1280x720",
   "pageName":"homepage",
   "appId":"103",
   "eventName":"gnbClick",
   "eventId":"3f871cd6-73a4-531a-535d-e712a0749e84-1782200822414",
   "timestamp":1782200822414,
   "refEventName":"widgetView",
   "refEventId":"3f871cd6-73a4-531a-535d-e712a0749e84-1782200821328",
   "uniqueDid":"3f871cd6-73a4-531a-535d-e712a0749e84-1782200820217",
   "cnid":"",
   "lang":"en",
   "countryCode":null,
   "username":null,
   "loginStatus":false,
   "utmTerm":null,
   "utmSource":null,
   "utmContent":null,
   "utmMedium":null,
   "utmCampaign":null,
   "tenantId":"1",
   "subclientTenantId":"0",
   "fingerPrintId":"",
   "utmAdGroup":null,
   "label":"Login",
   "sectionName":"Login",
   "actionSrc":"click",
   "widgetName":"GNB",
   "profileSegment":"default"
        }  
    })
 await expect(response.ok()).toBeTruthy();
 await request.storageState({ path: authFile });
});