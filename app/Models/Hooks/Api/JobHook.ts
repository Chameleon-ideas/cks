'use strict'
import _ from 'lodash';
import FileUpload from 'App/Libraries/FileUpload/FileUpload'
import Job from 'App/Models/Job';
import User from 'App/Models/User';
//import Hash from '@ioc:Adonis/Core/Hash'
import { sendMail, currentDateTime } from 'App/Helpers/Index'
import Services from 'App/Models/Services';

class JobHook
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
        let current_user_id = request.user().id
        if(!_.isEmpty(params.created_by_id) && _.isEmpty(params.target_id)){
            current_user_id = params.created_by_id
            query.where('created_by_id',current_user_id)
        }else  if(!_.isEmpty(params.created_by_id) && !_.isEmpty(params.target_id)){
            query.where('created_by_id',params.created_by_id).where('target_id',params.target_id)
        }else  if(_.isEmpty(params.created_by_id) && !_.isEmpty(params.target_id)){
            query.where('target_id',params.target_id)
        }else{
            let sub_users = await User.getUserHierarchy(current_user_id);
            query.where(function (query) {
                query.whereIn('created_by_id',sub_users)
                    .orWhereIn('parent_id',sub_users);
            }); 
        }
        
        
        if(!_.isEmpty(params.send_to_admin)){
            query.where('send_to_admin',params.send_to_admin)
        }
        query.preload('CreatedBy').preload('TargetBy').preload('ParentBy').preload('JobStatus').preload('Services').preload('JobAssignee',function(usr){
            usr.preload('User')
        }).orderBy('id','desc')
    }

    /**
     * Hook for manipulate data input before add data is execute
     * @param {adonis request object} request
     * @param {payload object} params
     */
    public static async beforeCreateHook(request: object, params:object)
    {
        
        let service = await Services.query().where('id',params.service_id).first();
        let slug      = await Job.generateSlug(request.user().name+service.title);
        let target = await User.query().where('id',params.target_id).first();

        params.created_by_id = request.user().id
        params.title = service.title
        params.name = target.name
        params.monile_no = target.mobile_number
        params.address = request.user().company_address
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
module.exports = JobHook;
