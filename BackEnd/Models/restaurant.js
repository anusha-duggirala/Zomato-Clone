const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    },
    city_id: {
        type: Number,
        required: true
    },
    locality: {
        type: String,
        required: true
    },
    thumb: {
        type: Object,
        required: true
    },

    rating_text: {
        type: String,
        required: true
    },
    min_price: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    cuisine: [
        {
            id: {
                type: Number,
                required: true
            },
            name:{
                type: String,
                required: true
            }
        }
    ],

    mealtype_id: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('restaurant', restaurantSchema);