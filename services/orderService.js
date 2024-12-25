const createOrder = require('../helpers/createOrder');
const logger = require('../config/logsConf');
const queryOrder = require('../helpers/rutterQuery');

const orderService = async (store_id, token) => {
  let url = process.env.RUTTER_URL + '/orders?access_token=' + token;
  let response = await queryOrder(url, 0);
  let data = response;
  if (!data.error_message) {
    for (const order of data.orders) {
      try {
        await createOrder(order, store_id);
      } catch (error) {
        logger.error(`error: ${error} in this API request ${url} and with order with order id: ${order.id}`);
        throw error;
      }
    }
    while (data.next_cursor) {
      url = process.env.RUTTER_URL + '/orders?access_token=' + token + '&cursor=' + data.next_cursor;
      response = await queryOrder(url, 0);
      data = response;
      for (const order of data.orders) {
        try {
          await createOrder(order, store_id);
        } catch (error) {
          logger.error(`error: ${error} in this API request ${url} and with order with order id: ${order.id}`);
          throw error;
        }
      }
    }
  }
}

module.exports = orderService;