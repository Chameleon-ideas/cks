import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('product_categories').insert([
      {
        id: '1',
        created_by_id: '2',
        title: 'Carpet Cleaning',
        slug: 'carpet-cleaning',
        description: 'Our houses carpets and furnishings are prone to accumulating a lot of dust and grime, which can be physically harmful to our health.',
        image_url: 'user/carpet.jpg',
        created_at: new Date(),
      },
      {
        id: '2',
        created_by_id: '2',
        title: 'Window Cleaning',
        slug: 'window-cleaning',
        description: 'Most homeowners typically dislike cleaning their windows because it a cumbersome task that can be quite dangerous.',
        image_url: 'user/window.jpg',
        created_at: new Date(),
      },
      {
        id: '3',
        created_by_id: '2',
        title: 'Residential Cleaning',
        slug: 'residential-cleaning',
        description: 'Residential cleaning, also known as domestic or household cleaning, is cleaning a customers home when they are present or currently out of the house.',
        image_url: 'user/residential.jpg',
        created_at: new Date(),
      },
      {
        id: '4',
        created_by_id: '2',
        title: 'Kitchen Cleaning',
        slug: 'kitchen-cleaning',
        description: 'cleaner service companies are often the most profitable type of cleaning services. This involves a complete cleaning.',
        image_url: 'user/kitchen.jpg',
        created_at: new Date(),
      }
    ])
  }
}
