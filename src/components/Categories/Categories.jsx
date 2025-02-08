import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Loading from '../Loading/Loading';
import { useQuery } from '@tanstack/react-query';
import Category from '../Category/Category';

function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories/');
}


const Categories = () => {
    const {data, isError, isLoading, isFetching} = useQuery({
        queryKey: ["getCategories"],  
        queryFn: getCategories,       
    })
    console.log(data);
    
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        swipeToSlide: true,  
        touchMove: true, 
        arrows: false  
    };
    
    if(isLoading) return <Loading />
    
    return (
        <div className="scroll-container mx-3 ">
            <h3>Shop Pouplar Categories</h3>
            <Slider {...settings}>
                {data?.data.data.map(i => <Category i={i} key={i._id} />)}   

            </Slider>
        </div>

    );
};

export default Categories;