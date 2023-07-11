import { BasePage } from "./basePage";
export class GoodsPage extends BasePage {
    get allGoods() {
        return cy.get(`[class*="goods"] [class*="inner"]`);
    }

    get allItemsBuyButton() {
        return cy.get(`[class*="goods"] [class*="buy-button"]`);
    }

    get allItemsTitle() {
        return cy.get(`[class*="goods"]  [class*="title"]`);
    }

    get allItemsPrice() {
        return cy.get(`[class*="goods"] [class*="value"]`);
    }

    get innerBuyButton() {
        return cy.get(`[class*="buy-button"]`);
    }

    get innerTitle() {
        return cy.get(`[class*="title"]`);
    }

    get innerDescription() {
        return cy.get(`[class*="description"]`);
    }

    get innerPrice() {
        return cy.get(`[class*="value"]`);
    }

    get readyForDeliveryFilter() {
        return cy.get(`[data-id="Готовий до відправлення"]`);
    }

    get allAvailiableSigns() {
        return cy.get(`[class*="goods"] [class*="availability--available"]`);
    }

    get ownerFilter() {
        return cy.get(`[data-id="Rozetka"]`);
    }

    get minPriceFilter() {
        return cy.get(`input[formcontrolname="min"]`);
    }

    get maxPriceFilter() {
        return cy.get(`input[formcontrolname="max"]`);
    }

    get brandFilter() {
        return cy.get(`[data-id="AOC"]`);
    }

    get okButton() {
        return cy.get(`button[type="submit"]`);
    }

    get pagePreloader() {
        return cy.get(`[class*="preloader_type_element"]`);
    }

    applyTheFilters() {
        this.brandFilter.click();
        this.readyForDeliveryFilter.click();
        this.minPriceFilter.clear();
        this.minPriceFilter.type(`10000`);
        this.maxPriceFilter.clear();
        this.maxPriceFilter.type(`15000`);
        this.okButton.click();
    }

    addRandomProduct() {
        cy.intercept(`POST`, `https://uss.rozetka.com.ua/session/cart-se/add`).as(`AddRequest`);
        let myProduct = new Object();
        this.allAvailiableSigns
            .its(`length`)
            .then((quantityOfAllProducts) => {
                return Math.floor(Math.random() * quantityOfAllProducts);
            })
            .then((index) => {
                this.allAvailiableSigns
                    .eq(index)
                    .parent()
                    .within(() => {
                        this.innerPrice.invoke(`text`).then((price) => {
                            myProduct.price = this.getNormalizedAmount(price);
                        });
                        this.innerTitle.invoke(`text`).then((title) => {
                            myProduct.title = this.getNormalizedTitle(title);
                        });
                        this.innerBuyButton.click();
                    })
                    .then(() => {
                        cy.wait(`@AddRequest`)
                            .its(`response.body`)
                            .then((body) => {
                                for (const product of body.purchases.goods) {
                                    if (product.goods.title === myProduct.title) {
                                        myProduct.quantity = product.quantity;
                                    }
                                }
                            });
                    });
            });
        return myProduct;
    }
}
