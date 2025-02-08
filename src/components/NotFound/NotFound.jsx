import React from 'react'
import err from '../../assets/images/error.svg'
export default function NotFound() {
  return (
    <div className='d-flex align-items-center justify-content-center mt-5'>
        <img src={err} alt='Not Found page'/>
    </div>
  )
}
