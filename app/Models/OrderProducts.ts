import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import Product from 'App/Models/Product'
import User from 'App/Models/User'

export default class OrderProducts extends RestModel
{
    public static table = 'order_products'

    @column({ isPrimary: true })
    public id: number

    @column()
    public created_by_id: number

    @column()
    public product_id: number

    @column()
    public order_id: number

    @column()
    public product_title: string

    @column()
    public slug: string

    @column()
    public quantity: number

    @column()
    public amount: number

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

    @hasOne(() => Product, {
      foreignKey: 'id',
      localKey: 'product_id'
    })
    public Product: HasOne<typeof Product>

    public static fillable()
    {
        return [
          'created_by_id','product_id','order_id','product_title','slug','quantity','amount','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }

    public static async updateOrderProduct(data,condition)
    {
      await this.query().where(condition).update(data);
      return true
    }
}
module.exports = OrderProducts;
