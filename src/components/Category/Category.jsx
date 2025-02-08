import React from 'react'
import { Link } from 'react-router-dom'

export default function Category({i}) {
  return (
    <>
        <div className="px-1">
            <Link className='link-style' to={`/category-details/${i._id}`}>
                <img src={i.image} height={200} className='w-100' alt='' />
                <h4>{i.name}</h4>
            </Link>
        </div>
    </>
  )
}
