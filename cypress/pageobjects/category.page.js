import { BasePage } from "./basePage";
export class CategoryPage extends BasePage {
    get subcategoriesHeaders() {
        return cy.get(`[class*="tile-cats"] [class*="heading"]`);
    }
}
