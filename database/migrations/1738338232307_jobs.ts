import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'jobs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('created_by_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('target_id').unsigned().references('id').inTable('users').onDelete('CASCADE').onUpdate('NO ACTION');
      table.integer('group_id').notNullable().defaultTo('0');
      table.integer('parent_id').notNullable().defaultTo('0');
      table.integer('service_id').unsigned().references('id').inTable('services').onDelete('CASCADE').onUpdate('NO ACTION');
      table.enu('job_type',['schedule','urgent']).notNullable().defaultTo('schedule')
      table.enu('job_duration',['monthly','weekly','daily','oneday']).notNullable().defaultTo('daily')
      table.text('title').nullable()
      table.string('slug',150).notNullable().unique()
      table.text('description').notNullable()
      table.string('name',255).nullable()
      table.string('monile_no',255).nullable()
      table.integer('number_of_person',11).nullable().defaultTo('0')
      table.text('address').nullable()
      table.string('job_hour',255).nullable()
      table.string('schedule_day',255).notNullable()
      table.string('schedule_time',255).notNullable()
      table.enu('send_to_contractor',['1','0']).notNullable().defaultTo('1')
      table.enu('send_to_admin',['1','0']).notNullable().defaultTo('0')
      table.integer('job_status').unsigned().references('id').inTable('job_statuses').onDelete('CASCADE').onUpdate('NO ACTION');
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
