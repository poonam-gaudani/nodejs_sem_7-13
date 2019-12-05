var express=require('express');
var bodyparser=require('body-parser');
var session=require('express-session');
var sessionvalue="";
var mongoose=require('mongoose');
var path=require('path');
mongoose.connect('mongodb://localhost:27017/exam_db',{useNewUrlParser:true});
var app=express();
app.set('view enginee','ejs');

app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret:'ssshhhh',
    saveUninitialized:false,
    resave:false
}));

var db=mongoose.connection;

//schema
var userschema=mongoose.Schema(
    {
        username:
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            minlength:6,
            maxlength:8
        }
    }
);

//model
var User=mongoose.model("User",userschema,"Users");

db.once('open',function(callback)
{
    console.log('connectiion successful');
});

app.get('/adduser',function(req,res)
{
    //res.sendFile("login.html",{root: path.join(__dirname,'views')});
    var poonam='pihuuu';
    res.render('mainpage.ejs');
});
app.post('/adduser',function(req,res)
{
    var uname=req.body.uname;
    var pass=req.body.pass;
    User=new User({
        username:uname,
        password:pass
    });
    User.save().then(item=>res.send('item saved to database'))
    .catch(err=>{
        res.send('unable to save ');
    });

});
app.get('/showuser',function(req,res)
{
    User.find(function(err,Users)
    {
        console.log(Users);
        res.send(Users);
    });
});

app.get('/login',function(req,res)
{
    res.render("login.ejs");
});

app.get('/home',function(req,res)
{
    if(sessionvalue=="")
    {
        res.redirect('/login');
    }
    else{
        res.render("homepage.ejs",{data:sessionvalue});
    }
    
});

app.post('/login',function(req,res)
{
    var username=req.body.uname;
    var pass=req.body.pass;
    User.find({username:username},function(err,Users)
    {
        if(Users.length==0)
        {
            console.log('no');
         res.redirect('/login');
        }
        else{
            console.log('ya');
            req.session.loggedin=true;
            sessionvalue=req.session.username=username;
            res.redirect('/home');
        }
    })
});

app.get('/logout',function(req,res)
{
    req.session.loggedin=false;
    res.redirect('/login');
});
var port=8083;
app.listen(port);
console.log('app is listening on '+port);