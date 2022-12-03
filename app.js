const express=require('express');
const session=require('express-session')
const cookieParser = require("cookie-parser");
const app=express();
app.listen(3001,()=>console.log('listening to 3001'));
// encoder
app.use(express.urlencoded({ extended: true}));
// app.use(express.json()); 
// cookie parser middleware
app.use(cookieParser());
//set view engine
app.set('view engine', 'ejs')
app.use(session({
    resave:true,
    saveUninitialized:true,
    secret:'secretpassword',
}))
// Email ID and Password 
const user={
    email:'admin@123',
    passwrd:'1234'
}   
//To clear cache
app.use((req, res, next) => {
    res.set("Cache-Control", "no-store");
    next();
  });

// Direct to Login page
app.get('/', (req,res)=>{
    if(req.session.user){
        res.redirect('/home')
    }
    else{
    res.render('login', { invalid:''})
    }
});



// Direct to home page after validation
app.post('/',(req,res)=>{
      if(user.email==req.body.email&&user.passwrd==req.body.passwrd){
        req.session.user=req.body.email
        console.log(req.session.user)
        res.redirect('/home')
      }
      else{
        res.render('login',{invalid:'Invalid Username or Password'});
        
      }
 })
 // Direct to home page
app.get('/home',(req,res)=>{
    if(req.session.user){
        res.render('home')
    }
    else{
        res.redirect('/')
    }
 })

// Logout
 app.get('/logout',(req,res)=>{
    req.session.destroy()
        res.redirect('/');
        console.log('session deleted');
        res.end();
 })



