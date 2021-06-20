
import React from 'react';
import { Route, Switch } from 'react-router';
import { Link, Redirect } from 'react-router-dom';
import './sell.css'
import Vendorform from './VendorInput/Vendorform';
import VendorHistory from './VendorInput/VendorHistory';

const Sell = () => {
    return (
        <div className="SellMenu">
            <Redirect to='/userdesh/profile/sell/form'/>
        </div>
    );
};

export default Sell;