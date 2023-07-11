
import { MainPage } from "../pageobjects/main.page";
import { GoodsPage } from "../pageobjects/goods.page";
import { CategoryPage } from "../pageobjects/category.page";


describe(`Add items to the basket`, () => {
   let mainPage = new MainPage();
   let goodsPage = new GoodsPage();
   let categoryPage = new CategoryPage();
   let myProducts = [];

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


   context(`Step 2 - Open the "Smartphones, TV and electronics" Category`, () => {
      before(() => {
         mainPage.categories.eq(1).click();
      });

      it(`Validate Header is Visible`, () => {
         categoryPage.header.should(`be.visible`);
      });

      it(`Validate Header`, () => {
         categoryPage.header.should(`have.text`, `Смартфони, ТВ і Електроніка`);
      });
   });

   context(`Step 3 - Open The "Televizors" Subcategory Page`, () => {
      before(() => {
         categoryPage.subcategoriesHeaders.eq(1).click();
      });

      it(`Validate Header is Visible`, () => {
         goodsPage.header.should(`be.visible`);
      });

      it(`Validate Header`, () => {
         goodsPage.header.should(`have.text`, `Телевізори`);
      });

      it(`Validate Products are Visible`, () => {
         goodsPage.allGoods.should(`be.visible`);
      });

      it(`Validate All Titles are Visible`, () => {
         goodsPage.allItemsTitle.should(`be.visible`);
      });

      it(`Validate All Prices are Visible`, () => {
         goodsPage.allItemsPrice.should(`be.visible`);
      });
   });


   context(`Step 4 - Add A Random Product`, () => {
      before(() => {
         myProducts.push(goodsPage.addRandomProduct());
      });

      it(`Validate Cart Badge is Visible`, () => {
         goodsPage.numberOfGoodsInCart.should(`be.visible`);
      });

      it(`Validate Number of Products On The Cart Bagde Equals ONE`, () => {
         goodsPage.numberOfGoodsInCart.invoke(`text`).then((quantity) => {
            expect(goodsPage.getNormalizedAmount(quantity)).to.equal(1);
         });
      });
   });

   context(`Step 5 - Add A Random Product From "Household equipment" Category, "Vacuum Cleaners" Subcategory`, () => {
      before(() => {
         goodsPage.visitMainPage();
         mainPage.categories.eq(3).click();
         categoryPage.subcategoriesHeaders.eq(1).click();
         myProducts.push(goodsPage.addRandomProduct());
      });

      it(`Validate Number of Products On The Cart Bagde Equals TWO`, () => {
         goodsPage.numberOfGoodsInCart.invoke(`text`).then((quantity) => {
            expect(goodsPage.getNormalizedAmount(quantity)).to.equal(2);
         });
      });
   });

   context(`Step 6 - Open The Cart Page`, () => {
      before(() => {
         goodsPage.headerCartButton.click();
      });

      it(`Validate Products are Visible`, () => {
         goodsPage.cartModal.products.should(`be.visible`);
      });

      it(`Validate Products Titles are Visible`, () => {
         goodsPage.cartModal.allProductsTitles.should(`be.visible`);
      });

      it(`Validate Products Prices are Visible`, () => {
         goodsPage.cartModal.allProductsPrices.should(`be.visible`);
      });

      it(`Validate Products Actions Button are Visible`, () => {
         goodsPage.cartModal.cartActions.should(`be.visible`);
      });

      it(`Validate Products Titles Are The Same as On The Products Page`, () => {
         myProducts.toReversed().forEach((product, index) => {
            goodsPage.cartModal.allProductsTitles
               .eq(index)
               .invoke(`text`)
               .then((title) => {
                  expect(product.title).to.equal(goodsPage.getNormalizedTitle(title));

               });
         });
      });

      it(`Validate Products Prices Meet The Formula (PRICE * QUANTITY)`, () => {
         myProducts.toReversed().forEach((product, index) => {
            goodsPage.cartModal.allProductsPrices
               .eq(index)
               .invoke(`text`)
               .then((price) => {
                  expect(goodsPage.getNormalizedAmount(price)).to.equal(product.price * product.quantity);
               });
         });
      });

      it(`Validate That The Delete Item Buttons are Clickable`, () => {
         myProducts.forEach((product, index) => {
            goodsPage.cartModal.cartActions.eq(index).click();
            goodsPage.cartModal.cartDeleteButton.should(`be.enabled`).and(`be.visible`);
            goodsPage.cartModal.modalHeader.click();
         });
      });
   });
});
