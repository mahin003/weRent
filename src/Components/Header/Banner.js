import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import "./Header.css"

const Banner = (props) => {
  //  console.log("child ",props)
    return (
        <div className="banner">
          
         <div className="container " >
           <div className="row">
             <div className="col-9 mx-auto " style={{ marginTop:"10%",}}>
               <input className="search_input" id="Search" onChange={props.fun2}  type="text" /><button onClick={props.fun2}><FontAwesomeIcon size="" icon={faSearch} id="searchClicked" onClick={props.fun2}></FontAwesomeIcon></button>
              </div>
           </div>
         </div>
        </div>
    );
};

export default Banner;