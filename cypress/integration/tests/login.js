it("Loggs in", function() {
  cy.visit("http://localhost:3000/");
  cy.wait(1000);
  cy.get("#login-button").click();
  cy.get("#nickname-text-field")
    .click()
    .type("demo");
  cy.get("#password-text-field")
    .click()
    .type("demo1234");
  cy.get("#login-page-button").click();
  cy.wait(5000);
  cy.url().should("include", "");
  cy.get("#search-button");
});

it("Wrong Log in", function() {
  cy.visit("http://localhost:3000/");
  cy.wait(1000);
  cy.get("#login-button").click();
  cy.get("#nickname-text-field")
    .click()
    .type("wrongUser");
  cy.get("#password-text-field")
    .click()
    .type("demo1234");
  cy.get("#login-page-button").click();
  cy.wait(1000);
  cy.get(":nth-child(1) > .notification-message").contains("Incorrect");
});
