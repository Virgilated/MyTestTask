export class CartModal {
   get productsBody() {
      return cy.get(`[class*="cart"][class*="body"]`);
   }

   get sumPrice() {
      return cy.get(`[class*="sum-price"]`);
   }

   get closeButton() {
      return cy.get(`button[class*="modal"]`);
   }

   get submitButton() {
      return cy.get(`[class*="cart"][class*="submit"]`);
   }

   get products() {
      return cy.get(`[class*="cart"][class*="list"] [class*="body"]`);
   }

   get productPrice() {
      return cy.get(`[data-testid="cost"]`);
   }

   get modalHeader() {
      return cy.get(`h3[class*="modal"]`);
   }

   get allProductsTitles() {
      return cy.get(`[class*="cart"][class*="item"] [data-testid="title"]`);
   }

   get allProductsPrices() {
      return cy.get(`[class*="cart"][class*="item"] [data-testid="cost"]`);
   }
}
