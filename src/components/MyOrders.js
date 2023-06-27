import React from "react";
import { Link } from "react-router-dom"

const MyOrders = () => {
    // Need to pass in { token, users } or Props

    // const [myOrders, setMyOrders] = useState([]);
    // My orders could live on the App level to pass thru? 

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
                <h3> Your Orders </h3>
                <p>Date: 06/27/23</p>
                <p>Order Number: xxxxxx </p>
                <p>Qty: </p>
                <p>Order Total: $19.99</p>
                <h4>Legacy Slim | 42MM</h4>
                <Link to="/products/:productId">
                    <img src="https://www.mvmt.com/dw/image/v2/BDKZ_PRD/on/demandware.static/-/Sites-mgi-master/default/dw3b08217b/images/products/28000088_fr.jpg?sw=512&sh=640&q=85"></img>
                </Link>
            </div>
        </>
    )
}


export default MyOrders;