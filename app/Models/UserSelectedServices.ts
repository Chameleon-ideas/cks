import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import User from 'App/Models/User'
import Services from 'App/Models/Services'

export default class UserSelectedServices extends RestModel
{
    public static table = 'user_selected_services'

    @column({ isPrimary: true })
    public id: number

    @column()
    public user_id: number

    @column()
    public service_id: number

    @column()
    public slug: string

    @column()
    public service_name: string

    @column()
    public service_amount: number
    
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
      localKey: 'user_id'
    })
    public User: HasOne<typeof User>

    @hasOne(() => Services, {
      foreignKey: 'id',
      localKey: 'service_id'
    })
    public Services: HasOne<typeof Services>


    public static fillable()
    {
        return [
          'user_id','service_id','slug','service_name','service_amount','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }
}
module.exports = UserSelectedServices;
