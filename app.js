if (process.env.NODE_ENV != "production") {
    require('dotenv').config()
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate)
app.use(express.static(path.join(__dirname, "public")))


const listingRoute = require("./Routes/listing.js");
const reviewsRoute = require("./Routes/Review.js");
const userRoute = require("./Routes/user.js");

const dbUrl = process.env.ATLAS_DB;
// let mongoUrl= "mongodb://127.0.0.1:27017/wanderlust"

main()
    .then(() => { console.log("Connection Sucessful with DB") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect(dbUrl); //change kar jab deploy kara ga
}

app.get("/", (req, res) => {
    res.send("Hi ! I Am Root");
});


const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on('error', (err) => {
    console.log("Error in Session store: " + err);
});

const sessionOption = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() * 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

//sessions
app.use(session(sessionOption));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//middleware
app.use((req, res, next) => {
    res.locals.sucess = req.flash("sucess");
    res.locals.error = req.flash("error");
    res.locals.Curruser = req.user;
    next();
});

//in Passort pbkdf2 hashing algorithm uses
app.get("/user", async (req, res) => {
    let fakeUser = new User({
        email: "abc@gmail.com",
        username: "Aniket"
    });
    let registerUser = await User.register(fakeUser, "helloWorld");
    res.send(registerUser);
})

//uses Routes
app.use("/listings", listingRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);


app.all("*", (req, res, next) => {
    next(new ExpressError(400, "Bad Request"));
});

//error route
app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something Went Wrong" } = err;
    res.status(statusCode).render("./listings/error.ejs", { message });
});


app.listen("8080", ((res) => {
    console.log("Port Listening at 8080");
}));
app.get('/favicon.ico', (req, res) => res.status(204).end());
