import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs_assigners'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('job_id').unsigned().references('id').inTable('jobs').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('crew_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.string('slug',150).notNullable().unique()
      table.text('crew_name').notNullable()
      table.text('crew_email').notNullable()
      table.text('crew_mobile_no').notNullable()
      table.enu('is_start',['1','0']).notNullable().defaultTo('0')
      table.enu('is_complete',['1','0']).notNullable().defaultTo('0')
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
