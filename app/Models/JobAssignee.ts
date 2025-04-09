import { column,hasOne,HasOne,belongsTo,BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import Job from 'App/Models/Job'
import User from 'App/Models/User'

export default class JobAssignee extends RestModel
{
    public static table = 'jobs_assigners'

    @column({ isPrimary: true })
    public id: number

    @column()
    public job_id: number

    @column()
    public crew_id: number

    @column()
    public crew_name: string

    @column()
    public slug: string

    @column()
    public crew_email: string

    @column()
    public crew_mobile_no: string

    @column()
    public is_start: number

    @column()
    public is_complete: number

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
      localKey: 'crew_id'
    })
    public User: HasOne<typeof User>

    @hasOne(() => Job, {
      foreignKey: 'id',
      localKey: 'job_id'
    })
    public Job: HasOne<typeof Job>


    public static fillable()
    {
        return [
          'job_id','crew_id','slug','crew_name','crew_email','crew_mobile_no','is_start','is_complete','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }

    public static async getJobs(crew_id:number)
    {
        let query = await this.query().where('crew_id',crew_id).whereNull('deleted_at');
        return query;
    }
    

}
module.exports = JobAssignee;
