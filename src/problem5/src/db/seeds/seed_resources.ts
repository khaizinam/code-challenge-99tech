import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex('resources').del();

    // Inserts seed entries
    await knex('resources').insert([
        {
            id: 1,
            name: 'Sample Resource 1',
            description: 'Desc 1',
            category: 'General',
            status: 1,
        },
        {
            id: 2,
            name: 'Sample Resource 2',
            description: 'Desc 2',
            category: 'General',
            status: 1,
        },
        {
            id: 3,
            name: 'Sample Resource 3',
            description: 'Desc 3',
            category: 'Tech',
            status: 0,
        },
    ]);
}
