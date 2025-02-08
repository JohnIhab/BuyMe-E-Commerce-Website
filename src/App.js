import './App.css';
import Categories from './components/Categories/Categories';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Signup from './components/Signup/Signup';
import Signin from './components/Signin/Signin';
import NotFound from './components/NotFound/NotFound';
import MainLayout from './Layouts/MainLayout';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Offline, Online } from "react-detect-offline";
import Auth from './Layouts/Auth';
import ProtectedRoutes from './ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './components/ProductDetails/ProductDetails';
import StoreContextProvider from './context/storeContext';
import { ToastContainer } from 'react-toastify';
import Address from './components/Adderss/Adderss';
function App() {
  let routers = createBrowserRouter([
    {path:'/', element:<MainLayout />, children:[
      {index: true, element:<ProtectedRoutes> <Home />  </ProtectedRoutes>},
      {path: 'home', element:<ProtectedRoutes> <Home />  </ProtectedRoutes>},
      {path: 'products', element:<ProtectedRoutes> <Products />  </ProtectedRoutes>},
      {path: 'categories', element:<ProtectedRoutes> <Categories />  </ProtectedRoutes>},
      // {path: 'brands', element:<ProtectedRoutes> <Brands />  </ProtectedRoutes>},
      {path: 'cart', element:<ProtectedRoutes> <Cart />  </ProtectedRoutes>},
      {path: 'product-details/:id', element:<ProtectedRoutes> <ProductDetails/>  </ProtectedRoutes>},
      {path: 'address/:id', element:<ProtectedRoutes> <Address/>  </ProtectedRoutes>},
      {path:'*', element: <NotFound />},
    ]},
    {path:'/', element:<Auth />, children:[
      {path: 'signup', element:<Signup  />},
      {path: 'signin', element:<Signin />},
    ]}
  ])
  return (
    <>
      <Offline>
        <div className='offline'>You are Offline Now!</div>
      </Offline>
      <ToastContainer theme='colored' autoClose={700}/>
      <StoreContextProvider >
        <RouterProvider router={routers} />
      </StoreContextProvider>
    </>
  );
}

export default App;
