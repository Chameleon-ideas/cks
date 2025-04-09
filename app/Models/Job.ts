import { column,hasOne,HasOne,belongsTo,BelongsTo,hasMany,HasMany } from '@ioc:Adonis/Lucid/Orm'
import { strSlug, rand, currentDateTime } from 'App/Helpers/Index'
import _ from 'lodash'
import { DateTime } from 'luxon'
import RestModel from './RestModel'
import JobStatus from 'App/Models/JobStatus'
import User from 'App/Models/User'
import JobAssignee from 'App/Models/JobAssignee'
import Services from 'App/Models/Services'

export default class Job extends RestModel
{
    public static table = 'jobs'

    @column({ isPrimary: true })
    public id: number

    @column()
    public created_by_id: number

    @column()
    public target_id: number

    @column()
    public group_id: number

    @column()
    public parent_id: number

    @column()
    public service_id: number

    @column()
    public job_type: number

    @column()
    public job_duration: number

    @column()
    public title: string

    @column()
    public slug: string

    @column()
    public description: string

    @column()
    public name: string

    @column()
    public monile_no: string

    @column()
    public number_of_person: number

    @column()
    public address: string

    @column()
    public job_hour: string

    @column()
    public schedule_day: string

    @column()
    public schedule_time: string

    @column()
    public send_to_contractor: number

    @column()
    public send_to_admin: number

    @column()
    public job_status: number

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

    @hasOne(() => User, {
      foreignKey: 'id',
      localKey: 'target_id'
    })
    public TargetBy: HasOne<typeof User>

    @hasOne(() => User, {
      foreignKey: 'id',
      localKey: 'parent_id'
    })
    public ParentBy: HasOne<typeof User>

    @hasOne(() => JobStatus, {
      foreignKey: 'id',
      localKey: 'job_status'
    })
    public JobStatus: HasOne<typeof JobStatus>

    @hasOne(() => Services, {
      foreignKey: 'id',
      localKey: 'service_id'
    })
    public Services: HasOne<typeof Services>

    @hasMany(() => JobAssignee, {
      foreignKey: 'job_id',
      localKey: 'id'
      })
    public JobAssignee: HasMany<typeof JobAssignee> 


    public static fillable()
    {
        return [
          'created_by_id','target_id','group_id','parent_id','service_id','job_type','job_duration','title','slug','description','name','monile_no','number_of_person','address','job_hour','schedule_day','schedule_time','send_to_contractor','send_to_admin','job_status','status','created_at','updated_at','deleted_at'
        ]
    }

    public static async generateSlug(name:string)
    {
        let slug = strSlug(name);
        let query = await this.query().where('slug',slug).count('id as total');
        return query[0].$extras.total == 0 ? slug : slug + query[0].$extras.total + rand(111,999);
    }


    public static async updateJob(data,condition)
    {
      await this.query().where(condition).update(data);
      return true
    }

    public static async getJobsByIds(ids:Array)
    {
      let getJob = await this.query().preload('CreatedBy').preload('ParentBy').preload('JobStatus').preload('Services').preload('JobAssignee',function(usr){
        usr.preload('User')
    }).whereIn('id',ids).whereNull('deleted_at');
      return getJob
    }

    public static async getJobsByslug(slug:string)
    {
      let getJob = await this.query().preload('CreatedBy').preload('ParentBy').preload('JobStatus').preload('Services').preload('JobAssignee',function(usr){
        usr.preload('User')
    }).where('slug',slug).whereNull('deleted_at').first();
      return getJob
    }

    public static async getTotalJobs(params:any)
    {
      let sub_users = await User.getUserHierarchy(params.user_id);
      
      let query = this.query().select('job_status');
      query.where(function (query) {
                  query.whereIn('created_by_id',sub_users)
                      .orWhereIn('parent_id',sub_users);
              }); 
      if(!_.isEmpty(params.send_to_admin)){
          query.where('send_to_admin',params.send_to_admin)
      }
      if(!_.isEmpty(params.job_status)){
        query.where('job_status',params.job_status)
      }
      let result = await query.count('* as count');
      let obj = {}
      if(_.isEmpty(result)){
          obj = {"total":0}
      }else{
          obj = {"total":result[0].$extras.count}
      }

       return obj;
    }
}
module.exports = Job;
