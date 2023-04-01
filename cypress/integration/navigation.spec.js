/**
 * Test suite for navigation functionality.
 */
describe("Navigation", () => {
  // Visits the root URL of the application using Cypress.
  it("should visit root", () => {
    cy.visit("/");
  });

  // Navigates to the Tuesday page and verifies that it is selected.
  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains('[data-testid="day"]', "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });
});
