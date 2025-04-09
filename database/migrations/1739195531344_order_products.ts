import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'order_products'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('created_by_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('product_id').unsigned().references('id').inTable('products').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('order_id').notNullable().defaultTo('0');
      table.text('product_title').nullable()
      table.string('slug',150).notNullable().unique()
      table.integer('quantity').notNullable().defaultTo('0');
      table.double('amount').notNullable().defaultTo('0')
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
