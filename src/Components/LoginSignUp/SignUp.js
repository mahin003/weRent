import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Tooltip } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";


const useStyles = makeStyles((theme) => ({
    formControl: {
        width: "80%",
        border: "10px solid red"
    },
    formInout: {
        width: "60ch",
        margin: theme.spacing(1),

    },
    btn: {
        width: '17ch',
        margin: theme.spacing(2)
    },
}))


const SignUp = () => {
    
    const [Passerror, setPasserror] = useState(false);
    const classes = useStyles();

    const handleSignUp = (e) => {
        const Email = e.target['email'].value;
        // const password=e.target['password'].value;
        const FirstName = e.target['first_name'].value;
        const LastName = e.target['last_name'].value;
        const Address = e.target['address'].value;
        // const Role = e.target['role'].value;
    
        if (e.target['password'].value == e.target['rePassword'].value) {
            console.log("matched")
            const password = e.target['password'].value;
            firebase.auth().createUserWithEmailAndPassword(Email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    console.log(user)
                    //Add To DB
                    const UserInfo = {
                        First_Name: FirstName,
                        Last_Name: LastName,
                        Email: Email,
                        Address: Address,
                        isAdmin: false,
                        isSeller:true
                    }
    
                    const url = `https://still-temple-26727.herokuapp.com/addUsers`;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(UserInfo)
                    }).then(res => console.log('server user', res))
                    alert("Nre User Registered")
    
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("error ", errorMessage)
                    alert("error ",errorMessage)
                    // ..
                });

                e.target['password'].value = '';
                e.target['rePassword'].value = '';
                e.target['first_name'].value = '';
                e.target['last_name'].value = '';
                e.target['email'].value = '';
                // e.target['role'].value = '';
                e.target['address'].value = '';
    
        }
        else{
            alert("Password didnt match")
            setPasserror(true);
        }
    
        console.log("Clicked ", e.target['password'].value, " ", e.target["rePassword"].value)
    
       
        e.preventDefault();
    
    }

    
    return (
        <div>
            <h1>Registration Form</h1>
            <form onSubmit={handleSignUp}>
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
                    name="email"
                    placeholder="example@xyz.com"
                /><br />


                {/* <FormControl className={classes.formInout}>
                    <InputLabel >Select Role</InputLabel>

                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        name="role"
                        required
                    >
                        <MenuItem value="visitor">Visitor</MenuItem>
                        <MenuItem value="seller">Seller</MenuItem>

                    </Select>
                </FormControl><br /> */}
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
                
                <Button className={classes.btn}
                    variant="contained"
                    color="secondary"
                    type="submit"
                    error={Passerror}
                >Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUp;