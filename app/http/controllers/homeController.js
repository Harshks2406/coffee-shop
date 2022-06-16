const Menu = require("../../models/menu")

function homeController(){
    return{
        async index(req,res){
            const drinks = await Menu.find()
            res.render("home",{drinks: drinks})  

        // Menu.find().then((drinks)=>{
        //     console.log(drinks)
        //     res.render("home",{drinks})
        // })

        }
    }
}

module.exports = homeController