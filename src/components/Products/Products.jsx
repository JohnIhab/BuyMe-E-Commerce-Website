import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading'
import Product from '../../components/Product/Product';
import {useQuery } from '@tanstack/react-query';

function getProducts () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
export default function Products() {
    const {data, isError, isLoading, isFetching} = useQuery({
        queryKey: ["getProducts"],  
        queryFn: getProducts,       
    })
    console.log(data);
    


    if(isLoading) return <Loading />
  return (
    <>
        <div className="mx-3 my-5 ">
            <div className="row">
                {data?.data.data.map(i => {
                    return <Product i={i} key={i._id} />
                })}
            </div>
        </div>
    </>
  )
}
