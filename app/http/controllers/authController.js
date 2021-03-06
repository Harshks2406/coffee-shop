const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController(){
    return{
        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error',info.message)
                    return res.redirect('/login')
                }
                req.login(user,(err)=>{
                    if(err){
                        req.flash('error',info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })
            })(req,res,next)
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name, email, password} = req.body
            if(!name || !email || !password){
                req.flash('error','All fields are required')
                return res.redirect('/register')
            }

            //check if email already exists
            User.exists({email : email},(err,result)=>{
                if(result){
                    req.flash('error','Email already exists')
                    return res.redirect('/register')
                }
            })

            //hash password
            const hashedPassword = await bcrypt.hash(password,10) 

            //create a user
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            user.save().then((user)=>{
                
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Something went wrong')
                return res.redirect('/register')
            })
        },
        logout(req,res,next){
            req.logout((err)=>{
                if(err){ return next(err)}
                return res.redirect('/login')
            })
        }
    }
}

module.exports = authController