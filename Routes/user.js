const express = require("express");
const router = express.Router();
const user=require("../models/user.js")
const WrapAsync = require("../utils/WrapAsync");
const passport = require("passport");

const { saveRedirectUrl } = require("../Middleware.js")
const userController = require("../controllers/user.js");

router
    .route("/signup")
    .get(userController.renderSignUpForm)
    .post(WrapAsync(userController.signUp))

// saveRedirectUrl Uses for user current Url
router
    .route("/login")
    .get( userController.renderloginInForm)
    .post(
        saveRedirectUrl,
        passport.authenticate("local", {
            failureRedirect: '/login',
            failureFlash: true
        }),
        userController.loginIn
    );

router.get("/logout", userController.logOut);

module.exports = router;

//This login and logout all of the passport Informations