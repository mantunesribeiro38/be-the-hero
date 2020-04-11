
const crypto = require('crypto');

module.exports =  function genarateUniqueId () {
    return crypto.randomBytes(4).toString('HEX');
}