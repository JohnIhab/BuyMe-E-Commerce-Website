import React, { useContext, useEffect, useState } from 'react'
import { storeContext } from '../../context/storeContext'
import Loading from '../Loading/Loading'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

export default function Cart() {
  let { getCart, deleteItem, setCounter, UpdateQty } = useContext(storeContext)
  let [data, setData] = useState(null)
  let [loading, setLoading] = useState(true)
  useEffect(() => {
    (async () => {
      let data = await getCart();
      if (data?.response?.data.statusMsg == 'fail') {
        setData(null)
      }else {
        
        setData(data)
      }
      console.log(data);
      setLoading(false)


    })()
  }, [])

  async function deleteProduct(id) {
    let data = await deleteItem(id)
    if (data.status == 'success') {
      toast.error('Product Deleted Successfully')
      setCounter(data.numOfCartItems)
      setData(data)
    }
  }

  async function updateProductQty(id, count) {
    let data = await UpdateQty(id, count)
    if (data.status == 'success') {
      toast.success('Product Updated Successfully')
      setCounter(data.numOfCartItems)
      setData(data)
    }
  }
  if (loading) return <Loading />
  if (data ==null || data.numOfCartItems == 0) return <h2 className='text-center my-5 text-main'>No Items in cart </h2>
  return (
    <div className='container my-2 bg-light-color p-3 rounded-1'>
      <h2>Shop Cart:</h2>
      <p className='text-main'>Total Cart Price : {data?.data.totalCartPrice} EGP</p>
      {data?.data.products.map(i => {
        return <div key={i._id} className="row py-2 border-bottom">
          <div className="col-md-1">
            <img src={i.product.imageCover} className='w-100' />
          </div>
          <div className="col-md-11 d-flex justify-content-between">
            <div>
              <p className='m-1'>{i.product.title}</p>
              <p className='text-main my-3 p-0'>Price: {i.price}</p>
              <button
                onClick={() => deleteProduct(i.product._id)}
                className="btn remove-btn m-0 p-0 border-0"
              >
                <i className="fa-solid fa-trash"></i> Remove
              </button>

            </div>
            <div className="quantity-controls d-flex align-items-center">
              <button
                onClick={() => updateProductQty(i.product._id, i.count + 1)}
                className="btn btn-outline-primary px-3 mx-1 fw-bold increase-btn"
              >
                +
              </button>

              <span className="px-3 fw-bold">{i.count}</span>

              <button disabled={i.count <= 1}
                onClick={() => updateProductQty(i.product._id, i.count - 1)}
                className="btn btn-outline-danger px-3 mx-1 fw-bold decrease-btn"
              >
                -
              </button>
            </div>

          </div>
        </div>
      })}
      <Link to={`/address/${data.data._id}`} className='btn bg-main text-white my-3'>Place Order</Link>
    </div>
  )
}
