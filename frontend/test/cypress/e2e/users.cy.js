describe("User Data Fetching and Pagination", () => {
    beforeEach(() => {
        cy.intercept(
            { method: "GET", url: "users" },
            { fixture: "users.json" }
        );
        cy.visit(Cypress.env("baseUrl"));
    });

    it("Displays the correct number of items per page", () => {
        cy.get(".mat-mdc-select-min-line") // Récupérer la limite par page dans l'interface
            .invoke("text")
            .then((limit) => {
                // Charger les données de la fixture
                cy.fixture("users.json").then(({ data }) => {
                    const nbOfUsers = data.length; // le nombre d'utilisateurs

                    // Vérifier que le composant de pagination affiche les valeurs correctes
                    cy.get(".mat-mdc-paginator-range-label").should(
                        "contain.text",
                        `1 - ${limit} de ${nbOfUsers}`
                    );
                });
            });
    });

    it("should have as many rows as pagination rows in the table", () => {
        cy.get(".mat-mdc-select-min-line") // Récupérer la limite par page dans l'interface
            .invoke("text")
            .then((limit) => {
                cy.get("tr.mat-mdc-row").should("have.length", limit); // Vérifie qu'il y le bon nombre de lignes dans la table
            });
    });

    it("Should ensure each row contains 5 data cells with valid content", () => {
        // Sélecteur pour les lignes du tableau
        cy.get("tr.mat-mdc-row").each(($row) => {
            // Vérifie que chaque ligne contient exactement 5 cellules car par défaut la limite est 5
            cy.wrap($row)
                .find("td.mat-mdc-cell")
                .should("have.length", 5)
                .each(($cell, index) => {
                    cy.wrap($cell).should("not.be.empty"); // Vérifie que le texte n'est pas vide
                });
        });
    });
});
