import React,{useEffect, useState} from 'react'
import ContentWrapper from '../../../components/shared/contentWrapper';

const HomePage = () => {
  
  return (
    
    
      <section className="main-content d-flex align-items-center justify-content-center min-vh-100">
        <div className='row'>
          <div className="col-sm-12">
          <img className='my-4' src='/images/app_logo.png' alt='' height={"250px"}/>
          </div>
        </div>
      </section>
     

  )
}

export default React.memo(HomePage);