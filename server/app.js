const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const path = require('path');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { dbConfig, cookieConfig, sessionSecret } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const markdownpdf = require("markdown-pdf");
const {
    localStrategyHandler,
    serializeUser,
    deserializeUser,
    isValid,
} = require("./passport");

const MongoDBStore = require('connect-mongodb-session')(session);
const store = new MongoDBStore
    ({
        uri: 'mongodb+srv://meital:1961@cluster0.ggtxa.mongodb.net/shopping',
        collection: 'mySessions'
    });

const userController = require('./controllers/users.controller');
const categoryController = require('./controllers/category.controller');
const productsController = require('./controllers/products.controller');
const cartController = require('./controllers/cart.controller');
const cartItemController = require('./controllers/cart-item.controller');
const ordersController = require('./controllers/orders.controller');

// const port = process.env.PORT || 4000;
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}));


app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.static('public'));



app.use(session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore(dbConfig),
    cookie: cookieConfig
})
);
app.use(passport.initialize());
app.use(passport.session());


const userSchema = require('./models/users.model');

passport.use("local", new LocalStrategy(localStrategyHandler));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

// app.use('/shopping', userController);
app.use('/shopping', categoryController);
app.use('/shopping', productsController);
app.use('/shopping', cartController);
app.use('/shopping', cartItemController);
app.use('/shopping', ordersController);
app.use("/auth", userController);


app.post('/upload', (req, res) => {
    console.log(req.files);
    req.files.mypic.mv(path.join(__dirname, 'public/img', req.files.mypic.name), (err) => {

        if (err) {
            return res.status(400).json({});
        }
        return res.status(200).json(req.files.mypic.name);
    })
});

app.post('/pdf', (req, res) => {
    const receiptsFileName= req.body.client+"_"+new Date().getTime()+".pdf";
    markdownpdf().from.string(req.body.receiptString).to(path.join(__dirname, '/public/receipts/'+receiptsFileName), () => {
        res.json({ path: `http://localhost:4000/receipts/${receiptsFileName}` });
    });
});

app.use("*", isValid);

process.on("uncaughtException", (err, origin) => {
    console.log(err);
});

const init = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://meital:1961@cluster0.ggtxa.mongodb.net/shopping', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });

        app.listen('4000', (err) => {
            console.log('Mongo server up');
        });
        // app.listen(port, () => {
        //     console.log( `server up on ${port}` );
        // });
    } catch (err) {
        console.log(err);
    }
}

init();









