const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  storeId: String,
  id: String,
  platform_id: String,
  type: String,
  name: String,
  description: String,
  images: Array,
  status: Object,
  variants: Array,
  tags: Array,
  created_at: Date,
  updated_at: Date,
  product_url: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema); 