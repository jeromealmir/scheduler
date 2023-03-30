describe("should book an interview", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");

    cy.visit("/");

    cy.contains('[data-testid="day"]', "Monday");
  });
});
