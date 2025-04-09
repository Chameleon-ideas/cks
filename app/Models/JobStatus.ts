import { column,hasOne,HasOne,belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'

export default class JobStatus extends RestModel
{
    public static table = 'job_statuses'

    @column({ isPrimary: true })
    public id: number

    @column()
    public title: string

    @column()
    public slug: string

    @column()
    public color: string

    @column()
    public description: string

    @column()
    public status: number

    @column.dateTime({ autoCreate: true })
    public created_at: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updated_at: DateTime

    @column()
    public deleted_at: DateTime | null

    public static fillable()
    {
        return [
          'title','slug','color','description','status','created_at','updated_at','deleted_at'
        ]
    }
}
module.exports = JobStatus;
