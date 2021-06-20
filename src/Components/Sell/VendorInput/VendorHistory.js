import Button from '@material-ui/core/Button';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./VendorInput.css"
const VendorHistory = (props) => {
    const [History, setHistory] = useState([]);
    const [trigger, setTrigger] = useState([]);
    const his= useHistory();
    // console.log("history it is  ", props)
    
    // console.log(" trigger ", trigger)

    useEffect(() => {
        fetch(`http://localhost:5000/getUser/history/${props.UserInfo.Email}`, {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => {setHistory(data)
                //  setTrigger(data)
            }
                )
        // console.log("trigger ", trigger)
    }, [])

    const HandleStatus = (Id, event) => {
        console.log("clicked ", Id)
        const Status = event.target.value;

        const item = { Id, Status }
        console.log("item ", item, Status)

        fetch(`http://localhost:5000/product/update/${Id}`, {
            //  mode: 'no-cors',
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        })
            .then(res => res.json())
            .then(data=> console.log(" result ", data))
            const res=[...History]
            // res.map(x=>
            //     x._id==Id && x.status=Status; 
            // )

        var objIndex = res.findIndex((obj => obj._id == Id));

        console.log("Before update: ", res[objIndex])
        console.log(Status)
        res[objIndex].status = Status;
            setTrigger(res)
            


    }
    return (
        <div style={{overflowX:"auto", margin:"4px", paddingTop:"15px"}}>
            <h1>history</h1>
            <table className="table " style={{ color: 'black',boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
                <tr>
                    <th>Building Name</th>
                    <th>Date Added</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Action</th>
                    <th>Detials</th>
                </tr>

                {
                    History.map(data => <tr>
                        <td>{data.titile}</td>
                        <td>{data.Date}</td>
                        <td>{data.upazilla},{data.district}</td>
                        {
                        data.status == "Open" && <td> <button variant="contained" color="secondary" disabled>Open</button> <button onClick={(e) => HandleStatus(data._id, e)} value="Close" className="btn btn-outline-danger" name="btn">Close</button> </td> }
                        {
                        data.status == "Close" && <td><button onClick={(e) => HandleStatus(data._id, e)} type="button" className="btn btn-outline-success" value="Open">Open</button> <button variant="outlined" color="primary" disabled>Close</button></td>
                        }
                        <td><Button varient="outlined">Delete</Button> <Button varient="outlined">Edit</Button> </td>
                        <td><Button variant="outlined" color="secondary" onClick={()=>his.push(`/description/${data._id}`)} >Details</Button> </td>
                    </tr>
                    )
                }
            </table>
        </div>
    );
};

export default VendorHistory;