import { BasePage } from './basePage';
export class GoodsPage extends BasePage {
   get allGoods() {
      return cy.get(`[class*="goods"] [class*="inner"]`);
   }
   get allItemsBuyButton() {
      return cy.get(`[class*="goods"] [class*="buy-button"]`);
   }
   get allItemsPrice() {
      return cy.get(`[class*="goods"] [class*="value"]`);
   }
   get innerBuyButton() {
      return cy.get(`[class*="buy-button"]`);
   }
   get readyForDeliveryFilter() {
      return cy.get(`[data-id="Готовий до відправлення"]`);
   }
   get allAvailiableSigns() {
      return cy.get(`[class*="availability--available"]`);
   }
   get ownerFilter() {
      return cy.get(`[data-id="Rozetka"]`);
   }
   get minPriceFilter() {
      return cy.get(
         `input[formcontrolname="min"]`
      );
   }
   get maxPriceFilter() {
      return cy.get(`input[formcontrolname="max"]`);
   }
   get brandFilter() {
      return cy.get(`[data-id="AOC"]`);
   }
}
