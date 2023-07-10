import { MainPage } from '../../src/pageobjects/main.page';
import { GoodsPage } from '../../src/pageobjects/goods.page';
import { CategoryPage } from '../../src/pageobjects/category.page';

describe(`Verify if the price filter working
correctly`, () => {
   const mainPage = new MainPage();
   const goodsPage = new GoodsPage();
   const categoryPage = new CategoryPage();
   context(`Step 1 - Open Main Page`, () => {
      before(() => {
         mainPage.visitMainPage();
      });
      it(`Validate URL`, () => {
         cy.url().should(`eq`, `https://rozetka.com.ua/ua/`);
      });
      it(`Validate Categories is Visible`, () => {
         mainPage.categories.should(`be.visible`);
      });
   });
   context(`Step 2 - Open the "Computers and Laptops" Category Page`, () => {
      before(() => {
         mainPage.categories.eq(0).click();
      });
      it(`Validate Header is Visible`, () => {
         categoryPage.header.should(`be.visible`);
      });
      it(`Validate Category Header`, () => {
         categoryPage.header
            .invoke(`text`)
            .should(`equal`, `Комп'ютери та ноутбуки`);
      });
   });
   context(`Step 3 - Open the "Monitors" Subcategory Page`, () => {
      before(() => {
         categoryPage.subcategoriesHeaders.eq(2).click();
      });
      it(`Validate Subcategory Header is Visible`, () => {
         goodsPage.header.should(`be.visible`);
      });
      it(`Validate Subcategory Header`, () => {
         goodsPage.header.invoke(`text`).should(`equal`, `Монітори`);
      });
      it(`Validate Owner Filter Is Visible`, () => {
         goodsPage.brandFilter.should(`be.visible`);
      });
      it(`Validate Products is Visible`, () => {
         goodsPage.allGoods.should(`be.visible`);
      });
      it(`Validate Statuses of Products is Visible`,() => {
         goodsPage.
      })
      it(`Validate Min Price Input Filter Is Visible`, () => {
         goodsPage.minPriceFilter.should(`be.visible`);
      });
      it(`Validate Max Price Input Filter Is Visible`, () => {
         goodsPage.maxPriceFilter.should(`be.visible`);
      });
   });
   context(
      `Step 4 - Apply The Following Filters: "Min - Max Price", "Owner: Rozetka", "Ready For Delivery"`,
      () => {
         before(() => {
            goodsPage.brandFilter.click();
            goodsPage.readyForDeliveryFilter.click();
            goodsPage.minPriceFilter.type(`10000`);
            goodsPage.maxPriceFilter.type(`15000`);
         });
         it(`Validate Products Fit The Prices Filter`, () => {
            goodsPage.allItemsPrice.should(`be.greater`);
         });
      }
   );
});
