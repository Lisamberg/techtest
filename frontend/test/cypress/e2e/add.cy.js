describe("User Addition", () => {
    beforeEach(() => {
        cy.intercept(
            { method: "POST", url: "users" },
            {
                body: { data: null },
                statusCode: 200,
            }
        ).as("addUser");
        cy.intercept(
            { method: "GET", url: "users" },
            { fixture: "users.json" }
        ).as("userList");
        cy.visit(Cypress.env("baseUrl"));
    });

    it("Should navigate to the add user page and open modal on button click", () => {
        cy.get("#adder-button").click();

        cy.url().should("include", "/add"); // Vérifie que l'URL inclut '/add'

        // Vérifie que la modale est ouverte
        cy.get("h2[mat-dialog-title]")
            .contains("Ajout d'un utilisateur")
            .should("be.visible");

        cy.get('label[for="firstName"]').should("be.visible");
        cy.get('label[for="lastName"]').should("be.visible");
        cy.get("#adder").should("be.disabled");
        cy.get("#cancel").should("be.visible");

        cy.get("#cancel").click();

        // Vérifie que la modale est fermée après avoir cliqué sur "Quitter"
        cy.get("mat-dialog-container").should("not.exist");
        cy.url().should("not.include", "/add");
    });

    it("Should open 'add user' modal and then create a user", () => {
        cy.get("#adder-button").click();

        cy.url().should("include", "/add");

        // Vérifie que la modale est ouverte
        cy.get("h2[mat-dialog-title]")
            .contains("Ajout d'un utilisateur")
            .should("be.visible");

        cy.get('label[for="firstName"]').click();
        cy.get('input[name="firstName"]').type("John");
        cy.wait(500);
        cy.get('input[name="firstName"]').should("have.value", "John");

        cy.get('label[for="lastName"]').click();
        cy.get('input[name="lastName"]').type("Doe");
        cy.get('input[name="lastName"]').should("have.value", "Doe");

        cy.get("#adder").click();
        cy.get("mat-dialog-container").should("not.exist");
        cy.url().should("not.include", "/add");
        cy.get(".mat-mdc-snack-bar-label")
            .should("be.visible")
            .and("contain", "Utilisateur ajouté ✔️");

        // Attendre que la requête soit interceptée et vérifier les data d'ajout
        cy.wait("@addUser").its("request.body").should("deep.equal", {
            firstName: "John",
            lastName: "Doe",
        });

        cy.wait("@userList").its("response.statusCode").should("eq", 200); //Le refresh doit etre fait
    });
});
