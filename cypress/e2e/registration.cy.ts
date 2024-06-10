describe("Registration", () => {
  beforeEach(() => {
    cy.visit("/registration");
  });

  it("loads the registration page", () => {
    cy.get(".w-screen.h-screen").should("be.visible");
  });

  it("navigates through the registration steps", () => {
    // First step
    const email = `test-${Math.floor(Math.random() * 1000000)}@example.com`;
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="type"]').check("PF");
    cy.get('button[type="submit"]').click();

    // Second step
    cy.get('input[name="name"]').type("Test User");
    const cpf = Math.floor(Math.random() * 100000000000);
    cy.get('input[name="cpf"]').type(`${cpf}`);
    cy.get('input[name="birthDay"]').type("1997-08-14");
    cy.get('input[name="phone"]').type("11999999999");
    cy.get('button[type="submit"]').click();

    // Third step
    cy.get('input[name="password"]').type("1234567");
    cy.get('button[type="submit"]').click();

    // Fourth step
    cy.get('button[type="submit"]').click();
  });
});
