"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDb = void 0;
const knex_1 = __importDefault(require("knex"));
const path_1 = __importDefault(require("path"));
const db = (0, knex_1.default)({
    client: 'sqlite3',
    connection: {
        filename: path_1.default.join(__dirname, '../../database.sqlite'),
    },
    useNullAsDefault: true,
});
const initDb = async () => {
    const hasTable = await db.schema.hasTable('resources');
    if (!hasTable) {
        await db.schema.createTable('resources', (table) => {
            table.increments('id').primary();
            table.string('name').notNullable();
            table.string('description');
            table.string('category');
            table.integer('status').defaultTo(1); // 1: Active, 0: Inactive
            table.timestamps(true, true);
        });
        console.log('Database initialized: "resources" table created.');
    }
};
exports.initDb = initDb;
exports.default = db;
//# sourceMappingURL=database.js.map