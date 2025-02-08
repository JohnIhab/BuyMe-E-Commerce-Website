import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { storeContext } from '../../context/storeContext';
const Address = () => {
    const [errorMsg,setErrorMsg] = useState('')
    const [loading, setLoading] = useState(true)
    let {pay} = useContext(storeContext)
    let nav = useNavigate()
    let {id} = useParams()
    async function sendDataToApi(values) {
        setLoading(false)
        let data = await pay(id, values)
        console.log(data);
        if (data.status == 'success') {
            window.location.href = data.session.url
        }
    }


    let address = useFormik({
        initialValues: {

            details:'', 
            phone:'',
            city:'',
        },
        onSubmit:(values)=>{
            console.log(values);
            sendDataToApi (values)
        }
    })
    
    return (
        <>
            <div className="w-75 m-auto my-4 ">
                <h2>Login Now : </h2>
                <form onSubmit={address.handleSubmit}>

                    <label htmlFor="details">Details:</label>
                    <textarea onChange={address.handleChange} onBlur={address.handleBlur} type="text" name="details" className='form-control mb-3' id="details"></textarea>

                    <label htmlFor="phone">Phone:</label>
                    <input onChange={address.handleChange} onBlur={address.handleBlur} type="text" name="phone" className='form-control mb-3' id="phone" />

                    <label htmlFor="city">City:</label>
                    <input onChange={address.handleChange} onBlur={address.handleBlur} type="text" name="city" className='form-control mb-3' id="city" />


                    <button disabled={!(address.dirty&&address.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading? 'Pay': <i className='fa fa-spinner fa-spin'></i>}
                    </button>
                </form>
            </div>
                <div className='my-5 mx-3'>
                    <span className='my-5'></span>
                    <Footer />
                </div>
        </>
    );
};

export default Address;