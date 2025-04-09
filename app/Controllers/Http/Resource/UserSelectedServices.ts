'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'

class UserSelectedServices
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
          user_id: record.user_id,
          //created_by: await PublicUser.initResponse(record.CreatedBy,request),
          slug: record.slug,
          service_id:record.service_id,
          service_name:record.service_name,
          service_amount:record.service_amount,
          status:record.status,
          status_text:(record.status == '1') ? 'Active' : 'De-Active',
          created_at: record.created_at
      }
  }

}
module.exports = UserSelectedServices;
