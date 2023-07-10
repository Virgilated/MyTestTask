import { BasePage } from './basePage';
export class MainPage extends BasePage {
   get categories() {
      return cy.get(`.sidebar .menu-categories li`);
   }
   visitMainPage() {
      cy.visit(`/`);
   }
}
