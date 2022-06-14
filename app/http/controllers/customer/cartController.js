const session = require("express-session")

function cartController(){
    return{
        index(req,res){
                cart = req.session.cart ? req.session.cart : {}
                res.render("customers/cart",{cart: cart})
        },

        update(req,res){

            //this is for the first time when we are creating our cart
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty : 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

            //checking if item already exist in the cart or not
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item : req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = parseInt(cart.totalPrice) + parseInt(req.body.price)
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty  = cart.totalQty + 1
                cart.totalPrice = parseInt(cart.totalPrice)+ parseInt(req.body.price)
            }
            return res.json({ totalQty: req.session.cart.totalQty})  
        }
    }
}

module.exports = cartController