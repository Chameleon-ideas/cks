'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import {baseUrl,storageUrl} from 'App/Helpers/Index'
import Product from 'App/Models/Product';

class ProductCategory
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
          created_by: await PublicUser.initResponse(record.CreatedBy,request),
          title: record.title,
          slug: record.slug,
          description:record.description,
          total_products:await Product.query().where('product_cate_id',record.id).getCount(),
          image_url: !_.isEmpty(record.image_url) ?  await storageUrl(record.image_url) : baseUrl('/images/user-placeholder.jpg'),
          status:record.status,
          status_text:(record.status == '1') ? 'Active' : 'De-Active',
          created_at: record.created_at
      }
  }

}
module.exports = ProductCategory;
