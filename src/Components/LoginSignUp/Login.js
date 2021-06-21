
import firebase from "firebase/app";
import React, { useContext, useEffect, useState } from 'react';
import firebaseConfig from '../../firebase.config';
// import firebaseConfig from '../firebase.config';
import "firebase/auth";
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from "react-router-dom";
import "./Login.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '40ch',
    },
  },
  btn: {
    width: '17ch'
  },
  btnGoogle: {
    marginTop: "20px"

  },
  formControl: {
    width: "80%",
    border: "10px solid red"
  },
  formInout: {
    width: "98%",
    margin: theme.spacing(1),

  },
  btn: {
    width: '23ch',
    margin: theme.spacing(2)
  }
}));


firebase.initializeApp(firebaseConfig);


const Login = () => {
  const classes = useStyles();

  const [LoggedInUser, setLoggedInUser] = useContext(UserContext);

  const [Passerror, setPasserror] = useState(false);
  const [suggestion, setSuggestion] = useState('');


  const [loading, setLoading] = useState(false);

  const [fromSell, setFromSell] = useState(false);
  const provider = new firebase.auth.GoogleAuthProvider();

  const history = useHistory();
  const location = useLocation();

  const { from } = location.state || { from: { pathname: "/" } };
  // console.log("Form ", from.pathname, " state ", fromDescription)


  
  const handleSignUp = (e) => {
    setLoading(true); 
    document.getElementById("regForm").style.opacity = ".5";
    const Email = e.target['email'].value;
    // const password=e.target['password'].value;
    const FirstName = e.target['first_name'].value;
    const LastName = e.target['last_name'].value;
    const Address = e.target['address'].value;
    // const Role = e.target['role'].value;

    if (e.target['password'].value == e.target['rePassword'].value) {
     
      const password = e.target['password'].value;
      firebase.auth().createUserWithEmailAndPassword(Email, password)
        .then((userCredential) => {
          // Signed in 
          var user = userCredential.user;
          // console.log(user)
          //Add To DB
          setLoading(false); 
          document.getElementById("regForm").style.opacity = "1";
          alert("New User Registered")
          setSuggestion(e.target['email'].value);
          e.target['password'].value = '';
          e.target['rePassword'].value = '';
          e.target['first_name'].value = '';

          e.target['email'].value = '';
          // e.target['role'].value = '';
          document.getElementById("closeBtn").click();

        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          // console.log("error ", errorMessage)
          alert("error ", errorMessage)
          document.getElementById("form").style.opacity = "1";
          setLoading(false)
          // ..
        });
    }
    else {
      alert("Password didnt match")
      document.getElementById("form").style.opacity = "1";
      setLoading(false)
      setPasserror(true);
    }

    // console.log("Clicked ", e.target['password'].value, " ", e.target["rePassword"].value)


    e.preventDefault();

  }


  const GoogleAuthentication = () => {
    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const UserInfo = {
          Email: user.email,
          First_Name: user.displayName,
          isAdmin: false,
          isSeller: false
        }
        setLoggedInUser(UserInfo);
        // console.log("UserInfo ", UserInfo);
        localStorage.setItem('user', JSON.stringify(UserInfo));

        history.replace(from);

        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        alert(errorMessage)
        // ...
      });
  }

  // Login
  const handleLoginForm = (e) => {
    document.getElementById("form").style.opacity = ".4";
    setLoading(true);
    // console.log("Clicked")
    const email = e.target['email'].value;
    const password = e.target['password'].value;

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        // console.log(userCredential);
        var user = userCredential.user;
        // console.log("Signed IN", user);
        const url = `https://still-temple-26727.herokuapp.com/getUser/${email}`

        fetch(url, {
          method: 'GET'
        })
          .then(res => res.json())
          .then(data => {
            // console.log("logged in ", data)
            setLoggedInUser(data[0]);
            localStorage.setItem('user', JSON.stringify(data[0]));
            document.getElementById("form").style.opacity = "1";
            setLoading(false)
            history.replace(from);
          }

          )
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        document.getElementById("form").style.opacity = "1";
            setLoading(false)
      });
   
    e.preventDefault();
  }
  return (
    <div>

      {

        loading && <div class="spinner-border text-info" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      }
      <div className="mt-4">

        <form className={classes.root} id="form" onSubmit={handleLoginForm} noValidate autoComplete="on">
          <h3 className="text-center mx-auto">Login</h3>
          {
            suggestion != '' ? <TextField
              id="standard-basic"
              required
              value={suggestion}
              disabled
              name="email"
            /> : <TextField
              id="standard-basic"
              label="Email"
              required
              name="email"
            />
          }
          <br />
          <TextField
            id="standard-basic"
            label="Password"
            type="password"
            required
            name="password"
          /><br />

          <Button className={classes.btn} type="submit" variant="outlined">Login</Button><br />
          <Link to="#">Forget Password?</Link><Link id="closeBtn" data-bs-toggle="modal" data-bs-target="#exampleModal" >Dont Have An Account? Create One</Link>

        </form> </div>


      <Button variant="contained" className={classes.btnGoogle} color="primary" onClick={GoogleAuthentication}> <FontAwesomeIcon icon={faGoogle} color="white" size="2x" style={{ marginRight: "13px" }} ></FontAwesomeIcon>Login with Google</Button>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-body">
              {

                loading && <div class="spinner-border text-info" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              }
              <h3>Registration</h3>
              <form onSubmit={handleSignUp}>
                <TextField className={classes.formInout}
                  label="Name"
                  type="text"
                  name="first_name"
                  required
                /><br />

                <TextField className={classes.formInout}
                  required
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="example@xyz.com"
                /><br />
                <Tooltip title="Password should be at least 6 characters">
                  <TextField className={classes.formInout}
                    label="Enter Password"
                    placeholder="Set Password"
                    type="password"
                    name="password"
                  /></Tooltip>
                <br />
                <Tooltip title="Password should be at least 6 characters">
                  <TextField className={classes.formInout}
                    label="Re-Enter Password"
                    placeholder="Repeat Password"
                    name="rePassword"
                    type="password"
                    error={Passerror}
                  /></Tooltip><br />

                <Button className={classes.btn2}
                  variant="contained"
                  color="secondary"
                  type="submit"
                  error={Passerror}
                >Sign Up</Button>
              </form>

            </div>
            <div class="modal-footer">
              <button type="button" id="closeBtn" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
};

export default Login;