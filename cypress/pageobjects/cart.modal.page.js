export class CartModal {
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

    get modalHeader() {
        return cy.get(`h3[class*="modal"]`);
    }

    get allProductsTitles() {
        return cy.get(`[data-testid="title"]`);
    }

    get allProductsPrices() {
        return cy.get(`[data-testid="cost"]`);
    }
    get cartActions() {
        return cy.get(`.cart [class*="actions"] button`);
    }
    get cartDeleteButton() {
        return cy.contains(`Видалити`);
    }
}
