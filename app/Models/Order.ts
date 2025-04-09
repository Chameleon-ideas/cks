import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import User from 'App/Models/User'
import OrderProducts from 'App/Models/OrderProducts'

export default class Order extends RestModel
{
    public static table = 'orders'

    @column({ isPrimary: true })
    public id: number

    @column()
    public created_by_id: number

    @column()
    public total_amount: number

    @column()
    public order_date: string

    @column()
    public slug: string

    @column()
    public order_status: string

    @column()
    public status: number

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    @hasOne(() => User, {
      foreignKey: 'id',
      localKey: 'created_by_id'
    })
    public CreatedBy: HasOne<typeof User>

    @hasMany(() => OrderProducts, {
      foreignKey: 'order_id',
      localKey: 'id'
      })
    public OrderProducts: HasMany<typeof OrderProducts> 
    
    public static fillable()
    {
        return [
          'created_by_id','total_amount','order_date','slug','order_status','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
}
module.exports = Order;
