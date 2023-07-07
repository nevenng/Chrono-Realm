const client = require('../client');

const createOrder = async (
    orderProdId,
    orderProdModelName,
    orderQTY,
    orderDate,
    orderTotalPrice,
    userIdOrder,
    orderStatus
) => {
    try {
        const { rows: [maxOrder] } = await client.query('SELECT MAX(orderId) AS maxOrderId FROM orders');
        const currentMaxOrderId = maxOrder.maxorderid || 'ORD000';
        const currentOrderIdDigits = parseInt(currentMaxOrderId.substring(3));
        const nextOrderIdDigits = (currentOrderIdDigits + 1).toString().padStart(3, '0');
        const orderId = `ORD${nextOrderIdDigits}`;
        // Had to look this up to find a way to increment with ORD001 ++ 

        const { rows: [newOrder] } = await client.query(
            `
            INSERT INTO orders (orderId, orderProdId, orderProdModelName, orderQTY, orderDate, orderTotalPrice, userIdOrder, orderStatus)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            RETURNING *;
            `,
            [
                orderId,
                orderProdId,
                orderProdModelName,
                orderQTY,
                orderDate,
                orderTotalPrice,
                userIdOrder,
                orderStatus
            ]
        );

        return newOrder;
    } catch (error) {
        console.log('Error creating order:', error);
        throw error;
    }
};

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


module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus
};