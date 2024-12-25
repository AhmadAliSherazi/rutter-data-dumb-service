const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  storeId: String,
  id: String,
  platform_id: String,
  order_number: String,
  status: String,
  payment_status: String,
  fulfillment_status: String,
  line_items: Array,
  fulfillments: Array,
  billing_address: Object,
  shipping_address: Object,
  shipping_method: String,
  iso_currency_code: String,
  total_shipping: Number,
  total_discount: Number,
  total_tax: Number,
  total_price: Number,
  created_at: Date,
  updated_at: Date,
  customer: Object,
  transactions: Array,
  total_shipping_discount: Number,
  name: String,
  cancelled_at: String,
  source_name: String,
  total_line_items_price: Number,
  tags: Array,
  refunds: Array,
  platform_data: Object
});

module.exports = mongoose.model('Order', orderSchema); 