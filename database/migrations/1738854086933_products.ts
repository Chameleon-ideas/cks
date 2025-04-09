import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('created_by_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('product_cate_id').unsigned().references('id').inTable('product_categories').onDelete('CASCADE').onUpdate('NO ACTION');
      table.text('product_cate_title').nullable()
      table.text('title').nullable()
      table.string('slug',150).notNullable().unique()
      table.text('description').notNullable()
      table.text('image_url').nullable()
      table.double('amount').notNullable().defaultTo('0')
      table.integer('quantity').notNullable().defaultTo('5')
      table.enu('status',['1','0']).notNullable().defaultTo('1')
      table.timestamp('created_at', { useTz: true }).nullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.timestamp('deleted_at',{ useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
