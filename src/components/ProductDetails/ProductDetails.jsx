import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import axios from 'axios'
import { storeContext } from '../../context/storeContext'

export default function ProductDetails() {
    let {counter, setCounter} = useContext(storeContext)
    let {id} = useParams ()
    async function getProduct () {
        const {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        return data.data
    }
    const {data:product, isError, isLoading} = useQuery({
        queryKey: ["getProduct", id],
        queryFn: getProduct,
    })
    console.log(product);
    if (isLoading) return <Loading />
  return (
        <div className="container my-5">
            <div className="row mt-5">
                <div className="col-md-3">
                    <img src={product.imageCover} className="w-100" alt={product.title} />
                </div>
                <div className="col-md-9">
                    <h4 className='fw-bold'>{product.title}</h4>
                    <p className='my-3'>{product.description}</p>
                    <span>{product.category.name}</span>

                    <div className='d-flex justify-content-between my-4'>
                        <div >
                            <div>
                                <p>{product.price} EGY</p>
                            </div>
                            
                        </div>
                            <div>
                                    <i className='fa-solid da-star rating-color'></i>
                                    {product.ratingsAverage}
                            </div>
                    </div>
                    <button onClick={()=>setCounter(counter + 1)} className='btn bg-main text-white w-100'>Add to Cart</button>
                </div>
            </div>
        </div>
  )
}


