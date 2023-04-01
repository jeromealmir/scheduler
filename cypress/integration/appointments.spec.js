/** 
 * This test suite checks if a user can book, edit, and cancel an interview.
 */

describe("should book an interview", () => {
  /**
   * Reset the server API, visit the application's homepage,
   * and verify that Monday is displayed on the screen before each test
   */
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains('[data-testid="day"]', "Monday");
  });

  /**
   * This test case verifies that a user can book an interview by selecting a student name and interviewer,
   * and then saving the appointment.
   */
  it("should book an interview", () => {
    cy.get("[alt=Add]").first().click();
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });

  /**
   * Tests the functionality of editing an interview.
   * It clicks on the "Edit" button of the first interview card, clears the student name input field,
   * types in a new student name, selects a new interviewer, and clicks the "Save" button.
   * Then it checks if the new student name and interviewer are displayed on the appointment card.
   */
  it("should edit an interview", () => {
    cy.get("[alt='Edit']").first().click({ force: true });

    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones");

    cy.get("[alt='Tori Malcolm']").click();

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });

  /**
   * Tests the functionality of cancelling an interview.
   * It clicks on the delete button of the first appointment card, confirms the deletion,
   * and then checks that the card no longer exists.
   */
  it("should cancel an interview", () => {
    cy.get("[alt='Delete']").first().click({ force: true });

    cy.contains("Confirm").click();

    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");
  });
});
