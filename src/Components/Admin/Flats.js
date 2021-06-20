import { Button } from '@material-ui/core';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Flats = () => {
    const [FlatList, setFlatList]= useState([]);
    const his = useHistory();
    useEffect(() =>{
        fetch("http://localhost:5000/addServices")
            .then(res => res.json())
            .then(data =>setFlatList(data))
    },[])
    return (
        <div style={{padding:"17px", margin:"20px" ,overflowX:"auto", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h3>Available Flats</h3>
            <table className="table">
               <tr> 
                    <th>Flat</th>
                    <th>Renter Name</th>
                    <th>Renter Email</th>
                    <th>Renter Number</th>
                    <th>Flat Title</th>
                    <th>Flat Address</th>
                    <th>Flat Status</th>
                    <th>Bed|Bath</th>
                    <th>Date Added</th>
                    <th>Price</th>
                    <th>See Details</th>
    
             </tr>
             {
                 FlatList.map(data=><tr>
                     <td><img style={{width:"100px",height:"100px"}} src={data.img_url[0]}/></td>
                     <td>{data.sellerName}</td>
                     <td>{data.sellerEmail}</td>
                     <td>{data.PhoneNumber}</td>
                     <td>{data.titile}</td>
                     <td>{data.ZipCode},{data.upazilla},{data.district},{data.division}</td>
                     <td>{data.status}</td>
                     <td>{data.NumberOfBed} | {data.NumberOfBath}</td>
                     <td>{data.Date}</td>
                     <td>{data.Price}</td>
                     <td> <Button variant="outlined" onClick={()=>his.push(`/description/${data._id}`)}>Details</Button> </td>

                 </tr>)
             }


            </table>
        </div>
    );
};

export default Flats;