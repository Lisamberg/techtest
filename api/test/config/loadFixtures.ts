import {
    Builder,
    fixturesIterator,
    Loader,
    Parser,
    Resolver,
} from "typeorm-fixtures-cli/dist";
import * as path from "path";
import { DataSource } from "typeorm";

export const loadFixtures = async (
    fixturesPath: string,
    dataSource: DataSource,
) => {
    try {
        const loader = new Loader();
        loader.load(path.resolve(fixturesPath));

        const resolver = new Resolver();
        const fixtures = resolver.resolve(loader.fixtureConfigs);
        const builder = new Builder(dataSource, new Parser(), false);

        for (const fixture of fixturesIterator(fixtures)) {
            const entity: any = await builder.build(fixture);
            await dataSource.getRepository(fixture.entity).save(entity);
        }
    } catch (err) {
        throw err;
    }
};
