var mongoose = require('mongoose');

var productmodel = mongoose.model('product', {
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    },
    maker: {
        type: String,
        required: true
    }
});

module.exports = {productmodel}