import React, { useContext, useEffect } from 'react'
import logo from '../../assets/images/freshcart-logo.png'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { storeContext } from '../../context/storeContext'
export default function Navbar() {
    let {counter, getCart, setCounter} = useContext (storeContext)
    let { logout } = useContext(storeContext);
    let navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (confirmLogout) {
          // Proceed with logout
          localStorage.removeItem("token");  // Clear token from localStorage
          navigate("/signin");  // Redirect to login page
        }
      };

    useEffect(() => {
        (async()=> {
            let data = await getCart();
            console.log(data);
            setCounter(data.numOfCartItems)

            
        })()
    }, [])
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary py-2 ">
                <div className="container-fluid mx-3">
                    <NavLink className="navbar-brand" to="/home">
                        <img height={35} src={logo} alt="Logo" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/home">Home</NavLink>
                            </li>
                            
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/products">Products</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/categories">Categories</NavLink>
                            </li>
                            
                        </ul>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink className="nav-link position-relative" to="/cart">Cart 
                                <i className="fa-solid fa-cart-shopping mx-2 cartIcon"></i>
                                    {counter ? <span className="position-absolute top-25 start-100 translate-middle badge rounded-pill bg-danger">
                                        {counter}
                                        <span className="visually-hidden">unread messages</span>
                                    </span> : ''}
                                </NavLink>
                            </li>
                            
                            <li className="nav-item mx-3">
                                <NavLink onClick={ handleLogout} className="nav-link position-relative" to="/">LogOut 
                                
                                </NavLink>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>

        </>
    )
} 
