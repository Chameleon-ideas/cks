'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import ResProductCategory from './ProductCategory'
import {baseUrl,storageUrl} from 'App/Helpers/Index'

class Product
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
          product_cate_id: record.product_cate_id,
          product_cate_title: record.product_cate_title,
          created_by: await PublicUser.initResponse(record.CreatedBy,request),
          category: await ResProductCategory.initResponse(record.ProductCategory,request),
          title: record.title,
          slug: record.slug,
          description:record.description,
          image_url: !_.isEmpty(record.image_url) ?  await storageUrl(record.image_url) : baseUrl('/images/user-placeholder.jpg'),
          amount:record.amount,
          quantity:record.quantity,
          status:record.status,
          status_text:(record.status == 1) ? 'Active' : 'Deactive',
          created_at: record.created_at
      }
  }

}
module.exports = Product;
