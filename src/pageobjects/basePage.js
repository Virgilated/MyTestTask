import { CartModal } from './cart.modal.page';

export class BasePage extends CartModal {
   get cartModal() {
      return new CartModal();
   }

   get numberOfGoodsInCart() {
      return cy.get(`[class*="cart"] [class*="badge"]`);
   }

   get headerCartButton() {
      return cy.get(`[class*="header"] [class*="cart"] button`);
   }

   get headerAccountButton() {
      return cy.get(`[class*="header"] [class*="user"] button`);
   }

   get header() {
      return cy.get(`h1[class*="heading"]`);
   }

   getNormalizedTitle(title) {
      if (title.includes(`+`)) {
         return title.split(` +`)[0].trim();
      }
      return title.trim();
   }

   getNormalizedAmount(numbers) {
      return Number(numbers.replace(/\s+/g, ``).replace(`₴`, ``).trim());
   }
}
