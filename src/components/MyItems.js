import React, { useEffect, useState } from "react";
import { fetchOrderByOrderUser } from "../axios-services";

const MyItems = () => {
    // { token, orderId }
    const [myOrder, setMyOrder] = useState(true);
    
    // useEffect(() => {
    //     const getMyOrder = async () => {
    //         try {
    //             const order = await fetchOrderByOrderUser(orderId);
    //             console.log(orderId)
    //             setMyOrder(order);
    //         } catch (error) {
    //             console.error("Error fetching order:", error);
    //         }
    //     };
        
    //     if (userToken && orderId) {
    //         getMyOrder();
    //     }
    // }, [userToken, orderId]);

    return (
        <>
            <div className="order-cards">
                <div className="order-table">
                    <table>
                        <thead>
                            <tr className="order-column">
                                <th>Product</th>
                                <th>Order Info</th>
                                <th>Status</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img className="orders-img" src="https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dw3b08217b/images/products/28000088_fr.jpg?sw=512&sh=640&q=85" alt="Product Image" />
                                </td>
                                <td>
                                    <div className="order-info">
                                        <p>Order Date: 06/27/23</p>
                                        <p>Order Number: xxxxxx</p>
                                        <p>Model: "prodModelName"</p>
                                        <p>Qty: 1</p>
                                    </div>
                                </td>
                                <td>
                                    <p className="align-top">Pending</p>
                                </td>
                                <td>
                                    <p className="align-top">$20.00</p>
                                </td>
                            </tr>
                            {/* {myOrder ? (
                                <tr>
                                    <td>
                                        <img className="orders-img" src={myOrder.orderprodid} alt="Product Image" />
                                    </td>
                                    <td>
                                        <div className="order-info">
                                            <p>Order Date: {myOrder.orderdate}</p>
                                            <p>Order Number: {myOrder.orderid}</p>
                                            <p>Model: {myOrder.orderprodmodelname}</p>
                                            <p>Qty: {myOrder.orderqty}</p>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="align-top">{myOrder.orderstatus}</p>
                                    </td>
                                    <td>
                                        <p className="align-top">${myOrder.ordertotalprice}</p>
                                    </td>
                                </tr>
                            ) : (
                                <tr>
                                    <td colSpan="4">No order details available</td>
                                </tr>
                            )} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default MyItems;
