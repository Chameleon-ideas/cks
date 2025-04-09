import RestController from '.././RestController'
import { schema,rules } from '@ioc:Adonis/Core/Validator'
import _ from 'lodash'
import ProductCategory from 'App/Models/ProductCategory';
import Product from 'App/Models/Product';

export default class ProductCategoryController extends RestController
{
    protected __resource: string;
    protected __request: object;
    protected __response: object;
    protected __params: object;

    constructor() {
        super("ProductCategory");
        this.__resource = "ProductCategory";
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
            title: schema.string({},[]),
        })
        try{
          validator = await this.__request.validate({ schema: validationRules,messages: {
                      required: '{{ field }} is required to service'
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
        let params = this.__request.all();
        let user = this.__request.user();
        let slug = this.__params.id

        let get_category = await ProductCategory.query().where('slug',slug).first();
        let check_product = await Product.query().where('product_cate_id',get_category.id).getCount();
        if(check_product > 0){
          this.__is_error = true;
            return this.sendError(
                'Validation Message',
                { message: 'Category already associated with products' },
                400
            );
        }

    }

    /**
     *
     */
    protected async afterDestoryLoadModel()
    {

    }
}
