describe("User Deletion", () => {
    beforeEach(() => {
        cy.intercept(
            { method: "GET", path: "users" },
            { fixture: "users.json" }
        ).as("userList");

        cy.intercept(
            {
                method: "DELETE",
                url: "user/*",
            },
            {
                statusCode: 200,
            }
        ).as("deleteUser");

        cy.visit(Cypress.env("baseUrl"));
    });

    it("should delete user", () => {
        cy.get(".delete-user").first().click();
        cy.fixture("user.json").then((data) => {
            cy.wait("@deleteUser").then((interception) => {
                expect(interception.request.url).to.include(data.id);
                cy.get(".mat-mdc-snack-bar-label")
                    .should("be.visible")
                    .and("contain", "Utilisateur supprimé ✔️");
                cy.wait("@userList")
                    .its("response.statusCode")
                    .should("eq", 200); //Le refresh doit etre fait
            });
        });
    });
});
