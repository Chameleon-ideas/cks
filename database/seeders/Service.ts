import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('services').insert([
      {
        id: '1',
        title: 'Regular Cleaning',
        created_by_id: '2',
        slug: 'regular-cleaning',
        amount: 7,
        created_at: new Date(),
      },
      {
        id: '2',
        title: 'Deep Cleaning',
        created_by_id: '2',
        slug: 'deep-cleaning',
        amount: 2,
        created_at: new Date(),
      },
      {
        id: '3',
        title: 'Move-In-Cleaning',
        created_by_id: '2',
        slug: 'move-in-cleaning',
        amount: 4,
        created_at: new Date(),
      },
      {
        id: '4',
        title: 'End of Tenancy-Cleaning',
        created_by_id: '2',
        slug: 'tenancy-cleaning',
        amount: 6,
        created_at: new Date(),
      },
      {
        id: '5',
        title: 'After Party Cleaning',
        created_by_id: '2',
        slug: 'after-party-cleaning',
        amount: 8,
        created_at: new Date(),
      },
      {
        id: '6',
        title: 'After Renovation Cleaning',
        created_by_id: '2',
        slug: 'after-renovation-cleaning',
        amount: 12,
        created_at: new Date(),
      },
      {
        id: '7',
        title: 'Carpet Cleaning',
        created_by_id: '2',
        slug: 'carpet-cleaning',
        amount: 2,
        created_at: new Date(),
      },
      {
        id: '8',
        title: 'Mattress Cleaning',
        created_by_id: '2',
        slug: 'mattress-cleaning',
        amount: 6,
        created_at: new Date(),
      },
      {
        id: '9',
        title: 'Upholestry Cleaning',
        created_by_id: '2',
        slug: 'upholestry-cleaning',
        amount: 7,
        created_at: new Date(),
      },
      {
        id: '10',
        title: 'Grill Cleaning',
        created_by_id: '2',
        slug: 'grill-cleaning',
        amount: 9,
        created_at: new Date(),
      },
      {
        id: '11',
        title: 'Oven Cleaning',
        created_by_id: '2',
        slug: 'oven-cleaning',
        amount: 10,
        created_at: new Date(),
      },
      {
        id: '12',
        title: 'Window Cleaning',
        created_by_id: '2',
        slug: 'window-cleaning',
        amount: 11,
        created_at: new Date(),
      },
      {
        id: '13',
        title: 'Laundry Cleaning',
        created_by_id: '2',
        slug: 'laundry-cleaning',
        amount: 10,
        created_at: new Date(),
      },
    ])
  }
}
