'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import FeedbackQuestion from './FeedbackQuestion'

class FeedbackUser
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
          slug: record.slug,
          created_by_id: record.created_by_id,
          created_by: await PublicUser.initResponse(record.CreatedBy,request),
          created_name: record.created_name,
          question_id: record.question_id,
          question_by: await FeedbackQuestion.initResponse(record.FeedbackQuestion,request),
          question: record.question,
          answer: record.answer,
          submit_date: record.submit_date,
          status:record.status,
          status_text:(record.status == '1') ? 'Active' : 'De-Active',
          created_at: record.created_at
      }
  }

}
module.exports = FeedbackUser;
