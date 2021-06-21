
import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { useEffect } from 'react';
const AdminList = () => {
   
    const [UserAdmin, setUserAdmin] =useState([]);
    
    useEffect(()=>{
        fetch("https://still-temple-26727.herokuapp.com/getAdminList")
            .then(res => res.json())
            .then(data =>{
            setUserAdmin(data)} )
    },[])
    return (
        <div style={{padding:"17px", margin:"20px" ,overflowX:"auto",boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
            <h2>Admins</h2>
            <table className="table">
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
                {
                   UserAdmin.map(data=><tr>
                        <td>{data.First_Name} {data.Last_Name}</td>
                        <td>{data.Email}</td>
                        <td><Button>Delete</Button> </td>
                    </tr>)
                }
            </table>
        </div>
    );
};

export default AdminList;