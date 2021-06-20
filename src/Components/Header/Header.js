import React from 'react';
import Banner from './Banner';
import Navbar from './Navbar/Navbar';

const Header = (props) => {
    // console.log("props 1 ")
    return (
        <div style={{height: '400px'}}>
            <Navbar></Navbar>
            <Banner fun2={props.fun}></Banner>
            
        </div>
    );
};

export default Header;