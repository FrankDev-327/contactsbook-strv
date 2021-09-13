'use strict';

const moment = require('moment');
module.exports = {
    formatTimesTamp: (timestamp) => {
        return moment(timestamp).format('YYYY-MM-DD HH:mm A');
    }
}