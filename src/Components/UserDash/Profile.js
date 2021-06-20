import React from 'react';

import "./UserDash.css"
const profile = (props) => {

//    console.log("profile ", props)
    return (
        <div>
            <div className="UserProfile mx-auto" >
                <h3>Welcome  {props.UserInfo.First_Name} !!</h3>
                <p>Email : {props.UserInfo.Email}</p>
            </div>

        </div>
    );
};

export default profile;