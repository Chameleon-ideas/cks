'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import Product from './Product'

class OrderProducts
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
          product_id: record.product_id,
          product: await Product.initResponse(record.Product,request),
          order_id:record.order_id,
          product_title:record.product_title,
          quantity: record.quantity,
          amount: record.amount,
          total: (parseInt(record.quantity) * parseFloat(record.amount)),
          status:record.status,
          created_at: record.created_at
      }
  }

}
module.exports = OrderProducts;
