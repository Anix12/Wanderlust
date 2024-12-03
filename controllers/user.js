const User=require("../models/user");

module.exports.renderSignUpForm=(req, res) => {
    res.render("./users/signup.ejs")
}
module.exports.signUp=async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registerUser = await User.register(newUser, password);
        console.log(registerUser);
        //For After Sign Up Automatically Login User
        req.login(registerUser,
            (err) => {
                if (err) {
                    return next(err);
                }
                req.flash("sucess", "Welcome to Airbnb");
                res.redirect("/listings");
            });
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/signup")
    }
}

module.exports.renderloginInForm=(req, res) => {
    res.render("./users/login.ejs");
}


module.exports.loginIn=async (req, res) => {
    req.flash("sucess", `Welcome back to Airbnb ${req.user.username} !`);
    let redirectUrl = res.locals.redirectUrl ||"/listings"
    res.redirect(redirectUrl);
}

module.exports.logOut=(req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("sucess", "You Logged Out Sucessfully!");
        res.redirect("/listings");
    })
}