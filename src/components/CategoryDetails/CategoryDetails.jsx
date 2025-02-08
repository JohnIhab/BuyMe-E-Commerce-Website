import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading'
import axios from 'axios'


export default function CategoryDetails() {

    let {id} = useParams ()
    async function getCategory () {
        const {data} =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
        return data.data
    }
    const {data:category, isError, isLoading} = useQuery({
        queryKey: ["getCategory", id],
        queryFn: getCategory,
    })
    console.log(category);
    if (isLoading) return <Loading />

  return (
    <>
        <div className="container my-5">
            <div className="row mt-5">
                <div className="col-md-3">
                    <img src={category.image} className="w-100" alt={category.name} />
                </div>
                <div className="col-md-9">
                    <h4 className='fw-bold'>{category.title}</h4>
                    <p className='my-3'>{category.description}</p>
                    <span>{category.name}</span>

                    <div className='d-flex justify-content-between my-4'>
                        <div >
                            <div>
                                <p>{category.price} </p>
                            </div>
                            
                        </div>
                            <div>
                                    <i className='fa-solid da-star rating-color'></i>
                                    {category.ratingsAverage}
                            </div>
                    </div>
                    <button className='btn bg-main text-white w-100'>Add to Cart</button>
                </div>
            </div>
        </div>
    </>
  )
}
