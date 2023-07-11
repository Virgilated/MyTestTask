import { GoodsPage } from "../pageobjects/goods.page";
import { MainPage } from "../pageobjects/main.page";

describe(`Search The Item`, () => {
   let mainPage = new MainPage();
   let goodsPage = new GoodsPage();
   let searchInfo = "Lenovo IdeaPad";

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

      it(`Validate Search Input is Visible`, () => {
         mainPage.searchInput.should(`be.visible`);
      });
      it(`Validate Search Submit Button is Visible`, () => {
         mainPage.searchSubmitButton.should(`be.visible`);
      });
   });

   context(`Step 2 - Search The Item By Name '${searchInfo}'`, () => {
      before(() => {
         mainPage.searchInput.type(searchInfo);
         mainPage.searchSubmitButton.click();
      });

      it(`Validate Products Are Visible`, () => {
         goodsPage.allGoods.should(`be.visible`);
      });

      it(`Validate Products Titles Are Visible`, () => {
         goodsPage.allItemsTitle.should(`be.visible`);
      });
      it(`Validate Products Are Displayed Correctly According To The Search Request`, () => {
         goodsPage.allGoods.each((el, index) => {
            expect(el.text().toLowerCase()).to.contain(searchInfo.toLowerCase());
         });
      });
   });
});
