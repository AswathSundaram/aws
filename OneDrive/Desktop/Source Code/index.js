const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const mongoose = require('mongoose');

// MongoDB connection URL
const url = "mongodb+srv://aswath:aswath@cluster0.8yhgo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Connect to MongoDB using Mongoose
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Initialize MongoDB session store
const store = new MongoDBStore({
    uri: url,
    collection: 'mysessions'
});

// Handle MongoDB session store errors
store.on('error', function(error) {
    console.log(error);
});

// Body Parser Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: "1a2b3c",
    resave: false,
    saveUninitialized: false,
    store: store
}));

// Define Mongoose schemas and models
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    username: String,
    email: String,
    password: String,
    name: String,
    branch: String,
    reg_no: String
});

const Signup = mongoose.model('Signup', signupSchema);

const querySchema = new Schema({
    name: String,
    email: String,
    message: String
});

const Query = mongoose.model('Query', querySchema);

// Middleware for authentication


// Route Definitions
app.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "signup.html"));
});

// Define other routes...

// Handle Sign Up POST request
app.post('/signup', async function(req, res) {
    var data = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        branch: req.body.branch,
        reg_no: req.body.reg
    };

    try {
        await Signup.create(data);
        console.log("Credentials saved!");
        return res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving credentials");
    }
});

// Handle Login POST request
app.post('/loginup', async function(req, res) {
    var loginData = {
        username: req.body.username,
        password: req.body.password
    };

    try {
        const user = await Signup.findOne(loginData);
        if (user != null && user.password === req.body.password) {
            req.session.user = user;
            req.session.isAuth = true;

            // Set a cookie for the username
            res.cookie('username', user.username, { maxAge: 900000, httpOnly: true });

            return res.redirect('/redirectsuc.html');
        } else {
            res.redirect('/login.html');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error during login");
    }
});


// Middleware for authentication
const isAuth = (req, res, next) => {
    if (req.session.isAuth && req.session.user) {
        next();
    } else {
        res.redirect('/login.html');
    }
};

// Handle Logout POST request
app.post('/logout', function(req, res) {
    req.session.destroy((err) => {
        if (err) throw err;
        res.redirect("/");
    });
});



// Handle Query POST request
app.post('/query', async function(req, res) {
    var data = {
        name: req.body.Name,
        email: req.body.email,
        message: req.body.message
    };

    try {
        await Query.create(data);
        console.log("Query saved!");
        return res.redirect('/contactus.html');
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving query");
    }
});

// Handle Logout POST request


// Start the server
const PORT = process.env.PORT || 5100;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));