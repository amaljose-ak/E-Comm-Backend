const mongoose = require('mongoose')

const OrderShema = new mongoose.Schema(
    {
        userId: { type: String, required: true, unique: true },
        Products: [
            {
                productId: {
                    type: String
                },
                quantity: {
                    type: Number,
                    default: 1
                }
            }
        ],
        amount:{type:Number,requried:true},
        adderss:{type:Object,reqired:true},
        status:{type:String,default:'pending'}
    },
    { timestamps: true }
)
module.exports = mongoose.model("Order", OrderShema)