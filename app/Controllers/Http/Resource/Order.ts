'use strict'
import _ from 'lodash';
import PublicUser from './PublicUser'
import OrderProducts from './OrderProducts'

class Order
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
      let order_status = {}
      if(record.order_status == '1'){
        order_status = {
          color:'#F6BB42',
          status_text:'In-Progress'
        }
      }else if(record.order_status == '2'){
        order_status = {
          color:'#7bcb4d',
          status_text:'Complete'
        }
      }else{
        order_status = {
          color:'#d39e00',
          status_text:'Pending'
        }
      }
      return {
          id: record.id,
          slug: record.slug,
          created_by_id: record.created_by_id,
          created_by: await PublicUser.initResponse(record.CreatedBy,request),
          products: await OrderProducts.initResponse(record.OrderProducts,request),
          total_amount:record.total_amount,
          order_date:record.order_date,
          order_status:record.order_status,
          status_text:order_status,
          status:record.status,
          created_at: record.created_at
      }
  }

}
module.exports = Order;
