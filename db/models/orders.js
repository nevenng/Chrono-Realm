const client = require('../client');

const createOrder = async (
    orderProdId,
    orderProdModelName,
    orderQTY,
    orderDate,
    orderTotalPrice,
    nextUserId,
    orderStatus
) => {
    try {
        const { rows: [maxOrder] } = await client.query('SELECT MAX(orderId) AS maxOrderId FROM orders');
        const currentMaxOrderId = maxOrder.maxorderid || 'ORD000';
        const currentOrderIdDigits = parseInt(currentMaxOrderId.substring(3));
        const nextOrderIdDigits = (currentOrderIdDigits + 1).toString().padStart(3, '0');
        const orderId = `ORD${nextOrderIdDigits}`;

        const { rows: [maxUser] } = await client.query('SELECT MAX(userIdOrder) AS maxUserId FROM orders');
        const currentMaxUserId = maxUser.maxuserid || 0;
        const nextUserId = currentMaxUserId + 1;

        const { rows: [newOrder] } = await client.query(
            `
            INSERT INTO orders (orderId, orderProdId, orderProdModelName, orderQTY, orderDate, orderTotalPrice, orderStatus, userIdOrder)
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
                orderStatus,
                nextUserId
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

const getOrdersByUser = async (userToken, userIdOrder) => {
    try {
      const { rows } = await client.query(
        `
        SELECT o.*
        FROM orders AS o
        INNER JOIN users AS u ON o.userIdOrder = u.id
        WHERE u.userToken = $1;
        `,
        [userToken]
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
    getOrdersByUser
};