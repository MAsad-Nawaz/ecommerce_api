import React, { Fragment } from 'react';
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Topbar from "./components/topbar/Topbar.jsx";
import "./app.css";
import Home from "./pages/home/Home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import UserList from "./pages/userList/UserList.jsx";
import User from "./pages/user/User.jsx";
import NewUser from "./pages/newUser/NewUser.jsx";
import ProductList from "./pages/productList/ProductList.jsx";
import Product from "./pages/product/Product.jsx";
import NewProduct from "./pages/newProduct/NewProduct.jsx";
import Login from "./pages/login/login.jsx";

function App() {
  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin;
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      {admin && <Fragment>
        <Topbar />
        <div className="container">
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/users" element={<UserList />} />

            <Route path="/user/:userId" element={<User />} />


            <Route path="/newUser" element={<NewUser />} />


            <Route path="/products" element={<ProductList />} />


            <Route path="/product/:productId" element={<Product />} />


            <Route path="/newproduct" element={<NewProduct />} />

          </Routes>

        </div>

      </Fragment>}
    </Router>
  );
}

export default App;
