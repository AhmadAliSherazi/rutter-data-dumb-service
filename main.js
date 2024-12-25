const runner = require('./helpers/runner');
const productService = require('./services/productService');
const orderService = require('./services/orderService');
const logger = require('./config/logsConf');

const main = async () => {
    const syncedStores = await runner();
    for (let index of syncedStores) {
        logger.info(`StoreId ${index.store_id} is currently syncing`);
        await productService(index.store_id, index.access_token);
        await orderService(index.store_id, index.access_token);
    }
}

main();