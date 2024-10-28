import { DataSource, DataSourceOptions } from "typeorm";

//Config needed for typeorm cli

const config: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + "./../../**/*.entity{.ts,.js}"],
    synchronize: false,
    migrations: ["database/migrations/**/*{.ts,.js}"],
};

export const AppDataSource = new DataSource(config);

console.log(config);

export default config;
