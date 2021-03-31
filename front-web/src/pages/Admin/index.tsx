import React from 'react';
import { Switch } from 'react-router-dom';
import Navbar from './components/NavBar';
import Products from './components/Products';
import PrivateRoute from "core/Routes/PrivateRoutes";
import Categories from './components/Categories'
import './styles.scss';


const Admin = () => (
    <div className="admin-container">
        <Navbar />
        <div className="admin-content">
            <Switch>
                <PrivateRoute path="/admin/products">
                    <Products />
                </PrivateRoute>
                <PrivateRoute path="/admin/categories">
                    <Categories />
                </PrivateRoute>
                <PrivateRoute path="/admin/users" allowedRoutes={['ROLE_ADMIN']}>
                    <h1>Users</h1>
                </PrivateRoute>
            </Switch>
        </div>
    </div>
)

export default Admin;