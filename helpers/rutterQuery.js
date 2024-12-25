const logger = require('../config/logsConf');
const fetch = require("node-fetch")

const base64token = Buffer.from(`${process.env.RUTTER_CLIENT_ID}:${process.env.RUTTER_CLIENT_SECRET}`).toString(
    'base64'
);

const rutterQuery = async (url, retryRequestCount) => {
    try {
        const data = await fetch(url, {
            headers: {
                Authorization: `Basic ${base64token}`,
            },
        });
        return data.json();
    } catch (error) {
        logger.error(`Retrying ${retryRequestCount} times for URL ${url} and error ${error}`);
        if (retryRequestCount < 5) {
            return await rutterQuery(url, retryRequestCount + 1);
        } else {
            logger.error('Error even after 5 retries', error);
            return null;
        }
    }
}

module.exports = rutterQuery;