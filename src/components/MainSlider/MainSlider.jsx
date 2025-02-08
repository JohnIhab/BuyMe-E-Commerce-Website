import React from 'react';
import Slider from 'react-slick';
import slide1 from '../../assets/images/655b0d0f-f968-4e79-b30b-764a784ff3fc.avif';
import slide2 from '../../assets/images/802bebd0-b22f-4d56-b6b6-136db3ef8fe9.avif';
import slide3 from '../../assets/images/83ed1dca-d5e6-49f5-97ca-de35b520c818.avif';
const MainSlider = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    return (
        <>
            <Slider className='mx-3 mb-5' {...settings}>
                <img src={slide1} alt="Slide Photo" />
                <img src={slide2} alt="Slide Photo" />
                <img src={slide3} alt="Slide Photo" />
            </Slider>
        </>
    );
};

export default MainSlider;