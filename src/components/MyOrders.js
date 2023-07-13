import React from "react";
import { MyItems } from "../components"

const MyOrders = ({user, userToken}) => {

    // const handleMyOrders = (async (user) => {
    //     try {
    //         const response = await fetch(`${BASE_URL}/api/users/${user}/orders`, {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${token}`
    //             },
    //         });
    //         const result = await response.json();
    //         return result;
    //     } catch (err) {
    //         console.error(err);
    //         throw err;
    //     }
    // });

    // useEffect(() => {
    //     const getMyOrders = async () => {
    //         const results = await handleMyOrders();
    //         setMyOrders(results);
    //     }
    //     getMyOrders();
    // });

    // need to map thru data 

    return (
        <>
            <div className="myOrders-container">
                <h3>Your Orders</h3>
                {/* <MyItems user = {user} userToken = {userToken} /> */}
               
            </div>
        </>
    )
}


export default MyOrders;