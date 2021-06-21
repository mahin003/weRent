
import './App.css';
import { Typography } from '@material-ui/core';
import Navbar from './Components/Header/Navbar/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/LoginSignUp/Login';
import { createContext, useContext, useEffect, useState } from 'react';
import PrivateRoute from './PrivateRoute';
import AdminDirect from './Components/Admin/AdminDirect';
import Sell from './Components/Sell/Sell';
import Header from './Components/Header/Header';
import SignUp from './Components/LoginSignUp/SignUp';
import Description from './Components/Description/Description';
import UserDesh from './Components/UserDash/UserDesh';
import Loginsell from './Components/LoginSignUp/Loginsell';
import Footer from './Components/Footer/Footer';

import PrivateRouteAdmin from './PrivateRouteAdmin';
import AdminDash from './Components/Admin/AdminDash';
import PrivateRouteReg from './PrivateRouteReg';

export const UserContext = createContext();

function App() {
  const [LoggedInUser, setLoggedInUser] = useState({
    Email: '',
    First_Name: '',
    isAdmin: false,
    isSeller: false
  });

  
  useEffect(() => {
    // if(typeof(localStorage.getItem("user") === 'undefined')){
    const loggedInUser = localStorage.getItem("user");
    const foundUser = JSON.parse(loggedInUser);
    // console.log("foundUser ", foundUser)
    setLoggedInUser(foundUser);

    // }
    //  else{
    //   localStorage.clear();

    //  }
  }, []);
  const [check, setCheck] = useState('');



  const [ProductShowCase, setProductShowCase] = useState([]);
  const [ShowCase, setShowCase] = useState(null);

  useEffect(() => {
    fetch("https://still-temple-26727.herokuapp.com/getServices")
      .then(res => res.json())
      .then(data => {
        // console.log("data", data.filter(x=>x.status=="Open"))
        setProductShowCase(data.filter(x=>x.status=="Open"));
        setShowCase(data.filter(x=>x.status=="Open"))
      })
  }, [])

  const getSearch = (e) => {
    const searchName = document.getElementById('Search');
    // const v=document.getElementsByClassName("search_input").innerHTML;
    // console.log("search name ",searchName.value)
    setCheck(searchName.value);
    if (searchName.value == '') {
      setProductShowCase(ShowCase)
    }
    else {
      setProductShowCase(ProductShowCase.filter(word => word.ZipCode.toLowerCase().includes(searchName.value.toLowerCase()) || word.titile.toLowerCase().includes(searchName.value.toLowerCase()) || word.district.toLowerCase().includes(searchName.value.toLowerCase()) || word.division.toLowerCase().includes(searchName.value.toLowerCase()) || word.upazilla.toLowerCase().includes(searchName.value.toLowerCase())))
    }
  }



  return (

    <div className="App">
      {/* <h1>{console.log("logfedInsuer ",LoggedInUser)}</h1> */}
      <UserContext.Provider value={[LoggedInUser, setLoggedInUser]}>



        <Router>
          <Switch>
            <Route path="/loginsell">
              <Navbar></Navbar>
              <Loginsell></Loginsell>
            </Route>
            <Route path="/login">
              <Navbar></Navbar>
              <Login></Login>
            </Route>


            <PrivateRoute path="/sell">
              <Navbar></Navbar>
              <Sell></Sell>
              <UserDesh></UserDesh>
              <Footer></Footer>

            </PrivateRoute>
    
            
            <PrivateRouteAdmin path="/admin">
              <Navbar></Navbar>
              <AdminDirect></AdminDirect>
               <AdminDash></AdminDash>
              <Footer></Footer>
            </PrivateRouteAdmin>
           

            <Route path="/description/:id">
              <Navbar></Navbar>
              <Description></Description>
              <Footer></Footer>
            </Route>
            <Route path='/signup'>
              <Navbar></Navbar>
              <SignUp></SignUp>
              <Footer></Footer>
            </Route>
          
          
             <PrivateRouteReg path="/userdesh/profile">
              <Navbar></Navbar>
              <UserDesh></UserDesh>
              <Footer></Footer>
            </PrivateRouteReg>
            
            <Route path="/">
              <Header fun={getSearch}></Header>
              {/* <Home search={check} data={ProductShowCase} set={setProductShowCase}></Home> */}
              <Home data={ProductShowCase} set={setProductShowCase}></Home>
              {/* <Home2 ></Home2> */}
              <Footer></Footer>
            </Route>


          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
