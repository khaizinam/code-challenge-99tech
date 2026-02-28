import knex from 'knex';
import path from 'path';

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../../database.sqlite'),
  },
  useNullAsDefault: true,
});

export const initDb = async () => {
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

export default db;
