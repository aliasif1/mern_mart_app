import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Cart from "./pages/Cart"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ProductDetail from "./pages/ProductDetail"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import { useAuthContext } from './hooks/useAuthContext';
import Orders from './pages/Orders';
import Profile from './pages/Profile';

const App = () => {
  const {user} = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products/:category' element={<ProductList />}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/register' element={user ? <Navigate to={'/'}/> : <Register/>}/>
        <Route path='/login' element={user ? <Navigate to={'/'}/> : <Login/>}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/orders' element={!user ? <Navigate to={'/'}/> : <Orders/>}/>
        <Route path='/profile' element={!user ? <Navigate to={'/'}/> : <Profile/>}/>
        <Route path='/*' element={<Navigate to={'/'}/>}/>
      </Routes>
    </BrowserRouter>
    // <Home />
    // <ProductList />
    // <ProductDetail />
    // <Register />
    // <Login />
    // <Cart />
  )
}

export default App