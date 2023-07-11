import { MainPage } from '../../src/pageobjects/main.page';

describe(`Verify Login Working Correctly`, () => {
   let mainPage = new MainPage();

   context(`Step 1 - Visit Main Page`, () => {
      before(() => {
         mainPage.visitMainPage();
      });

      it(`Validate URL`, () => {
         cy.url().should(`eq`, `https://rozetka.com.ua/ua/`);
      });

      it(`Validate Logged In Cabinet Button is not Visible`, () => {
         mainPage.headerCabinetButton.should(`not.exist`);
      });
      it(`Validate User Button is Visible`, () => {
         mainPage.headerUserButton.should(`be.visible`);
      });
   });
   context(`Step 2 - Login With Environment's Credentials`, () => {
      before(() => {
         mainPage.loginWithCredentials();
      });
      it(`Validate Logged In Cabinet Button is Visible`, () => {
         mainPage.headerCabinetButton.should(`exist`);
      });
   });
});
