const Order = require("../../../models/order")

function orderController(){
    return{
        store(req,res){
            const{ name, phone} = req.body
            if(!name || !phone){
                req.flash('error', 'All fields are required')
                return res.redirect('/cart')
            }
            const order = new Order({
                customerId: req.user._id,
                items: req.session.cart.items,
                name,
                phone
            })
            order.save().then(result=>{
                req.flash('success','Order placed successfully')
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Something went wrong')
                return res.redirect("/cart")
            })
        },
        async index(req,res){
            const orders = await Order.find({customerId: req.user._id})
            res.render('customers/orders',{orders: orders})
        }
    }
}

module.exports = orderController