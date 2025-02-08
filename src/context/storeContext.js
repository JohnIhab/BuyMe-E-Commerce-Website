import axios from "axios";
import { createContext, useState } from "react";
import { data } from "react-router-dom";


export let storeContext = createContext(0)

async function addToCart(productId) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart', { productId }, {
        headers: {
            token: localStorage.getItem('token')
        }
    })
    .then(response => response.data) 
    .catch(err => {
        console.error("Error adding product to cart:", err);
        return null;
    });
}


async function getCart () {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function deleteItem (productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function UpdateQty (productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{count} ,{
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function pay (cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}`,{shippingAddress} ,{
        headers: {
            token: localStorage.getItem('token')
        }
    }).then(({data}) => data).catch(err => err)
}

async function logout(navigate) {
    localStorage.removeItem("token"); 
    navigate("/login"); 
}


export default function StoreContextProvider ({children}) {
    let [counter, setCounter] = useState (0)
    return <storeContext.Provider value={{counter, setCounter, addToCart, getCart, deleteItem, UpdateQty, pay, logout}}>
        {children}
    </storeContext.Provider>
}