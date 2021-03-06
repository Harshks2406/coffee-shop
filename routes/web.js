const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customer/cartController')
const orderController = require('../app/http/controllers/customer/orderController')
const homeController = require('../app/http/controllers/homeController')
const adminOrderController = require('../app/http/controllers/admin/orderController')
const auth = require('../app/http/middlewares/auth')
const guest = require('../app/http/middlewares/guest')

function initRoutes(app){
    app.get("/",homeController().index)
    
    app.get("/cart",cartController().index)
    
    app.post("/update-cart",cartController().update)
    
    app.get("/login",guest,authController().login)
    app.post("/login",authController().postLogin)
    
    app.get("/register",guest,authController().register)
    app.post("/register",authController().postRegister)

    app.post("/logout",authController().logout)

    app.post("/orders",auth,orderController().store)

    //customer routes
    app.get("/customer/orders",auth,orderController().index)

    //admin routes
    app.get("/admin/orders",auth,adminOrderController().index)
}

module.exports = initRoutes