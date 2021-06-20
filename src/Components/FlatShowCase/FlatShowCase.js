import React from 'react';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollyFlatbed, faExpandArrowsAlt, faShower } from '@fortawesome/free-solid-svg-icons';
import KingBedTwoToneIcon from '@material-ui/icons/KingBedTwoTone';
import CameraAltIcon from '@material-ui/icons/CameraAlt';


import "./FlatShowCase.css"
const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
  });
const FlatShowCase = (props) => {
    let history= useHistory();

    const handleClickOnCard=(id)=>{
        // console.log("clicked ",id)
        history.push(`/description/${id}`)
    }

    const classes = useStyles();
    // console.log("props ", props)
    return (
        <div 
        className="GalleryCard"  onClick={()=>handleClickOnCard(props.FlatInfo._id)}>
            <div className="Image">
                <img style={{width:"100%",height:"200px"}} src={props.FlatInfo.img_url[0]}/>
                <div><div className="imgelen"><CameraAltIcon style={{marginTop:"auto",marginBottom:"auto" ,marginLeft:"10px"}} ></CameraAltIcon><p style={{marginTop:"auto",marginBottom:"auto"}}>{props.FlatInfo.img_url.length}</p></div></div>          
            </div>
            <div className="basicInfo">
                <h3>{props.FlatInfo.titile}</h3>
                <p>{props.FlatInfo.upazilla}, {props.FlatInfo.district}, {props.FlatInfo.division}<br/> {props.FlatInfo.ZipCode}<span style={{fontSize:"12px"}}>Zip/Postal Code</span></p>
                <p>TK. {props.FlatInfo.Price}</p>
            </div>
            <div className="IconsWithInfo">
                <div className="sqft">
                <FontAwesomeIcon icon={faExpandArrowsAlt}></FontAwesomeIcon>
                    <p>{props.FlatInfo.AreaMeasureMent} sq ft</p>
                </div>
                <div className="bed">
                <KingBedTwoToneIcon style={{}}></KingBedTwoToneIcon>
                <p>{props.FlatInfo.NumberOfBed} Beds</p>
                </div>
                <div className="bath">
                <FontAwesomeIcon icon={faShower}></FontAwesomeIcon>
                    <p>{props.FlatInfo.NumberOfBath} Baths</p>
                </div>

            </div>
        </div>
    );
};

export default FlatShowCase;