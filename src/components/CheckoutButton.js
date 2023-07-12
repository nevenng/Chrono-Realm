// import React from "react";
// import { useHistory } from "react-router-dom";
// import { createNewOrder, handleRemoveFromCart, fetchProductsCart } from "../axios-services";

// const CheckoutButton = (props) => {
//   const { user, product, setProducts, sessionId } = props;
//   const history = useHistory();

//   const handleCheckout = async () => {
//     try {
//       let orderItems;
//       if (product.length === 1) {
//         const item = product[0];
//         orderItems = [{
//           orderProdId: item.cartprodid,
//           orderProdModelName: item.cartprodname,
//           orderQty: item.cartquantity,
//           userIdOrder: user.id,
//           orderProdImg: item.prodimg,
//           orderProdPrice: item.carttotalprice,
//         }];
//       } else {
//         orderItems = product.map((item) => ({
//           orderProdId: item.cartprodid,
//           orderProdModelName: item.cartprodname,
//           orderQty: item.cartquantity,
//           userIdOrder: user.id,
//           orderProdImg: item.prodimg,
//           orderProdPrice: item.carttotalprice,
//         }));
//       }

//       const newOrder = await createNewOrder(orderItems, user.id);
//       console.log("New Order:", newOrder);

//       await handleRemoveFromCart(product.cartid, product.cartprodid);
//       const products = await fetchProductsCart(user?.id || null, sessionId);
//       setProducts(products);

//       history.push("/confirmation");
//     } catch (error) {
//       console.error("Error creating orders:", error);
//     }
//   };

//   return (
//     <button className="checkout-button" onClick={handleCheckout}>
//       Checkout
//     </button>
//   );
// };

// export default CheckoutButton;

// import React from "react";
// import { useHistory } from "react-router-dom";
// import { createNewOrder, handleRemoveFromCart, fetchProductsCart } from "../axios-services";

// const CheckoutButton = (props) => {
//   const { user, product, setProducts, sessionId } = props;
//   const history = useHistory();

//   const handleCheckout = async () => {
//     try {
//       let orderItems;
//       if (product.length === 1) {
//         const item = product[0];
//         orderItems = [{
//           orderProdId: item.cartprodid,
//           orderProdModelName: item.cartprodname,
//           orderQty: item.cartquantity,
//           userIdOrder: user.id,
//           orderProdImg: item.prodimg,
//           orderProdPrice: item.carttotalprice,
//         }];
//       } else {
//         orderItems = product.map((item) => ({
//           orderProdId: item.cartprodid,
//           orderProdModelName: item.cartprodname,
//           orderQty: item.cartquantity,
//           userIdOrder: user.id,
//           orderProdImg: item.prodimg,
//           orderProdPrice: item.carttotalprice,
//         }));
//       }

//       const newOrder = await createNewOrder(orderItems, user.id);
//       console.log("New Order:", newOrder);

//       await handleRemoveFromCart(user.cartid, product);

//       // Fetch the updated cart data after removing items
//       const updatedProducts = await fetchProductsCart(user.id, sessionId);
//       setProducts(updatedProducts);
//       console.log(updatedProducts);

//       history.push("/confirmation");
//     } catch (error) {
//       console.error("Error creating orders:", error);
//     }
//   };

//   return (
//     <button className="checkout-button" onClick={handleCheckout}>
//       Checkout
//     </button>
//   );
// };

// export default CheckoutButton;


import React from "react";
import { useHistory } from "react-router-dom";
import { createNewOrder, handleRemoveFromCart, fetchProductsCart } from "../axios-services";

const CheckoutButton = (props) => {
  const { user, product, setProducts, sessionId } = props;
  const history = useHistory();

  const handleCheckout = async () => {
    try {
      let orderItems;
      if (product.length === 1) {
        const item = product[0];
        orderItems = [{
          orderProdId: item.cartprodid,
          orderProdModelName: item.cartprodname,
          orderQty: item.cartquantity,
          userIdOrder: user.id,
          orderProdImg: item.prodimg,
          orderProdPrice: item.carttotalprice,
        }];
      } else {
        orderItems = product.map((item) => ({
          orderProdId: item.cartprodid,
          orderProdModelName: item.cartprodname,
          orderQty: item.cartquantity,
          userIdOrder: user.id,
          orderProdImg: item.prodimg,
          orderProdPrice: item.carttotalprice,
        }));
      }

      const newOrder = await createNewOrder(orderItems, user.id);
      console.log("New Order:", newOrder);

      for (const item of product) {
        await handleRemoveFromCart(item.cartid, item.cartprodid);
      }

      const updatedProducts = await fetchProductsCart(user.id, sessionId);
      setProducts(updatedProducts);
      console.log(updatedProducts);

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
