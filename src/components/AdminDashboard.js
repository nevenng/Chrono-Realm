import React, { useState } from 'react';
import { CreateProduct } from '../components'

const AdminDashboard = (props) => {
    const { user } = props;

    console.log(user)

    return (
        <>
            <div className='create-product-container'>
                <CreateProduct />
            </div>
        </>
    );
};

export default AdminDashboard;
