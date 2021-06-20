import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import FlatShowCase from '../FlatShowCase/FlatShowCase';

import './Home.css'

const Home = (props) => {
   
    // console.log("Props ",props)
    const [result, setResult] = useState([]);
    
    const [load, setLoad] = useState(false);
    const [sort, setSort] = useState(0);

    
    const Ascending = () => {
        setSort(1);
        const sortedAs=[...props.data]
        sortedAs.sort((a, b) => {
             return a.Price - b.Price;
           })
        //    console.log("Soreted ", sortedAs)
        props.set(sortedAs)   

    }
    const Descending = () => {
        setSort(2);
        const sortedDs=[...props.data]
        sortedDs.sort((a, b) => {
             return b.Price - a.Price;
           })
        //    console.log("Soreted ", sortedDs)
        props.set(sortedDs)   
    }
   
   
    // useEffect(() => {
    //     console.log("ew pors  ", props.search, " ", props.data)
    //     if (sort == 1) {
    //        props.data.sort((a, b) => {
    //             return a.Price - b.Price;
    //         })
    //         console.log("lowest ", props.data)
    //     }
    //     else if(sort==2){
    //          props.data.sort((a, b) => {
    //             return b.Price - a.Price;
    //         })
    //          console.log("highest ", props.data)            
    //     }
       
    //     props.set((props.data))
    // },[sort])

  
   
    // if(result==''){
    //     console.log(" check if exist ", result)
    // }
    var Time;
    function myFunction() {
        console.log("timee")
        Time=setTimeout(function(){ alert("Hello"); }, 3000);
      }

     function myFunction2(){
        console.log("timee stop")
        clearTimeout(Time);
     }     

    return (
        <div>
            <div className="HomeBottomNav mt-3 mb-3"><Button size='small' color="secondary" onClick={() => Ascending()} variant="outlined" style={{ marginRight: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} >Lowest Price</Button> <Button size='small' onClick={() => Descending()} variant="outlined" style={{ marginRight: "20px", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)" }} color="secondary">Hightest Price</Button> </div>


            <div className="GalleryDiv">
                {

                   props.data!='' ? props.data.filter(x=>x.status=="Open").map(info => <FlatShowCase  FlatInfo={info}></FlatShowCase>)  : <div  style={{ width: "100%" }}> <div class="spinner-border" role="status">
                        <span class="sr-only">Loading...</span>
                    </div> </div>
                }
            </div>
            


        </div>
    );
};

export default Home;