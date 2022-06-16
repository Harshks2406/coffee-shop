const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
        customerId: { type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
                    },
        items: {type: Object, required: true},
        name: {type:String, required: true},
        phone: {type: String, required: true},
        paymentTypes: {type:String, defalut: 'COD'},
        status: {type:String, deflaut: 'order_placed'}

},{timestamps: true})

const Order = mongoose.model('Order',orderSchema)  

module.exports = Order