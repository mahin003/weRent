import React from 'react';
import {Link,Route, Switch} from 'react-router-dom';
import Flats from './Flats';
import Seller from './Seller';
import AdminList from './AdminList'
import NewAdmin from './NewAdmin'
import './Admin.css'
const AdminDash = () => {
    return (
        <div className="Container">
            <div className=" d-flex justify-content-around w-50  mx-auto border border-seconday my-3" id="Links">
                <Link to ="/admin/flats">Available Flats</Link>
                <Link to ="/admin/seller">Sellers</Link>
                <Link to="/admin/adminlist">Admins</Link>
                <Link to="/admin/addAdmin">Add Admin</Link>
            </div>
            <div>
                <Switch>
                    <Route path="/admin/flats">
                        <Flats></Flats>
                    </Route>
                    <Route path="/admin/seller">
                        <Seller></Seller>
                    </Route>
                    <Route path="/admin/adminlist">
                        <AdminList></AdminList>
                    </Route>
                    <Route path="/admin/addAdmin">
                         <NewAdmin></NewAdmin>
                    </Route>
                </Switch>
            </div>
            
        </div>
    );
};

export default AdminDash;