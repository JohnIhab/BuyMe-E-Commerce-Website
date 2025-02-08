import React from 'react'
import google from '../../assets/images/google-play.png';
import app from '../../assets/images/app-store.png';
export default function Footer() {
  return (
    <>
        <div className="row mx-3" >
            <div>
                <h3>Get the BuyMe app</h3>
                <p>We will senf you a link, open it on ypur phone to download the app.</p>
            </div>
            <div className='d-flex'>
                <input type='email' className=' mx-4 mb-3 form-control' placeholder='Email ..' />
                <button className=' btn bg-main text-white col-md-2 mb-3 '>Share App Link</button>
            </div>
            <hr className='my-3'/>
            <div className='d-flex justify-content-between m-3'>
                <div className='d-flex '>
                    <h5 className=''>Payment Partners</h5>
                    <i className="fa-brands fa-amazon-pay m-1 "></i>
                    <i className="fa-brands fa-cc-visa m-1"></i>
                    <i className="fa-brands fa-cc-mastercard m-1"></i>
                    <i className="fa-brands fa-paypal m-1"></i>
                </div>
                <div className='d-flex'>
                    <h5 className='mt-3 mx-2'>Get deliveries with BuyMe</h5>
                    <div className='d-flex'>
                        <img src={app} width={150}  />
                        <img src={google} width={150}  />
                    </div>
                </div>
            </div>
            <hr className='mb-5'/>
        </div>
    </>
  )
}
