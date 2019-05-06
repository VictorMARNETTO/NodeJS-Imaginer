const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');

// Controller //

// article
const articleSingleController = require('./controllers/articleSingle');
const createArticleController = require('./controllers/articleAdd');
const articlePostController = require('./controllers/articlePost');
const homepage = require ('./controllers/homePage');

// user
const userCreate = require('./controllers/userCreate');
const userRegister = require('./controllers/userRegister');
const userLogin = require('./controllers/userLogin');
const userLoginAuth = require('./controllers/userLoginAuth');
const userLogout = require('./controllers/userLogout.js');


const app = express();
mongoose.connect('mongodb://localhost:27017/blog');
const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )

}))




app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(fileupload())

const auth = require('./middleware/auth')
const redirectAuthSuccess = require('./middleware/redirectAuthSuccess')


var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

app.use(express.static('public'));

// Route
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('*', (req, res,next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})

// Middleware
const articleValidPost = require('./middleware/articleValidPost')
app.use("/articles/post", articleValidPost)


app.get("/",homepage)

// Articles
app.get("/articles/add", auth, createArticleController)
app.get("/articles/:id", articleSingleController)
app.post("/articles/post", auth, articleValidPost, articlePostController)

// Users
app.get('/user/create', redirectAuthSuccess, userCreate)
app.post('/user/register', redirectAuthSuccess, userRegister)
app.get('/user/login', redirectAuthSuccess, userLogin)
app.post('/user/loginAuth', redirectAuthSuccess, userLoginAuth)
app.get('/user/logout', userLogout)

// Contact
app.get("/contact", (req,res) => {
    res.render("contact")
})

app.listen(3000, function() {
    console.log("Le serveur tourne sur le port 3000");

})