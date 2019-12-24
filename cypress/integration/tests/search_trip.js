it('Searchs a trip and go to details', function() {
  cy.visit("http://localhost:3000/");
  cy.wait(1000);
  cy.get("#search-button").click();
  cy.wait(3000);
  cy.get("#tripContainer > :nth-child(1)").click();
  cy.wait(1000)
  cy.get("#detalles-button").click();
});

