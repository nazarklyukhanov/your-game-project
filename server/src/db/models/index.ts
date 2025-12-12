import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../config/database.json');
const config = databaseConfig[env as keyof typeof databaseConfig];

const db: any = {};

let sequelize: Sequelize;

if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable] as string, config as any);
} else {
	sequelize = new Sequelize(
		(config as any).database,
		(config as any).username,
		(config as any).password,
		config as any,
	);
}

fs.readdirSync(__dirname)
	.filter((file) => {
		return (
			file.indexOf('.') !== 0 &&
			file !== basename &&
			file.slice(-3) === '.ts' &&
			file.indexOf('.test.ts') === -1
		);
	})
	.forEach((file) => {
		const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

