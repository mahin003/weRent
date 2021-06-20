import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import firebase from "firebase/app";
import firebaseConfig from '../../firebase.config';
// import firebaseConfig from '../firebase.config';
import "firebase/auth";
import { UserContext } from '../../App';

import {
    useParams,
    Redirect,
    useLocation
} from "react-router-dom";

import './Description.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}





let preV = '';

const Description = () => {

    const loc = useLocation();
    const [LoggedInUser, setLoggedInUser] = useContext(UserContext);

    const [direct, setDirect] = useState(false);

    const { id } = useParams();
    const [description, setDescription] = useState([]);
    const [showImage, setShowImage] = useState([]);
    const [pending, setPending] = useState([{ img_url: '' }]);

    useEffect(() => {
        fetch(`http://localhost:5000/description/${id}`, {
            method: 'GET',
        }).then(res => res.json())
            .then(data => {
                // console.log("data ", data)
                setDescription(data[0])
                setPending(data[0].img_url)
                setShowImage(data[0].img_url[0])
            }
            )
    }, [])
  
    const provider = new firebase.auth.GoogleAuthProvider();  
    const GoogleAuthentication=()=>{
        firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        var user = result.user;
        const UserInfo = {
          Email: user.email,
          First_Name: user.displayName,
          isAdmin:false,
          isSeller:false
        }
       setLoggedInUser(UserInfo);
    //    console.log("UserInfo ", UserInfo);
       localStorage.setItem('user', JSON.stringify(UserInfo));
       document.getElementById("closeBtn").click();
          
    //   history.replace(from);
        
        // ...
      }).catch((error) => {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
      });
    }

    if (showImage != null) {
        preV = document.getElementById(showImage);
        // document.getElementById(showImage).style.opacity="1";
    }
    const PendingToMain = (glry) => {

        if (preV == '') {
            preV = document.getElementById(glry);
            preV.style.opacity = "1";
            preV.style.border = "3px solid red";
        } else {
            preV.style.opacity = "0.6";
            preV.style.border = "2px solid rgb(121, 18, 4)";
            preV = document.getElementById(glry);
            preV.style.opacity = "1";
            preV.style.border = "3px solid red";
        }
        // console.log(document.getElementById(glry))
        // .style.opacity = "1";
        setShowImage(glry)
        // console.log("pending Clicked ", glry)
    }




    // console.log("param id", id)
    return (
        <div className="DesContainer">
            <div className="InfoPostAndFlat">
                <div className="TitleAddressForSale">
                    <div className="TitleAddress"><h2>{description.titile}</h2>
                        <p>{description.upazilla},{description.district},{description.division}</p>
                    </div>
                    <div className="ForSale">
                        <p><span>For Rent </span>  TK. {description.Price}</p>
                    </div>
                </div>
                <div>
                    <div className="BasicNav">
                        <a href="#ImageGallery">Image</a>
                        <a href="#BasicInfo">Basic Info</a>
                        <a href="#description">Description</a>
                    </div>

                    <section className="ImageGallery" id="ImageGallery">
                        <div className="ViewImage">
                            <img src={showImage} />
                        </div>
                        <div className="PendingImage" >

                            {
                                pending.map(glry => <img id={glry} onClick={() => PendingToMain(glry)} src={glry} />)
                            }


                        </div>
                    </section>

                    <section className="BasicInfo" id="BasicInfo">
                        <h3>Basic Info</h3>
                        <ul>
                            <li>Status : {description.status}</li>
                            <li>Area : {description.AreaMeasureMent} sq. feet</li>
                            <li>Bedroom : {description.NumberOfBed}</li>
                            <li>kitchen : {description.NumberOfKitchen}</li>
                            <li>Balcony : {description.NumberOfBalcony}</li>
                            <li>Diningroom : {description.NumberOfDine}</li>

                        </ul>
                    </section>
                    <section className="description" id="description">
                        <h2>Short Description</h2>
                        <p>{description.details}</p>
                    </section>
                </div>
            </div>
            <div className="postedBy">
                <h4>Posted By</h4>
                {
                    LoggedInUser != null && LoggedInUser.Email && !direct ? <div>
                        <h5>Name : {description.sellerName}</h5>
                        <p>Address: {description.sellerEmail}</p>
                        <p>Number : {description.PhoneNumber}</p>
                    </div> : <div>
                        <p>to see the details you have to Login first</p>

                        {/* <Button onClick={()=>setDirect(true)} variant="outlined" color="secondary" >Login</Button> */}
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Log In
                        </button>
                    </div>
                } 
                {
                     <p>Added On: {description.Date}</p>
                }
                 
                {
                    direct && <div >
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: loc }
                            }}
                        />
                    </div>
                }
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                       <Button variant="contained" color="primary" onClick={GoogleAuthentication} style={{marginTop:"30px",marginBottom:"10px"}}><FontAwesomeIcon icon={faGoogle} color="white" size="2x" style={{marginRight:"13px"}} ></FontAwesomeIcon>  Login with Google</Button>
                       
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

export default Description;