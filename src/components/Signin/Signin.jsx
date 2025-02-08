import { useFormik } from 'formik';
import * as Yup from 'yup'
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
const Signin = () => {
    const [errorMsg,setErrorMsg] = useState('')
    const [loading, setLoading] = useState(true)
    
    let nav = useNavigate()

    function sendDataToApi(values) {
        setLoading(false)
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
        .then(({data})=>{
            console.log(data);
            if(data.message == 'success'){
                localStorage.setItem('token', data.token)
                nav('/home')
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
            email:Yup.string().required(),
            password: Yup.string()
            .matches(/^[A-Z][A-Za-z0-9@]{5,}$/, "Password must start with an uppercase letter and be at least 6 characters long")
            .required(),
        })
        return schema
    }
    let login = useFormik({
        initialValues: {
            email:'', 
            password:'',
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
            <div className="w-75 m-auto my-4 ">
                <h2>Login Now : </h2>
                <form onSubmit={login.handleSubmit}>

                    <label htmlFor="email">Email:</label>
                    <input value={login.values.email} onChange={login.handleChange} onBlur={login.handleBlur} type="email" name="email" className='form-control mb-3' id="email" />
                    {login.errors.email &&login.touched.email ? <div className='alert alert-danger'>{login.errors.email}</div> : ''}

                    <label htmlFor="password">Password:</label>
                    <input value={login.values.password} onChange={login.handleChange} onBlur={login.handleBlur} type="password" name="password" className='form-control mb-3' id="password" />
                    {login.errors.password &&login.touched.password ? <div className='alert alert-danger'>{login.errors.password}</div> : ''}


                    {errorMsg? <div className='alert alert-danger'>{errorMsg}</div> : ''}
                    <button disabled={!(login.dirty&&login.isValid)} type='submit' className='btn bg-main text-white'>
                        {loading? 'Signin': <i className='fa fa-spinner fa-spin'></i>}
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

export default Signin;