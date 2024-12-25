const Product = require('../models/Product');
const logger = require('../config/logsConf');

/**
 * Creates or updates a product in MongoDB
 * @param {Object} productData - The product data from Rutter API
 * @param {String} storeId - The store ID associated with the product
 * @returns {Promise<Object>} The saved or updated product
 */
const createProduct = async (productData, storeId) => {
  try {
    // Check if product already exists
    const existingProduct = await Product.findOne({ 
      platform_id: productData.id,
      storeId: storeId 
    });

    // Prepare product data
    const productToSave = {
      storeId,
      id: productData.id,
      platform_id: productData.id,
      type: productData.type || '',
      name: productData.name,
      description: productData.description,
      images: productData.images || [],
      status: productData.status,
      variants: productData.variants || [],
      tags: productData.tags || [],
      created_at: productData.created_at,
      updated_at: productData.updated_at,
      product_url: productData.product_url
    };

    if (existingProduct) {
      // Update existing product
      const updatedProduct = await Product.findOneAndUpdate(
        { platform_id: productData.id, storeId },
        productToSave,
        { new: true }
      );
      // logger.info(`Updated product ${productData.id} for store ${storeId}`);
      return updatedProduct;
    }

    // Create new product
    const newProduct = new Product(productToSave);
    const savedProduct = await newProduct.save();
    // logger.info(`Created new product ${productData.id} for store ${storeId}`);
    return savedProduct;

  } catch (error) {
    logger.error(`Error creating/updating product ${productData.id}: ${error.message}`);
    throw new Error(`Failed to create/update product: ${error.message}`);
  }
};

module.exports = createProduct; 