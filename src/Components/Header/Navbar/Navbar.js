import { Avatar, makeStyles } from "@material-ui/core";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../App";
import { deepOrange} from '@material-ui/core/colors';
import "../Header.css"

const useStyles=makeStyles((theme)=>({
  square: {
    
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  }

}))
const Navbar = () => {
    const classes= useStyles();
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    
    // console.log("nav ", LoggedInUser)

    const LogOut = () =>{
      setLoggedInUser({
        Email:'',
        isAdmin:false
      });
      localStorage.clear();
    }

   
    return (
       
        <nav class="navbar navbar-expand-lg navbar-light bg-light scrolling-navbar" style={{boxShadow: "0 5px 8px 0 rgba(0, 0, 0, 0.1), 0 8px 20px 0 rgba(0, 0, 0, 0.1)"}}>
  <a style={{ textDecoration: 'none'}} class="navbar-brand  " href="/" className="Title">weRent</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-end "  style={{}} id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
      <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        {
            LoggedInUser!=null && LoggedInUser.isAdmin && <Link ClassName="Links"  to="/admin" class="nav-link">Admin</Link>
        } 
       
      </li> 
      <li class="nav-item">
      <Link  class="nav-link" to="/sell">Sell</Link>
      </li>

      
        {
          (LoggedInUser!=null && LoggedInUser.Email) ? <div class="dropdown">
          <button class="btn btn-default dropdown-toggle " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"  aria-expanded="false">
            Hello {LoggedInUser.First_Name.toUpperCase()} !
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            {
               LoggedInUser.isAdmin ==false &&   <Link class="dropdown-item nav-link" to="/userdesh/profile">Profile</Link>
            }
         
            <Link class="dropdown-item nav-link" onClick={()=>LogOut()} to="/">Logout</Link>
            
          </div>
        </div>: <li class="nav-item">
      
            <Link class="nav-link"  to="/login">Login</Link>
       
      </li>
             
        }
     
    </ul>
  </div>
</nav>
       
    );
};

export default Navbar;