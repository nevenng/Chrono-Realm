import React from "react";
import { useHistory } from "react-router-dom";
import { createNewOrder } from "../axios-services";

const CheckoutButton = (props) => {
  const { user, product } = props;
  const history = useHistory();

  const handleCheckout = async () => {
    try {
      for (let i = 0; i < product.length; i++) {
        const currentProduct = product[i];
        console.log("currentProduct",currentProduct);
        
        const orderItems = {
          orderProdId: currentProduct.cartprodid,
          orderProdModelName: currentProduct.cartprodname,
          orderQty: currentProduct.cartquantity,
          userIdOrder: user.id,
          orderProdImg: currentProduct.prodimg,
          orderProdPrice: currentProduct.carttotalprice,
        };

        const userIdOrder = user.id;

        const newOrder = await createNewOrder(orderItems,userIdOrder);
        console.log("New Order:", newOrder);
      }

      history.push("/confirmation");
    } catch (error) {
      console.error("Error creating orders:", error);
    }
  };

  return (
    <button className="checkout-button" onClick={handleCheckout}>
      Checkout
    </button>
  );
};
  export default CheckoutButton;
