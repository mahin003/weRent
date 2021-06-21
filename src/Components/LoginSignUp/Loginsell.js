import React from 'react';
import TextField from '@material-ui/core/TextField';
import firebase from "firebase/app";
import { useContext, useEffect, useState } from 'react';
import firebaseConfig from '../../firebase.config';
// import firebaseConfig from '../firebase.config';
import "firebase/auth";
import { UserContext } from '../../App';
import { Button, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./Login.css"

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '35ch',
        },
    },
    btn: {
        width: '17ch'
    },
    btnGoogle: {
        marginTop: "88px"

    },
    formControl: {
        width: "80%"
    },
    formInout: {
        width: "90%",
        margin: theme.spacing(1),

    },
    btn2: {
        width: '24ch',
        margin: theme.spacing(2)
    },
}));



const Loginsell = () => {

    const history = useHistory();
    const classes = useStyles();
    const [Passerror, setPasserror] = useState(false);
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);
    const location = useLocation();
    const [suggestion, setSuggestion]= useState('');
    const [loading, setLoading] = useState(false);

    

    const { from } = location.state || { from: { pathname: "/" } };
    // console.log("fro sell ", from)
    // Login
    const handleLoginForm = (e) => {
        e.preventDefault();
        setLoading(true);
        document.getElementById("form").style.opacity = ".4";
        // console.log("Clicked")
        const email = e.target['email'].value;
        const password = e.target['password'].value;

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                // console.log(userCredential);
                var user = userCredential.user;
                // console.log("Signed IN");

                const url = `https://still-temple-26727.herokuapp.com/getSeller/${email}`

                fetch(url, {
                    method: 'GET'
                })
                    .then(res => res.json())
                    .then(data => {
                        // console.log("logged in ", data)
                        setLoggedInUser(data[0]);
                        localStorage.setItem('user', JSON.stringify(data[0]));
                        document.getElementById("form").style.opacity = "1";
                        setLoading(false);
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

       
        // console.log("autoclicked")
     
       
    }


    const handleSignUp = (e) => {
        setLoading(true); 
        document.getElementById("regForm").style.opacity = ".5";
        const Email = e.target['emailS'].value;
        // const password=e.target['password'].value;
        const FirstName = e.target['first_name'].value;
        const LastName = e.target['last_name'].value;
        const Address = e.target['address'].value;
        // const Role = e.target['role'].value;

        if (e.target['password'].value == e.target['rePassword'].value) {
            // console.log("matched")
            const password = e.target['password'].value;
            firebase.auth().createUserWithEmailAndPassword(Email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // console.log(user)
                    //Add To DB
                    const UserInfo = {
                        First_Name: FirstName,
                        Last_Name: LastName,
                        Email: Email,
                        Address: Address,
                        isAdmin: false,
                        isSeller: true
                    }

                    const url = `https://still-temple-26727.herokuapp.com/addUsers`;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(UserInfo)
                    }).then(res => console.log('server user', res))
                    setLoading(false); 
                    document.getElementById("regForm").style.opacity = "1";
        
                    alert("New User Registered")
                    setSuggestion(e.target['emailS'].value);
                    e.target['password'].value = '';
                    e.target['rePassword'].value = '';
                    e.target['first_name'].value = '';
                    e.target['last_name'].value = '';
                    e.target['emailS'].value = '';
                    // e.target['role'].value = '';
                    e.target['address'].value = '';
                    document.getElementById("closeBtn").click();
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("error ", errorMessage)
                    alert("error ", errorMessage)
                    document.getElementById("form").style.opacity = "1";
                    setLoading(false)
                    // ..
                });         

        }
        else {
            alert("Password didnt match")
            setPasserror(true);
            document.getElementById("form").style.opacity = "1";
            setLoading(false)
        }

        console.log("Clicked ", e.target['password'].value, " ", e.target["rePassword"].value)


        e.preventDefault();

    }

 
    return (
        <div className="d-flex border p-1 mx-auto" id="container" style={{height:"80vh", width:"90%", boxShadow:"0 5px 8px 0 rgba(0, 0, 0, 0.1), 0 8px 20px 0 rgba(0, 0, 0, 0.1)"}}>
            <div className="div1" >
                <h1>Become A Seller</h1>
            </div>
            <div className="div2">
                <h3>Log In with Seller Account</h3>
               {
                   loading && <div class="spinner-border text-info" role="status">
                   <span class="sr-only">Loading...</span>
                 </div>
               }
                <form className={classes.root} id ="form" onSubmit={handleLoginForm} noValidate autoComplete="on">
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
                </form>
                <div style={{marginTop:"30px"}}><Link to="#">Forget Password?</Link><button class="btn btn-outline-primary ml-2" data-bs-toggle="modal" data-bs-target="#exampleModal" >Create A Seller Account</button></div>


                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-body">
                                <h3>Registration</h3>
                                {
                                    loading && <div class="spinner-border text-info" role="status">
                                        <span class="sr-only">Loading...</span>
                                    </div>
                                }
                                <form id="regForm" onSubmit={handleSignUp}>
                                    <TextField className={classes.formInout}
                                        label="First Name"
                                        type="text"
                                        name="first_name"
                                        required
                                    /><br />
                                    <TextField className={classes.formInout}
                                        required
                                        name="last_name"
                                        label="Last Name"
                                        type="text"
                                    /><br />
                                    <TextField className={classes.formInout}
                                        required
                                        label="Email"
                                        type="email"
                                        name="emailS"
                                        placeholder="example@xyz.com"
                                    /><br />
                                    <TextField className={classes.formInout}
                                        required
                                        name="address"
                                        type="text"
                                        label="Address"
                                        placeholder="District,Division"

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
        </div>
    );
};

export default Loginsell;