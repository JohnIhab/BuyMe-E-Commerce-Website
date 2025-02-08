import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer'
import { storeContext } from '../../context/storeContext'
import { toast } from 'react-toastify'

export default function Product({ i }) {
    let { counter, setCounter, addToCart } = useContext(storeContext)
    let [btnLoading, setBtnLoading] = useState(true)
    let [isFavorite, setIsFavorite] = useState(false); // Track favorite status

    async function addProductToCart(productId) {
        setBtnLoading(false)
        let data = await addToCart(productId);
        console.log("Response from addToCart:", data);

        if (!data) {
            toast('Error: No response from server');
            return;
        }

        if (data.status === 'success') {
            toast.success('Product added successfully');
            setCounter(data.numOfCartItems)
            setBtnLoading(true)
        } else {
            toast('Failed to add product');
        }
    }

    // Handle favorite toggle
    function toggleFavorite() {
        setIsFavorite(!isFavorite);
    }

    return (
        <>
            <div className="col-md-2">
                <div className="product cursor-pointer rounded-3 p-3">
                    <Link className='link-style' to={`/product-details/${i._id}`}>
                        <img src={i.imageCover} className='w-100' alt="" />
                        <span className='text-main'> {i.category.name} </span>
                        <h5 className='my-2 fw-bold'> {i.title.split(' ').slice(0, 2).join(' ')}</h5>
                        <div className='d-flex justify-content-between my-3'>
                            <div>
                                {i.price} EGP
                            </div>
                            <div>
                                <i className="fa-solid fa-star rating-color"></i>
                                {i.ratingsAverage}
                            </div>
                        </div>
                    </Link>
                    <div className="d-flex justify-content-between">
                        

                        <button 
                            disabled={!btnLoading} 
                            onClick={() => addProductToCart(i._id)} 
                            className='btn bg-main w-100 text-white'>
                            {btnLoading ? 'Add to Cart' : <i className='fa fa-spinner fa-spin'></i>}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
