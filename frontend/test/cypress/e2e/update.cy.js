describe("User Edition", () => {
    beforeEach(() => {
        cy.intercept(
            { method: "GET", url: "users" },
            { fixture: "users.json" }
        ).as("userList");
        cy.intercept(
            { method: "PUT", url: "users/*" },
            {
                body: { data: null },
                statusCode: 200,
            }
        ).as("editUser");
        cy.intercept(
            {
                method: "GET",
                url: "users/*",
            },
            { fixture: "user.json" }
        ).as("userDetail");

        cy.visit(Cypress.env("baseUrl"));
    });

    it("should open the update modal with the right data when the edit icon is clicked", () => {
        cy.get(".update-user").first().click();

        // Vérifie que la modale est ouverte

        cy.get("h2[mat-dialog-title]")
            .contains("Modifier l'utilisateur")
            .should("be.visible");

        //Verifier que les details de l'utilisateur sont correctement ajoutés

        cy.get('label[for="firstName"]').should("be.visible");
        cy.get('label[for="firstName"]').click();

        cy.fixture("user.json").then(({ data }) => {
            cy.get('input[name="firstName"]').should(
                "have.value",
                data.firstName
            );

            cy.get('label[for="lastName"]').click();
            cy.get('input[name="lastName"]').should(
                "have.value",
                data.lastName
            );
        });

        cy.get("#cancel").click();

        cy.get("mat-dialog-container").should("not.exist");
        cy.url().should("not.include", "/edit");
    });

    it("should open the update update modal and then update the user", () => {
        cy.get(".update-user").first().click();

        cy.get('label[for="firstName"]').click();
        cy.get('input[name="firstName"]')
            .clear()
            .invoke("val", "John")
            .trigger("input");

        cy.get('label[for="lastName"]').click();
        cy.get('input[name="lastName"]')
            .clear()
            .invoke("val", "Doe")
            .trigger("input");

        cy.get("#updater").should("be.enabled").click();
        cy.get("mat-dialog-container").should("not.exist");
        cy.url().should("not.include", "/edit");
        cy.get(".mat-mdc-snack-bar-label")
            .should("be.visible")
            .and("contain", "Utilisateur modifié ✔️");

        // Attendre que la requête soit interceptée et vérifier les data d'update
        cy.fixture("user.json").then(({ data }) => {
            cy.wait("@editUser").its("request.body").should("deep.equal", {
                id: data.id,
                firstName: "John",
                lastName: "Doe",
            });
            cy.wait("@userList").its("response.statusCode").should("eq", 200); //Le refresh doit etre fait
        });
    });
});
