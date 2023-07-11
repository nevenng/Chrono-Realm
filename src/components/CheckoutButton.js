import React from "react";
import { useHistory } from "react-router-dom";
import { createNewOrder } from "../axios-services";

const CheckoutButton = (props) => {
    const { user, product } = props;
    const history = useHistory();

    // const [firstIdx] = product;
    console.log(user.id)

    const handleCheckout = async () => {
      const orderItems = {
        orderProdId: product.cartprodid,
        orderProdModelName: product.cartprodname,
        orderQty: product.cartquantity,
        userIdOrder: user.id,
        orderProdImg: product.prodimg,
        orderProdPrice: product.prodprice,
      };

      const userIdOrder = {
        userIdOrder: user.id, 
      }

      try {
        const newOrder = await createNewOrder(payload);
        console.log("New Order:", newOrder);
  
        history.push("/confirmation");
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };
  
    return (
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    );
  };
  
  export default CheckoutButton;
