'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import JobAssignee from './JobAssignee'
import ServicesRes from './Services'

class Job
{
  protected static async initResponse(data: object,request:object)
  {
      if( _.isEmpty(data) )
        return [];

      let response;
      if( Array.isArray(data) ){
        response = []
        for(var i=0; i < data.length; i++)
        {
          response.push( await this.jsonSchema(data[i],request));
        }
      } else {
        response = await this.jsonSchema(data,request)
      }
      return response;
  }

  private static async jsonSchema(record: object,request:object)
  {
      return {
          id: record.id,
          created_by_id: record.created_by_id,
          target_id: record.target_id,
          created_by: await PublicUser.initResponse(record.CreatedBy,request),
          target_by: await PublicUser.initResponse(record.TargetBy,request),
          service: await ServicesRes.initResponse(record.Services,request),
          created_name:record.CreatedBy.name,
          created_email:record.CreatedBy.email,
          group_id: record.group_id,
          parent_id: record.parent_id,
          job_type: (record.job_type == 'urgent' ? 'adhoc' : record.job_type),
          job_duration: record.job_duration,
          parent_by: await PublicUser.initResponse(record.ParentBy,request),
          title: record.title,
          slug: record.slug,
          description:record.description,
          name:record.name,
          monile_no:record.monile_no,
          number_of_person:record.number_of_person,
          address:record.address,
          job_hour:record.job_hour,
          schedule_day:_.isEmpty(record.schedule_day) ? '-' : record.schedule_day,
          schedule_time:_.isEmpty(record.schedule_time) ? '-' : record.schedule_time,
          send_to_contractor:record.send_to_contractor,
          send_to_admin:record.send_to_admin,
          job_status:record.JobStatus,
          status_text:record.JobStatus.title,
          crew: await JobAssignee.initResponse(record.JobAssignee),
          status:record.status,
          created_at: record.created_at
      }
  }

}
module.exports = Job;
