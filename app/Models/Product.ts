import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import User from 'App/Models/User'
import ProductCategory from 'App/Models/ProductCategory'

export default class Product extends RestModel
{
    public static table = 'products'

    @column({ isPrimary: true })
    public id: number

    @column()
    public created_by_id: number

    @column()
    public product_cate_id: number

    @column()
    public product_cate_title: string

    @column()
    public title: string

    @column()
    public slug: string

    @column()
    public description: string

    @column()
    public image_url: string

    @column()
    public amount: string

    @column()
    public quantity: number
    
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

    @hasOne(() => ProductCategory, {
      foreignKey: 'id',
      localKey: 'product_cate_id'
    })
    public ProductCategory: HasOne<typeof ProductCategory>


    public static fillable()
    {
        return [
          'created_by_id','product_cate_id','parent_id','title','slug','description','image_url','amount','quantity','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
}
module.exports = Product;
