export class LoginModal {
   get loginInput() {
      return cy.get(`#auth_email`);
   }
   get passwordInput() {
      return cy.get(`#auth_pass`);
   }

   get loginSubmitButton() {
      return cy.get(`[class*="auth"] [class*="submit"]`);
   }

   get captcha() {
      return cy.get(`#recaptcha-anchor`);
   }
}
