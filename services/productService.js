const createProduct = require('../helpers/createProduct');
const logger = require('../config/logsConf');
const queryProduct = require('../helpers/rutterQuery');

const productService = async (store_id, token) => {
    let url = process.env.RUTTER_URL + '/products?access_token=' + token;
    let response = await queryProduct(url, 0);
    let data = response;
    if (!data.error_message) {
        for (const product of data.products) {
            try {
                await createProduct(product, store_id);
            } catch (error) {
                logger.error(`error: ${error} in this API request ${url} and with product with product id: ${product.id}`);
                throw error;
            }
        }
        while (data.next_cursor) {
            url = process.env.RUTTER_URL + '/products?access_token=' + token + '&cursor=' + data.next_cursor;
            response = await queryProduct(url, 0);
            data = response;
            for (const product of data.products) {
                try {
                    await createProduct(product, store_id);
                } catch (error) {
                    logger.error(`error: ${error} in this API request ${url} and with product with product id: ${product.id}`);
                    throw error;
                }
            }
        }
    }
}

module.exports = productService;