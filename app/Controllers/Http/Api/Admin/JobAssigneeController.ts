import RestController from '.././RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import _ from 'lodash'
import User from 'App/Models/User';
import JobAssignee from 'App/Models/JobAssignee';
import Job from 'App/Models/Job';
import { sendMail, currentDateTime } from 'App/Helpers/Index'

export default class JobAssigneeController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("JobAssignee");
        this.__resource = "JobAssignee";
        this.__request; //adonis request obj
        this.__response; //adonis response obj
        this.__params = {}; // this is used for get parameters from url
    }

    /**
     *
     * @param action
     * @param slug
     */
    protected async validation( action: string, slug: string )
    {
        switch (action) {
          case "store":
            await this.storeValidation();
          break;
          case "update":
            await this.updateValidation();
          break;
        }
    }

    /**
     *
     * @returns
     */
    private async storeValidation()
    {
        let validator;
        let validationRules;
        validationRules = schema.create({
          job_id: schema.string({},[]),
          crew_id: schema.string({},[]),
          crew_name: schema.string({},[]),
          crew_email: schema.string({},[]),
          crew_mobile_no: schema.string({},[]),
        })
        try{
          validator = await this.__request.validate({ schema: validationRules,messages: {
                      required: '{{ field }} is required to job'
          }
         })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              'Validation Message',
               this.setValidatorMessagesResponse(error.messages),
               400
            )
        }
        return validator;
    }


    /**
     *
     * @returns
     */
    private async updateValidation()
    {
        let validator;
        let validationRules
        validationRules = schema.create({
          //address: schema.string({},[]),
        })
        try{
          validator = await this.__request.validate({ schema: validationRules })
        } catch(error){
            this.__is_error = true;
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        return validator;
    }

    /**
     *
     */
    protected async beforeIndexLoadModel()
    {
      
    }

    /**
     *
     */
    protected async afterIndexLoadModel(records:object)
    {

    }

    /**
     *
     */
    protected async beforeStoreLoadModel()
    {
       
    }

    /**
     *
     */
    protected async afterStoreLoadModel()
    {

    }

    /**
     *
     */
    protected async beforeShowLoadModel()
    {

    }

    /**
     *
     */
    protected async afterShowLoadModel(record: object)
    {

    }

    /**
     *
     */
    protected async beforeUpdateLoadModel()
    {
        
    }

    /**
     *
     */
    protected async afterUpdateLoadModel()
    {

    }

    /**
     *
     */
    protected async beforeDestoryLoadModel()
    {

    }

    /**
     *
     */
    protected async afterDestoryLoadModel()
    {

    }

    public async crewAssigne(ctx: HttpContextContract)
    {
        this.__request  = ctx.request;
        this.__response = ctx.response;
        //check validation
        let validationRules = schema.create({
          job_id:schema.string(),
          assignee:schema.string(),
        })
        try{
          await this.__request.validate({ schema: validationRules })
        } catch(error){
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        let params = this.__request.all();
        let assignee_ids = params.assignee.split(",")
        let get_assignee = await User.getUsersByIDArray(assignee_ids)
        let insert_obj = ''
        for(let i=0;i<get_assignee.length;i++){
          let slug      = await JobAssignee.generateSlug(get_assignee[i].name);
          insert_obj = {
              job_id:params.job_id,
              crew_id:get_assignee[i].id,
              slug:slug,
              crew_name:get_assignee[i].name,
              crew_email:get_assignee[i].email,
              crew_mobile_no:get_assignee[i].mobile_number,
              created_at:currentDateTime()
          }
          let insert_record = await JobAssignee.create(insert_obj);
        }
        
        await Job.updateJob({'job_status':'7','number_of_person':get_assignee.length},{id:params.job_id});
        //send response
        this.__is_paginate = false;

        this.__sendResponse(200,'Crew Assign the job successfully',[]);
        return;
    }

    public async getCrewJob(ctx: HttpContextContract)
    {
        this.__request  = ctx.request;
        this.__response = ctx.response;
        //check validation
        let validationRules = schema.create({
        })
        try{
          await this.__request.validate({ schema: validationRules })
        } catch(error){
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        let params = this.__request.all();
        let user_id = _.isEmpty(params.created_by_id) ? this.__request.user().id : params.created_by_id
        let get_jobs = await JobAssignee.getJobs(user_id);
        let ids = []
        if(!_.isEmpty(get_jobs)){
            for(let i=0;i<get_jobs.length;i++){
              ids.push(get_jobs[i].job_id)
            }
        }
        let record = await Job.getJobsByIds(ids)
        //send response
        this.__is_paginate = false;
        this.__resource = "CrewJob";
        this.__sendResponse(200,'Crew jobs retrived successfully',record);
        return;
    }

    public async getCrewJobBySlug(ctx: HttpContextContract)
    {
        this.__request  = ctx.request;
        this.__response = ctx.response;
        this.__params = ctx.params;
        //check validation
        let validationRules = schema.create({
        })
        try{
          await this.__request.validate({ schema: validationRules })
        } catch(error){
            return this.sendError(
              'Validation Message',
              this.setValidatorMessagesResponse(error.messages),
              400
            )
        }
        let params = this.__request.all();
        let slug = this.__params.slug;
        let record = await Job.getJobsByslug(slug)
        //send response
        this.__is_paginate = false;
        this.__resource = "Job";
        this.__sendResponse(200,'Crew job retrived successfully',record);
        return;
    }
}
