const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true
    },
    cartItems: [{
        cloth: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cloth",
            required: true,
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);