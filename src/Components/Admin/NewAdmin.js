import React from 'react';
import firebaseConfig from '../../firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
const NewAdmin = () => {
    const adminLogin=(e)=>{
        e.preventDefault();
        const name= e.target["name"].value;
        const Email= e.target['Email'].value;
        const password= e.target['password'].value;
        // console.log(Email," ",password)
        firebase.auth().createUserWithEmailAndPassword(Email, password)
                .then((userCredential) => {
                    // Signed in 
                    var user = userCredential.user;
                    // console.log("registraion ",user)
                    //Add To DB
                    const UserInfo = {
                        First_Name: name,
                        Email: Email,
                        isAdmin: true
                    }
    
                    const url = `http://localhost:5000/addAdmin`;
                    fetch(url, {
                        method: "POST",
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify(UserInfo)
                    }).then(res => console.log('server admin', res))
    
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log("error ", errorMessage)
                    alert("error ",errorMessage)
                    // ..
                });
                //  console.log("Clicked")
        
    }
    return (
        <div>
            <h3>Add New Admin</h3>
            <form onSubmit={adminLogin}>
                <input type="text" name="name" placeholder="Enter Your name "/>
                <input type="email" name="Email" placeholder="email"/>
                <input type="password" name="password" placeholder="password"/>
                <input type="submit"/>
            </form>
        </div>
    );
};

export default NewAdmin;