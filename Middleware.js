let Listing=require("./models/listing");
let Review=require("./models/Review.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingScheme, reviewScheme } = require("./scheme.js");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        // console.log("req.originalUrl")
        req.session.redirectUrl=req.originalUrl;
        req.flash("error", "You Must Logged In !");
       return  res.redirect("/login");
    }
    next();
}

//This Used for after login so to same url like create kara tha to create page pa
module.exports.saveRedirectUrl=(req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl=req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner=async (req, res, next)=>{
    let { id } = req.params;
    let listing =await Listing.findById(id);
    if(!(listing.owner.equals(res.locals.Curruser._id) || listing.owner.equals("674eaa54e70a4148294cb524"))){
        req.flash("error", "You Dont have Permission To Make Changes");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
//Listing Validations
module.exports. validateListing = (req, res, next) => {
    let { error } = listingScheme.validate(req.body);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};
//Review Validation
module.exports.validateReview = (req, res, next) => {
    let { error } = reviewScheme.validate(req.body);
    if (error) {
        throw new ExpressError(404, error);
    } else {
        next();
    }
};

module.exports.isReviewAuthor= async(req, res, next)=>{
    let { reviewId, id } = req.params;
    let review =await Review.findById(reviewId);
    if (res.locals.Curruser._id && !review.author.equals(res.locals.Curruser._id)) {
        console.log()
        req.flash("error", "You Don't have Permission To Delete Review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}