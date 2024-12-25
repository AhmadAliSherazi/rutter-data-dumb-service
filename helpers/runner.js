const logger = require('../config/logsConf');
const DataSync = require('../models/data_sync');
const { Op } = require('sequelize');

const runner = async () => {
    try {
        return DataSync.findAll({
            attributes: ['store_id', 'access_token', 'started_customer', 'started_order', 'started_product', 'sync_product', 'sync_order', 'sync_customer', 'platform'],
            where: {
                store_id: {
                    [Op.in]: [
                        '5dda78e2-b8fe-4c16-97b2-4e91e3fff157', 
                        '4bf27864-e524-4863-9019-0005d411d982', 
                        'eee88943-be48-4d8e-b69e-7dde1a9ec437', 
                        'e11106e5-0c72-4965-8765-3c711cfaed3b', 
                        'fe005849-83c3-41cb-abc0-7ddc7718d073'
                    ]
                }
            },
            order: [
                ['sync_order', 'ASC']
            ]
        });
    } catch (err) {
        logger.error(`error: ${err} in main runner process`);
        throw err;
    }
}

module.exports = runner;