import { MainPage } from "../pageobjects/main.page";

describe(`Verify Login Working Correctly`, () => {
   let mainPage = new MainPage();

   before(() => {
      cy.clearAllCookies();
   });

   context(`Step 1 - Open Main Page`, () => {
      before(() => {
         mainPage.visitMainPage();
      });

      it(`Validate URL`, () => {
         cy.url().should(`eq`, `https://rozetka.com.ua/ua/`);
      });

      it(`Validate Logged In Cabinet Button is not Exist`, () => {
         mainPage.headerCabinetButton.should(`not.exist`);
      });

      it(`Validate User Button is Visible`, () => {
         mainPage.headerUserButton.should(`be.visible`);
      });
   });
   context(`Step 2 - Login With Environment Credentials`, () => {
      before(() => {
         mainPage.loginWithCredentials({});
      });

      it(`Validate Logged In State By Cabinet Button Existability`, () => {
         mainPage.headerCabinetButton.should(`exist`);
      });
   });
});
