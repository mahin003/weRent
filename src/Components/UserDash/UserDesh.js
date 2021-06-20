

import React from 'react';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import Profile from './Profile'
import { UserContext } from '../../App';
import { useContext } from 'react';
import './UserDash.css'
import PersonIcon from '@material-ui/icons/Person';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import HistoryIcon from '@material-ui/icons/History';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import Vendorform from '../Sell/VendorInput/Vendorform';
import VendorHistory from '../Sell/VendorInput/VendorHistory';

const UserDesh = () => {
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    // console.log("dashboard ", LoggedInUser)
    return (
        <div className="SellMenu">
        <div className="Links">
           <div className="LinkDiv mx-auto mb-auto"> 
            <div className="IconLink" ><PersonIcon color="primary"></PersonIcon> <Link to="/userdesh/profile">Profile</Link></div>
            {
                 LoggedInUser!=null && LoggedInUser.isSeller && <div className="IconLink"><AddCircleIcon color="primary"></AddCircleIcon>  <Link to="/userdesh/profile/sell/form">Add New </Link></div>}
              {   
                 LoggedInUser!=null && LoggedInUser.isSeller ? <div className="IconLink"><HistoryIcon color="primary"></HistoryIcon> <Link to="/userdesh/profile/sell/history">Your History</Link></div>:<div className="IconLink"><EmojiPeopleIcon color="primary"></EmojiPeopleIcon> <Link to="/sell"> Become a Seller</Link></div>
            }

            
          </div> 
        </div>
        <div className="LinkDirect">
            <Switch>
                    <Route path="/userdesh/profile/sell/form">
                        <Vendorform></Vendorform>
                    </Route>
                    <Route path="/userdesh/profile/sell/history">
                        <VendorHistory UserInfo={LoggedInUser}></VendorHistory>
                    </Route>
                <Route path='/userdesh/profile'>
                     <Profile UserInfo={LoggedInUser}></Profile>
                </Route>
                
            </Switch>
        </div>
    </div>
    );
};

export default UserDesh;