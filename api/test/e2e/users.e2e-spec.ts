import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../src/app.module";
import { DataSource } from "typeorm";
import { loadFixtures } from "../config/loadFixtures";
import { faker } from "@faker-js/faker";
import { AllExceptionFilter } from "../../src/infrastructure/common/filter/exception.filter";
import { MockLoggerService } from "../mocks/logger";

describe("UserController (e2e)", () => {
    let app: INestApplication;
    let dataSource: DataSource;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        app.useGlobalFilters(new AllExceptionFilter(new MockLoggerService()));
        app.useGlobalPipes(new ValidationPipe());

        await app.init();
        await app.listen(3006);
        dataSource = app.get(DataSource);
    });

    beforeEach(async () => {
        await dataSource.dropDatabase();
        await dataSource.runMigrations();
        await loadFixtures(`${__dirname}/../fixtures`, dataSource);
    });

    afterAll(async () => {
        await dataSource.dropDatabase();
        await dataSource.destroy();
        await app.close();
    });

    it("/users (GET) should return all users  (sorted by lastName ASC)", async () => {
        const response = await request(app.getHttpServer())
            .get("/users")
            .expect(200);

        const expectedOrder = [
            "Griezmann",
            "Kroos",
            "Lewandowski",
            "Mbappe",
            "Modric",
        ];

        const lastNames = response.body.map((u) => u.lastName);

        expect(lastNames).toEqual(expectedOrder);
    });

    it("/user/:id (GET) should return user", async () => {
        const allUsersResponse = await request(app.getHttpServer())
            .get("/users")
            .expect(200);

        const user = allUsersResponse.body[0];

        const userDetailResponse = await request(app.getHttpServer())
            .get(`/users/${user.id}`)
            .expect(200);

        expect(user).toEqual(userDetailResponse.body);
    });

    it("/user/:id (GET) with unknown ID should return 404", async () => {
        const fakeUuid = faker.string.uuid();

        await request(app.getHttpServer())
            .get(`/users/${fakeUuid}`)
            .expect(404);
    });

    it("/user/:id (GET) should return 500 when an invalid UUID is provided", async () => {
        // Test with an invalid UUID (not a proper format)
        const invalidUuid = "invalid-uuid";

        await request(app.getHttpServer())
            .get(`/users/${invalidUuid}`)
            .expect(500);
    });

    it("/user/:id (POST) should create user", async () => {
        const newUser = {
            firstName: "John",
            lastName: "Doe",
        };

        const response = await request(app.getHttpServer())
            .post("/users")
            .send(newUser)
            .expect(201);

        expect(response.body).toHaveProperty("id");
        expect(response.body.firstName).toBe(newUser.firstName);
        expect(response.body.lastName).toBe(newUser.lastName);
    });

    it("/users (POST) with incomplete user data should return 400", async () => {
        const incompleteUser = {
            firstName: "John",
        };

        const response = await request(app.getHttpServer())
            .post("/users")
            .send(incompleteUser)
            .expect(400);

        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toContain("lastName must be a string");
    });

    it("/users (POST) should return 409 when trying to create an existing user", async () => {
        const existingUser = {
            firstName: "John",
            lastName: "Doe",
        };

        await request(app.getHttpServer())
            .post("/users")
            .send(existingUser)
            .expect(201);

        await request(app.getHttpServer())
            .post("/users")
            .send(existingUser)
            .expect(409);
    });

    it("/users/:id (PUT) should update user", async () => {
        const existingUser = {
            firstName: "John",
            lastName: "Doe",
        };

        const createResponse = await request(app.getHttpServer())
            .post("/users")
            .send(existingUser)
            .expect(201);

        const userId = createResponse.body.id;
        const updatedUser = {
            firstName: "Jane",
            lastName: "Doe",
        };

        await request(app.getHttpServer())
            .put(`/users/${userId}`)
            .send(updatedUser)
            .expect(200);

        const getUserResponse = await request(app.getHttpServer())
            .get(`/users/${userId}`)
            .expect(200);

        expect(getUserResponse.body.firstName).toBe(updatedUser.firstName);
        expect(getUserResponse.body.lastName).toBe(updatedUser.lastName);
    });

    it("/users/:id (PUT) should not update if user already exists", async () => {
        const existingUser = {
            firstName: "John",
            lastName: "Doe",
        };

        const createResponse = await request(app.getHttpServer())
            .post("/users")
            .send(existingUser)
            .expect(201);

        const userId = createResponse.body.id;
        const updatedUser = {
            firstName: "Jane",
            lastName: "Doe",
        };

        await request(app.getHttpServer())
            .put(`/users/${userId}`)
            .send(updatedUser)
            .expect(200);

        const getUserResponse = await request(app.getHttpServer())
            .get(`/users/${userId}`)
            .expect(200);

        expect(getUserResponse.body.firstName).toBe(updatedUser.firstName);
        expect(getUserResponse.body.lastName).toBe(updatedUser.lastName);
    });

    it("/users/:id (PUT) should return 409 when trying to update to an existing user", async () => {
        // Créer deux utilisateurs existants
        const firstUser = {
            firstName: "Didier",
            lastName: "Legrand",
        };

        const secondUser = {
            firstName: "Didier",
            lastName: "Lecland",
        };

        // Créer le premier utilisateur
        await request(app.getHttpServer())
            .post("/users")
            .send(firstUser)
            .expect(201);

        // Créer le deuxième utilisateur
        const createSecondUserResponse = await request(app.getHttpServer())
            .post("/users")
            .send(secondUser)
            .expect(201);

        const secondUserId = createSecondUserResponse.body.id;

        // Tenter de mettre à jour le deuxième utilisateur avec les mêmes données que le premier utilisateur
        const conflictUpdate = {
            firstName: "Didier",
            lastName: "Legrand", // Ce nom de famille existe déjà
        };

        await request(app.getHttpServer())
            .put(`/users/${secondUserId}`)
            .send(conflictUpdate)
            .expect(409);
    });

    it("/users/:id (PUT) should update user when sending existing data", async () => {
        const existingUser = {
            firstName: "Didier",
            lastName: "Legrand",
        };

        const createUserResponse = await request(app.getHttpServer())
            .post("/users")
            .send(existingUser)
            .expect(201);

        const userId = createUserResponse.body.id;

        // Tenter de mettre à jour l'utilisateur avec ses propres données
        const updateUser = {
            firstName: "Didier",
            lastName: "Legrand", // Même nom que l'utilisateur existant
        };

        await request(app.getHttpServer())
            .put(`/users/${userId}`)
            .send(updateUser)
            .expect(200);
    });

    it("/users/:id (DELETE) should delete a user", async () => {
        const newUser = {
            firstName: "Jean",
            lastName: "Dupont",
        };

        const createUserResponse = await request(app.getHttpServer())
            .post("/users")
            .send(newUser)
            .expect(201);

        const userId = createUserResponse.body.id;

        await request(app.getHttpServer())
            .delete(`/users/${userId}`)
            .expect(200);

        await request(app.getHttpServer()).get(`/users/${userId}`).expect(404);
    });
});
