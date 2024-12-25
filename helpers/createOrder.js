const Order = require('../models/Order');
const logger = require('../config/logsConf');

/**
 * Creates or updates an order in MongoDB
 * @param {Object} orderData - The order data from Rutter API
 * @param {String} storeId - The store ID associated with the order
 * @returns {Promise<Object>} The saved or updated order
 */
const createOrder = async (orderData, storeId) => {
  try {
    // Check if order already exists
    const existingOrder = await Order.findOne({ 
      platform_id: orderData.id,
      storeId: storeId 
    });

    // Prepare order data
    const orderToSave = {
      storeId,
      id: orderData.id,
      platform_id: orderData.id,
      order_number: orderData.order_number,
      status: orderData.status,
      payment_status: orderData.payment_status,
      fulfillment_status: orderData.fulfillment_status,
      line_items: orderData.line_items || [],
      fulfillments: orderData.fulfillments || [],
      billing_address: orderData.billing_address || {},
      shipping_address: orderData.shipping_address || {},
      shipping_method: orderData.shipping_method,
      iso_currency_code: orderData.iso_currency_code,
      total_shipping: orderData.total_shipping,
      total_discount: orderData.total_discount,
      total_tax: orderData.total_tax,
      total_price: orderData.total_price,
      created_at: orderData.created_at,
      updated_at: orderData.updated_at,
      customer: orderData.customer || {},
      transactions: orderData.transactions || [],
      total_shipping_discount: orderData.total_shipping_discount,
      name: orderData.name,
      cancelled_at: orderData.cancelled_at || '',
      source_name: orderData.source_name,
      total_line_items_price: orderData.total_line_items_price,
      tags: orderData.tags || [],
      refunds: orderData.refunds || [],
      platform_data: orderData.platform_data || {}
    };

    if (existingOrder) {
      // Update existing order
      const updatedOrder = await Order.findOneAndUpdate(
        { platform_id: orderData.id, storeId },
        orderToSave,
        { new: true }
      );
      // logger.info(`Updated order ${orderData.id} for store ${storeId}`);
      return updatedOrder;
    }

    // Create new order
    const newOrder = new Order(orderToSave);
    const savedOrder = await newOrder.save();
    // logger.info(`Created new order ${orderData.id} for store ${storeId}`);
    return savedOrder;

  } catch (error) {
    logger.error(`Error creating/updating order ${orderData.id}: ${error.message}`);
    throw new Error(`Failed to create/update order: ${error.message}`);
  }
};

module.exports = createOrder;
