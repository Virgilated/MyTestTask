import { MainPage } from '../../src/pageobjects/main.page';
import { GoodsPage } from '../../src/pageobjects/goods.page';
import { CategoryPage } from '../../src/pageobjects/category.page';

describe(`Verify if the price filter working
correctly`, () => {
   let mainPage = new MainPage();
   let goodsPage = new GoodsPage();
   let categoryPage = new CategoryPage();

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
         categoryPage.header.should(`have.text`, `Комп'ютери та ноутбуки`);
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

      it(`Validate Statuses of Products is Visible`, () => {
         goodsPage.allAvailiableSigns.should(`be.visible`);
      });

      it(`Validate Min Price Input Filter Is Visible`, () => {
         goodsPage.minPriceFilter.should(`be.visible`);
      });

      it(`Validate Max Price Input Filter Is Visible`, () => {
         goodsPage.maxPriceFilter.should(`be.visible`);
      });
   });
   context(
      `Step 4 - Apply The Following Filters: Price, Brand, Ready For Delivery`,
      () => {
         before(() => {
            goodsPage.applyTheFilters();
            goodsPage.pagePreloader.should(`not.exist`);
         });

         it(`Validate The Products Fit The Prices Filters`, () => {
            goodsPage.allItemsPrice.each((el) => {
               expect(goodsPage.getNormalizedAmount(el.text())).to.be.within(
                  10000,
                  15000
               );
            });
         });

         it(`Validate The Products Fit The Brand Filter`, () => {
            goodsPage.allItemsTitle.each((el) => {
               expect(el).to.contain(`AOC`);
            });
         });

         it(`Validate The Products Fit The Delivery Filter`, () => {
            goodsPage.allAvailiableSigns.each((el) => {
               expect(el).to.contain(`Готовий до відправлення`);
            });
         });
      }
   );
});
