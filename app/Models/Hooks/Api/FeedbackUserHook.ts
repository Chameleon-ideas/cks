'use strict'
import _ from 'lodash';
import FileUpload from 'App/Libraries/FileUpload/FileUpload'
import FeedbackUser from 'App/Models/FeedbackUser';
import FeedbackQuestion from 'App/Models/FeedbackQuestion';
import User from 'App/Models/User';
//import Hash from '@ioc:Adonis/Core/Hash'
import { sendMail, currentDateTime } from 'App/Helpers/Index'
import moment from 'moment';

class FeedbackUserHook
{
     /**
     * Hook for manipulate query of index result
     * @param {current mongo query} query
     * @param {adonis request object} request
     * @param {object} slug
     */
    public static async indexQueryHook(query: object, request: object, slug:string = '')
    {
        let params = request.all();
        if(!_.isEmpty(params.created_by_id)){
            query.where('created_by_id',params.created_by_id)
        }
        query.preload('CreatedBy').preload('FeedbackQuestion').orderBy('id','desc')
    }

    /**
     * Hook for manipulate data input before add data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async beforeCreateHook(request: object, params:object)
    {
        let slug      = await FeedbackUser.generateSlug('ans_'+request.user().id+params.question_id);
        let get_feedback_question = await FeedbackQuestion.query().where('id',params.question_id).first();
        var now = new Date();
        var dateString = moment(now).format('YYYY-MM-DD');
        params.created_by_id = request.user().id
        params.question = get_feedback_question.question
        params.created_name = request.user().name
        params.submit_date = dateString
        params.slug       = slug
        params.created_at = currentDateTime();

    }

    /**
     * Hook for execute command after add public static function called
     * @param {saved record object} record
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async afterCreateHook(record:object, request:object, params:object)
    {
        
        //send welcome email to user
        // if( Env.get('MAIL_SANDBOX') == 0 ){
        //     let email_params = {
        //       name: record.name,
        //       app_name: Env.get('APP_NAME'),
        //       link: Env.get('APP_URL') + '/user/verify/' + Encryption.encrypt(record.email)
        //     }
        //     sendMail('emails/register',record.email,`Welcome to ${email_params.app_name} `,email_params);
        // }
    }

    /**
     * Hook for manipulate data input before update data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async beforeEditHook(request:object, params:object, slug:string)
    {
        if( !_.isEmpty(request.file('image_url')) ){
          params.image_url  = await FileUpload.doUpload(request.file('image_url'),'user');
        }

    }

    /**
     * Hook for execute command after edit
     * @param {updated record object} record
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async afterEditHook(request:object, slug:string)
    {

    }

    /**
     * Hook for execute command before delete
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async beforeDeleteHook(request:object, params:object, slug:string)
    {

    }

    /**
     * Hook for execute command after delete
     * @param {adonis request object} request
     * @param {payload object} params
     * @param {string} slug
     */
    public static async afterDeleteHook(request:object, params:object, slug:string)
    {

    }
}
module.exports = FeedbackUserHook;
