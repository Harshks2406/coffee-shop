const Menu = require("../../models/menu")

function homeController(){
    return{
        async index(req,res){
            const drinks = await Menu.find()
            cart = req.session.cart ? req.session.cart : {}
            res.render("home",{drinks: drinks, cart:cart})  

        // Menu.find().then((drinks)=>{
        //     console.log(drinks)
        //     res.render("home",{drinks})
        // })

        }
    }
}

module.exports = homeController