const express = require('express');
const ordersRouter = express.Router();

const {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderStatus,
    getOrdersByUser,
    getUsersOrder,
    addProductToOrder
} = require('../db');

ordersRouter.use((req, res, next) => {
    console.log("A request has been made to /orders");

    next();
})

// Post /api/orders

ordersRouter.post('/', async (req, res) => {
    const {
      orderItems,
      userIdOrder
    } = req.body;
  
    try {
      const newOrder = await createOrder({ userId: userIdOrder });
  
      const newOrderItems = await Promise.all(orderItems.map(async (item) => {
        const { orderProdId, orderProdModelName, orderProdImg, orderQty, orderProdPrice } = item;
        
        const orderItem = await addProductToOrder({
          orderProdId,
          orderProdModelName,
          orderProdImg,
          orderQty,
          orderProdPrice,
          orderId: newOrder.orderid // Use the same orderId for all items
        });
  
        return orderItem;
      }));
  
      return res.json({ newOrder, newOrderItems });
    } catch (error) {
      res.status(500).json({ error: 'Error creating order' });
    }
  });
  
  

// Get All Orders /api/orders

ordersRouter.get('/', async (req, res, next) => {
    try {
        const orders = await getAllOrders();
        res.send(orders)

    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Get /api/orders/:orderId

ordersRouter.get('/:orderId', async (req, res, next) => {
    const { orderId } = req.params;
    console.log(orderId)

    try {
        const order = await getOrderById(orderId);
        if (order) {
            res.send(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
        next(error);
    }
});

// Put/Patch api/orders/:orderId/status

ordersRouter.put('/:orderId/status', async (req, res) => {
    const { orderId } = req.params;
    const { newStatus } = req.body;

    try {
        const updatedOrder = await updateOrderStatus(orderId, newStatus);
        if (updatedOrder) {
            res.json(updatedOrder);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = ordersRouter;
