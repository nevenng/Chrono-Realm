import React from "react";

const MyItems = () => {
    // Need to pass in { token, users } 
    // Need to pass in { prodBrand, prodModelName } 

    // const [myItems, setMyItems] = useState([]);
    // My orders could live on the App level to pass thru? 

    // const handleMyItems = (async (user) => {
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
    //         const results = await handleMyItems();
    //         setMyOrders(results);
    //     }
    //     getMyOrders();
    // });

    // need to map thru data 

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
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}


export default MyItems;