import axios from 'axios';
import React, { useEffect } from 'react';
import MainSlider from '../MainSlider/MainSlider';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
import Footer from '../Footer/Footer';

const Home = () => {

    return (
        <>
            <MainSlider />
            <Categories />
            <Products />
            <Footer />
        </>
    );
};

export default Home;  