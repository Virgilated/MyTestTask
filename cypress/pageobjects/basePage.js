import { CartModal } from "./cart.modal.page";
import { LoginModal } from "./login.modal.page";

export class BasePage extends CartModal {
    get loginModal() {
        return new LoginModal();
    }

    get cartModal() {
        return new CartModal();
    }

    get numberOfGoodsInCart() {
        return cy.get(`[class*="cart"] [class*="badge"]`);
    }

    get headerCartButton() {
        return cy.get(`[class*="header"] [class*="cart"] button`);
    }

    get headerUserButton() {
        return cy.get(`[class*="header"] [class*="user"] button`);
    }

    get header() {
        return cy.get(`h1[class*="heading"]`);
    }

    get searchInput() {
        return cy.get(`input[name="search"]`);
    }

    get searchSubmitButton() {
        return cy.get(`[class*="search"] [class*="submit"]`);
    }

    get headerCabinetButton() {
        return cy.get(`.header [href*="cabinet/orders"]`);
    }

    loginWithCredentials({ username = Cypress.env(`USERNAME`), password = Cypress.env(`PASSWORD`) }) {
        this.headerUserButton.click();
        this.loginModal.loginInput.type(username);
        this.loginModal.passwordInput.type(password);
        this.loginModal.loginSubmitButton.click();
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

    visitMainPage() {
        cy.visit(`/`);
    }
}
