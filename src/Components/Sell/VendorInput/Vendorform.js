import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, InputLabel, MenuItem, Typography } from '@material-ui/core';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import './VendorInput.css'
import axios from 'axios';
import { useContext } from 'react';
import { UserContext } from '../../../App';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
    fullDiv: {
        marginBottom: 40,
        paddingTop: 20
    },
    field: {
        margin: 3,
        border:6,
        width: "75%",
        color:'red',
        fontWeight:"bold"
    },
    fieldDis: {
        margin: 3,
        border:6,
        width: "75%",
        color:'black',
        fontWeight:"bold"
    },
    ButtonDesign: {
        margin: 2,
        border: "2px solid red"
    },
    area: {
        margin: 5,
        width: "70%",
        fontWeight:"bold",
        color : "black"
    },
    rootBasicInfo: {
        '& > *': {
            margin: 5,
            // border: "2px solid red"
        },
        display: 'flex',
        justifyContent: 'space-between',
        width: "70%",
        marginLeft: 'auto',
        marginRight: 'auto',
        // border: "2px solid blue",
        margin: 10,
        fontWeight:"bold",
        color : "black"
    },
    label: {
        paddingTop: 20,
        textAlign: "left",
        color : "black"
    },
    numberInput: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"

        },
        width: "60%",
        fontWeight:"bold",
        color : "black"
    },
    areaZipCode: {
        "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
            display: "none"
        },
        margin: 5,
        width: "60%",
        marginBottom: 10,
        color : "black"
    },
    rootExtraInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        width: "50%",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 15,
        color : "black"
        // border: "2px solid green"
    }

})
const Vendorform = () => {
    const [LoggedInUser, setLoggedInUser]= useContext(UserContext);
     
    const history = useHistory();
    const classes = useStyles();
    const [DivisionList, setDivisionList] = useState([]);
    const [Division, setDivision] = useState([]);

    const [DistrictList, setDistrictList] = useState([]);
    const [District, setDistrict] = useState([]);

    const [UpazillaList, setUpazillaList] = useState([]);
    const [Upazilla, setUpazilla] = useState([]);
    const [loading, setLoading] = useState(false);

    //For Images
    const [selectedImage, setSelectedImage] = useState([]);

    //get All deivisionss
    useEffect(() => {
        const url = "https://bdapis.herokuapp.com/api/v1.1/divisions";
        fetch(url)
            .then(result => result.json())
            .then(data => setDivisionList(data.data))
    }, [])


    const handleChangeDivision = (event) => {
        setDivision(event.target.value)
        // console.log("Upazilla ", event.target.value)

    }

    //getAllDistrictFor
    useEffect(() => {
        let district = Division
        // console.log("districtsDIvision ", district)
        let url = '';
        if (district != '') {
            url = `https://bdapis.herokuapp.com/api/v1.1/division/${district}`;
        }
        else {
            url = `https://bdapis.herokuapp.com/api/v1.1/districts`;
        }
        // console.log(url)
        fetch(url)
            .then(result => result.json())
            .then(data => setDistrictList(data.data))

    }, [Division])


    const handleChangeDistrict = (event) => {
        setDistrict(event.target.value)
        // console.log("District ", event.target.value)

    }

    //getUpazilla
    useEffect(() => {
        let districtName = District
        // console.log('disForUpo ', District)
        if (districtName != '') {
            // console.log((DistrictList.filter(data => data.district == districtName)))
            if (DistrictList.filter(data => data.district == districtName)[0].upazilla) {
                setUpazillaList(DistrictList.filter(data => data.district == districtName)[0].upazilla)
                // console.log("ok")
            }

        }

    }, [District])

    const handleChangeUpazilla = (event) => {
        setUpazilla(event.target.value)
        // console.log("District ", event.target.value)

    }

    //ZipCodeChange
    const handleChangeZipCode = () => {

    }

    ///FORM HandleInputForm
    const HandleInputForm = (event) => {
        setLoading(true)
        document.getElementById("form").style.opacity=".5";
        var date= new Date();
        //console.log(" get date ", date.toDateString())
        const sellProductData={
            sellerName: event.target["postedBy"].value,
            sellerEmail: event.target["posterEmail"].value,
            titile: event.target["title"].value,
            division: event.target["division"].value,
            district: event.target["district"].value,
            upazilla: event.target["upazilla"].value,
            ZipCode: event.target["ZipCode"].value,
            details: event.target["Details"].value,
            NumberOfBed: event.target["bed"].value,
            NumberOfKitchen: event.target["kitchen"].value,
            NumberOfBath: event.target["bath"].value,
            NumberOfBalcony:  event.target["balcony"].value,
            NumberOfDine: event.target["dine"].value,
            AreaMeasureMent:  event.target["measureMent"].value,
            PhoneNumber: event.target["mobile"].value,
            Price: event.target["price"].value,
            status: "Open",
            Date: date.toDateString(),
            img_url: selectedImage

         }

    //    console.log("Final Result ",sellProductData);      
       const url = `http://localhost:5000/addServices`;
         fetch(url,{
             method: "POST",
             headers:{
                 'content-type': 'application/json'
             },
             body:JSON.stringify(sellProductData)
         }).then(res=> console.log(''))

         setLoading(false)
         document.getElementById("form").style.opacity="1";
         alert("data addded")

         history.replace("userdesh/profile/sell/history");
        event.preventDefault();
        
    }

    ////handleImageChange
    const handleImageChange=(e)=>{
        const imageData = new FormData();
        imageData.set('key', '0cb6237bab422aa350bd5f647c9cb6c7');
        // console.log(e.target.files)
        let fileArray;
        // console.log("file ",imageData)
        imageData.append('image',e.target.files)
        if(e.target.files){
           Array.from(e.target.files).map((file)=>{
               imageData.append('image',file)
            //    console.log("image ", file)
            });
        }
        // setSelectedImage((prevImages) => prevImages.concat(imageData));
      
        // console.log("filetyp ",typeof(imageData))
        axios.post('https://api.imgbb.com/1/upload', imageData).then(function (response) {
            // var response =response.data.data;
            setSelectedImage((prevImages) => prevImages.concat(response.data.data.display_url));
            // console.log("response ",response.data.data)
        }).catch(function (err) {
            // console.log(err);
            alert(err);
        })

    }
     
    //DeleteGalleryPhoto
    const DeleteGalleryPhoto=(photo)=>{
        //   console.log("pht ",photo)        
        //   setSelectedImage(selectedImage.filter(item => item!== photo))
    }

    //Show Mini Image gallery
    const renderPhotos = (source) => {
        // console.log("source: ", source);
        return source.map((photo) => {
          return<div className="GalleryImage" style={{width:"210px", height:"210x",padding:"1px"}}><img src={photo} style={{width:"210px", height:"210px"}} alt="" key={photo} /><Button color="secondary"  onClick={()=>DeleteGalleryPhoto(photo.delete_url)}>Delete</Button> </div>;
        });
      };


    return (
        <div className={classes.fullDiv}>
            <h3>{District}</h3>
            <h3>Add New Flat</h3>
            {
                   loading && <div class="spinner-border text-info" role="status">
                   <span class="sr-only">Loading...</span>
                 </div>
               }
            <form variant='outlined' id="form" onSubmit={HandleInputForm}>

                 <TextField className={classes.fieldDis}  name="postedBy" helperText="Seller Name" disabled   value={LoggedInUser.First_Name} placeholder={LoggedInUser.First_Name}/><br />
                 <TextField className={classes.fieldDis} name="posterEmail" helperText="Seller Email" disabled   value={LoggedInUser.Email} placeholder={LoggedInUser.Email} /><br />   
                <TextField className={classes.field} name="title" label="Title"  color="secondary" /><br />
                {/* jela,Bivag,upazilla */}
                <div>
                   <h5>Address</h5>
                    <TextField
                        className={classes.area}
                        id="division"
                        select
                        label="SELECT DIVISION"
                        helperText="Division"
                        name="division"
                        // //required
                        onChange={handleChangeDivision}
                    >
                        {DivisionList.map((option) => (
                            <MenuItem key={option.division} value={option.division}>
                                {option.division}
                            </MenuItem>
                        ))}
                    </TextField>


                    {/* District */}
                    <TextField
                        disabled={Division != '' ? false : true}

                        className={classes.area}
                        id="district"
                        name="district"
                        select
                        label="SELECT DISTRICT"
                        helperText="District"
                        //required
                        onChange={handleChangeDistrict}
                    >
                        {DistrictList.map((option) => (
                            <MenuItem key={option.district} value={option.district}>
                                {option.district}
                            </MenuItem>
                        ))}
                    </TextField>



                    {/* UPAZILLA */}

                    <TextField
                        className={classes.area}
                        disabled={District != '' ? false : true}
                        id="upazilla"
                        select
                        name="upazilla"
                        label="SELECT UPAZILLA"
                        helperText="Upazilla"
                        //required
                        onChange={handleChangeUpazilla}
                    >
                        {UpazillaList.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}

                    </TextField>

                    {/* Zip/PostalCode */}
                    <TextField className={classes.areaZipCode}
                        placeholder="XXXXXX"
                        id="outlined-basic"
                        label="Postal Code/Zip code"
                        //required
                        name="ZipCode"
                        onChange={handleChangeZipCode}
                        type="number"
                        
                        color="secondary" />

                </div>
                <TextField className={classes.field} id="outlined-basic" label="Details" variant="filled" color="secondary" name="Details" multiline rows={4} />
                <div>

                    <div className={classes.rootBasicInfo}>
                        <InputLabel className={classes.label}>Number Of Beds</InputLabel>
                        <TextField name="bed" autoComplete="off" className={classes.numberInput} placeholder="0" id="outlined-basic" label="Bed" type="number"  color="secondary" />
                    </div>
                    <div className={classes.rootBasicInfo}>
                        <InputLabel className={classes.label}>Number Of Kitchens</InputLabel>
                        <TextField name="kitchen" autoComplete="off" className={classes.numberInput} id="outlined-basic" placeholder="0" label="Kitchen" type="number"  color="secondary" />
                    </div>
                    <div className={classes.rootBasicInfo}>
                        <InputLabel className={classes.label}>Number Of Bathrooms</InputLabel>   <TextField name="bath" autoComplete="off" className={classes.numberInput} id="outlined-basic" label="Bathroom" placeholder="0" type="number"  color="secondary" />
                    </div>
                    <div className={classes.rootBasicInfo}>
                        <InputLabel className={classes.label}>Number Of Balconys</InputLabel><TextField name="balcony" autoComplete="off" className={classes.numberInput} id="outlined-basic" label="Balcony" placeholder="0" type="number"  color="secondary" />
                    </div>
                    <div className={classes.rootBasicInfo}>
                        <InputLabel className={classes.label}>Number Of Dine</InputLabel>
                        <TextField name="dine" autoComplete="off" className={classes.numberInput} id="outlined-basic" label="Dine"  color="secondary" placeholder="0" type="number" />
                    </div>

                </div>

                <div className={classes.rootExtraInfo}>
                    <InputLabel className={classes.label}>Area</InputLabel>
                    <TextField autoComplete="off" name="measureMent" id="outlined-basic" className={classes.numberInput} label="Sqfeet" type="text" step="0.01" color="secondary" placeholder="0" />
                </div>
                <div className={classes.rootExtraInfo}>
                    <InputLabel className={classes.label}>Phone Number</InputLabel>
                    <TextField autoComplete="off" name="mobile" id="outlined-basic" className={classes.numberInput} label="phone" type="number" color="secondary" placeholder="0XXXXXXXXXX" />
                </div>
                <div className={classes.rootExtraInfo}>
                    <InputLabel className={classes.label}>Price</InputLabel>
                    <TextField autoComplete="off" name="price" id="outlined-basic" className={classes.numberInput} label="price" type="number" color="secondary" placeholder="$" />
                </div>

                {/* Upload Photo */}
                <label htmlFor="upload-photo">
                    <input
                        style={{ display: 'none' }}
                        id="upload-photo"
                        name="upload-photo"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        // required

                    />
                    <Button color="secondary"  variant="contained" component="span">
                        Upload Photo
                   </Button>
                </label>
                {/* SHowImages */}
                <div className="GalleryHolder"  >
                     {renderPhotos(selectedImage)}
                </div>
                

                <div ClassName={classes.ButtonDesign}>
                    <Button endIcon={<KeyboardArrowRightIcon />} variant="contained" size="large" color="secondary" type="submit" >SUBMIT</Button>
                </div>

            </form>
        </div>
    );
};

export default Vendorform;