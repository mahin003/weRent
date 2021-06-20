
import React, { useContext } from 'react';
import { useEffect } from 'react';
import { Redirect, Route, useLocation } from 'react-router';
import { UserContext } from './App';

const PrivateRouteReg = ({ children, ...rest }) => {
    const [LoggedInUser,setLoggedInUser]= useContext(UserContext);
    useEffect(() => {
      // if(typeof(localStorage.getItem("user") === 'undefined')){
      const loggedInUser = localStorage.getItem("user");
      const foundUser = JSON.parse(loggedInUser);
      // console.log("foundUser ", foundUser)
      setLoggedInUser(foundUser);
    }, []);

    return (
      <Route
      {...rest}
      render={({ location }) =>
        ( (LoggedInUser!=null && LoggedInUser.Email)|| LoggedInUser.isAdmin==true) ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRouteReg;