import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Signup = () => {
    const [errorMsg,setErrorMsg] = useState('')
    const [loading, setLoading] = useState(true)
    
    let nav = useNavigate()

     function sendDataToApi(values) {
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
        .then(({data})=>{
            console.log(data);
            if(data.message == 'success'){
                nav('/signin')
            }
            
        }).catch((err)=>{
            setErrorMsg(err.response.data.message);
            setLoading(true)
        })
        
    }
    // function validate (values) {
    //     const myError ={}
    //     if (!values.name){
    //         myError.name = 'name is required.'
    //     }
    //     if (!values.email){
    //         myError.email = 'email is required.'
    //     }
    //     if (!/^[A-Z][A-Za-z0-9@]{6,}$/.test(values.password)) {
    //         myError.password = 'password must be 7 characters or more and start with a capital letter.'
    //     }
    //     if (values.rePassword != values.password) {
    //         myError.rePassword = 'password and repassword not match'
    //     }
    //     return myError
    // }
    function validationSchema() {
        let schema = new Yup.object({
            name:Yup.string().min(2).required(),
            email:Yup.string().required(),
            password: Yup.string()
            .matches(/^[A-Z][A-Za-z0-9@]{5,}$/, "Password must start with an uppercase letter and be at least 6 characters long")
            .required(),
            rePassword:Yup.string().oneOf([Yup.ref('password')]).required(),
        })
        return schema
    }
    let register = useFormik({
        initialValues: {
            name:'',
            email:'', 
            password:'',
            rePassword:'',
        },
        validationSchema,
        // validate,
        onSubmit:(values)=>{
            console.log(values);
            sendDataToApi (values)
        }
    })
    
    return (
        <>
            <div className="w-75 m-auto my-4">
                <h2>Register Now : </h2>
                <form onSubmit={register.handleSubmit}>
                    <label htmlFor="name">Name:</label>
                    <input value={register.values.name} onChange={register.handleChange} onBlur={register.handleBlur} type="text" name="name" className='form-control mb-3' id="name" />
                    {register.errors.name &&register.touched.name ? <div className='alert alert-danger'>{register.errors.name}</div> : ''}

                    <label htmlFor="email">Email:</label>
                    <input value={register.values.email} onChange={register.handleChange} onBlur={register.handleBlur} type="email" name="email" className='form-control mb-3' id="email" />
                    {register.errors.email &&register.touched.email ? <div className='alert alert-danger'>{register.errors.email}</div> : ''}

                    <label htmlFor="password">Password:</label>
                    <input value={register.values.password} onChange={register.handleChange} onBlur={register.handleBlur} type="password" name="password" className='form-control mb-3' id="password" />
                    {register.errors.password &&register.touched.password ? <div className='alert alert-danger'>{register.errors.password}</div> : ''}

                    <label htmlFor="rePassword">Re Password:</label>
                    <input value={register.values.rePassword} onChange={register.handleChange} onBlur={register.handleBlur} type="password" name="rePassword" className='form-control mb-3' id="rePassword" />
                    {register.errors.rePassword &&register.touched.rePassword ? <div className='alert alert-danger'>{register.errors.rePassword}</div> : ''}

                    {errorMsg? <div className='alert alert-danger'>{errorMsg}</div> : ''}
                    <button disabled={!(register.dirty&&register.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading? 'Signup': <i className='fa fa-spinner fa-spin'></i>}
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

export default Signup;