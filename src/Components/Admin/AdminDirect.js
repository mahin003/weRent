import React from 'react';
import { Link, Redirect } from 'react-router-dom';
const AdminDirect = () => {
    return (
        <div>
             <Redirect to='/admin/flats'/>
        </div>
    );
};

export default AdminDirect;