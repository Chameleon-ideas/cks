import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Database from '@ioc:Adonis/Lucid/Database'

export default class extends BaseSeeder {
  public async run () {
    await Database.table('products').insert([
      {
        id: '1',
        created_by_id: '2',
        product_cate_id: '1',
        product_cate_title: 'Carpet Cleaning',
        title: 'Folex Carpet Spot Remover, 32 Oz',
        slug: 'folex-carpet-spot-remover',
        description: 'Plexon 2 Microfiber Cleaning Cloth with Instant Carpet Spot Remover Spray 32 Fl Oz and 128 Fl oz (1 Gallon) refill.',
        image_url: 'user/flox.jpg',
        amount: '55',
        created_at: new Date(),
      },
      {
        id: '2',
        created_by_id: '2',
        product_cate_id: '1',
        product_cate_title: 'Carpet Cleaning',
        title: 'Zep All-Purpose Carpet Shampoo',
        slug: 'zep-shampoo',
        description: 'Cleaner Solution, 50 oz., Ocean Breeze Scent, Deep Cleaning Carpet Shampoo Solution.',
        image_url: 'user/zep.jpg',
        amount: '20',
        created_at: new Date(),
      },
      {
        id: '3',
        created_by_id: '2',
        product_cate_id: '1',
        product_cate_title: 'Carpet Cleaning',
        title: 'Spot And Stain Remover Carpet Cleaner',
        slug: 'spot-cleaner',
        description: 'Remover quickly removes the toughest spots and stains from carpets, rugs and upholstery without rinsing.',
        image_url: 'user/spot.jpg',
        amount: '15',
        created_at: new Date(),
      },
      {
        id: '4',
        created_by_id: '2',
        product_cate_id: '2',
        product_cate_title: 'Window Cleaning',
        title: 'Walnut 6" x 9" Glass Scrubbing Pads',
        slug: 'Walnut-scrubbing-pads',
        description: 'These light duty scrub pads are actually made of walnut shells and synthetic fibres but are safe to use on glass to remove stubborn debris.',
        image_url: 'user/spang.png',
        amount: '5',
        created_at: new Date(),
      }
    ])
  }
}
