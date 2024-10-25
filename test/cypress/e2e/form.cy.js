describe("User form should works fine", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("baseUrl"));
    });

    it("Should show error when invalid characters are entered in first name", () => {
        cy.get("#adder-button").click();

        cy.url().should("include", "/add");

        cy.get('label[for="firstName"]').click();
        cy.get('input[name="firstName"]').type("jean_", { force: true });

        cy.wait(500);

        cy.get("#firstNameChars")
            .should("be.visible")
            .and("contain", "Le prénom contient des caractères non autorisés.");

        cy.get("#firstNameRequired").should("not.exist");
        cy.get("#firstNameMax").should("not.exist");

        cy.get("#adder").should("be.disabled");
    });

    it("Should show error when invalid characters are entered in last name", () => {
        cy.get("#adder-button").click();

        cy.url().should("include", "/add");

        cy.get('label[for="lastName"]').click();
        cy.get('input[name="lastName"]').type("Doe_", { force: true });

        cy.wait(500);
        cy.get("#lastNameChars")
            .should("be.visible")
            .and(
                "contain",
                "Le nom de famille contient des caractères non autorisés."
            );

        cy.get("#lastNameRequired").should("not.exist");
        cy.get("#lastNameMax").should("not.exist");

        cy.get("#adder").should("be.disabled");
    });

    it("Should show error when first name or last name are empty", () => {
        cy.get("#adder-button").click();

        cy.url().should("include", "/add");

        cy.get('label[for="firstName"]').click();
        cy.get('label[for="lastName"]').click();

        cy.wait(500);

        cy.get("#firstNameRequired")
            .should("be.visible")
            .and("contain", "Le prénom est requis.");

        cy.get('label[for="firstName"]').click();
        cy.get("#lastNameRequired")
            .should("be.visible")
            .and("contain", "Le nom de famille est requis.");

        cy.get("#adder").should("be.disabled");
    });
});
