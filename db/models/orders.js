const client = require('../client');


// const createOrder = async (
//     orderProdId,
//     orderProdModelName,
//     orderQty,
//     orderDate,
//     orderTotalPrice,
//     userIdOrder,
//     orderStatus
//   ) => {
//     try {
//       const { rows: [maxOrder] } = await client.query('SELECT MAX(orderId) AS maxOrderId FROM orders');
//       const currentMaxOrderId = maxOrder.maxorderid || 'ORD000';
//       const currentOrderIdDigits = parseInt(currentMaxOrderId.substring(3));
//       const nextOrderIdDigits = (currentOrderIdDigits + 1).toString().padStart(3, '0');
//       const orderId = `ORD${nextOrderIdDigits}`;
  
//       const { rows: [maxUser] } = await client.query('SELECT MAX(userIdOrder) AS maxUserId FROM orders');
//       const currentMaxUserId = maxUser.maxuserid || 0;
//       const nextUserId = currentMaxUserId + 1;
  
//       const { rows: [newOrder] } = await client.query(
//         `
//         INSERT INTO orders (orderId, orderProdId, orderProdModelName, orderQty, orderDate, orderTotalPrice, userIdOrder, orderStatus)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//         RETURNING *;
//         `,
//         [
//           orderId,
//           orderProdId,
//           orderProdModelName,
//           orderQty,
//           orderDate,
//           orderTotalPrice,
//           orderStatus,
//           nextUserId
//         ]
//       );
  
//       return newOrder;
//     } catch (error) {
//       console.error("Error creating order:", error);
//       throw error;
//     }
//   };

// const createOrder = async ({ userId }) => {
//   try {
    
//     const { rows: [order] } = await client.query(`
//       INSERT INTO orders ( userId, orderDate, orderStatus)
//       VALUES ($1, CURRENT_TIMESTAMP, 'DEFAULT' )
//       RETURNING *;
//     `, [userId]);

//     return order;
//   } catch (error) {
//     console.error("Error creating order:", error);
//     throw error;
//   }
// };

const createOrder = async ({ userId }) => {

  console.log("createOrderFunc:", userId)
  try {
    
    const { rows: [order] } = await client.query(`
      INSERT INTO orders ( userId, orderDate, orderstatus)
      VALUES ($1, CURRENT_TIMESTAMP, DEFAULT )
      RETURNING *;
    `, [userId]);

    return order;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};


const addProductToOrder = async ({
  orderProdId,
  orderProdModelName,
  orderProdImg,
  orderProdPrice,
  orderQty,
  orderId
}) => {
  try {
    const orderProdPriceNumeric = parseFloat(orderProdPrice);
    const orderQtyNumeric = parseInt(orderQty);

    // Insert the new order item
    const { rows: [order] } = await client.query(`
      INSERT INTO order_items (orderProdId, orderProdModelName, orderProdImg, orderQty, orderProdPrice, orderId)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `, [orderProdId, orderProdModelName, orderProdImg, orderQtyNumeric, orderProdPriceNumeric, orderId]);

    // Calculate the new total price using SQL query
    const { rows: [newTotal] } = await client.query(`
      SELECT SUM(orderProdPrice * orderQty) AS newTotal
      FROM order_items
      WHERE orderId = $1;
    `, [orderId]);

    console.log("newTotal:", newTotal.newtotal);
    const newOrderTotal = newTotal.newtotal;

    // Update the order's total price
    await client.query(`
      UPDATE orders
      SET orderTotalPrice = $1
      WHERE orderId = $2
    `, [newOrderTotal, orderId]);

    return order;
  } catch (error) {
    console.error(error);
    throw error;
  }
};




const getUsersOrder = async (userId) => {
  try {
    const {rows:[userOrder]} = await client.query(
      `
      SELECT * FROM orders
      WHERE userId = $1;
      `
    ,[userId]);
    return userOrder;

  }catch(error){
    throw error
  }
}




const getAllOrders = async (user) => {

    try {
      const { rows } = await client.query(`
        SELECT * FROM orders
      `);
  
      return rows;
    } catch (error) {
      console.log('Error retrieving orders:', error);
      throw error;
    }
  };
const getOrderById = async (orderId) => {
    try {
        const { rows: [order] } = await client.query(
            `
            SELECT * FROM orders
            WHERE orderId = $1;
            `, [orderId]);

        return order;
    } catch (error) {
        console.log('Error retrieving order by ID:', error);
        throw error;
    }
};

const updateOrderStatus = async (orderId, newStatus) => {
    try {
        const { rows: [order] } = await client.query(
            `
            UPDATE orders
            SET orderStatus = $2
            WHERE orderId = $1
            RETURNING *;
      `, [orderId, newStatus]);

        return order;
    } catch (error) {
        console.log('Error updating order status:', error);
        throw error;
    }
};

const getOrdersByUser = async (userId) => {
    try {
      const { rows } = await client.query(
        `
        SELECT o.*
        FROM orders AS o
        WHERE o.userId = $1;
        `,
        [userId]
      );
  
      return rows;
    } catch (error) {
      console.log('Error retrieving orders by user:', error);
      throw error;
    }
  };






module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getOrdersByUser,
    addProductToOrder,
    getUsersOrder
};