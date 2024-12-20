const express = require("express");
const router = express.Router({ mergeParams: true });
const WrapAsync = require("../utils/WrapAsync.js"); 
const Listing = require("../models/listing.js");
const Review = require("../models/Review.js");
const ReviewController=require("../controllers/review.js")

const {validateReview, isLoggedIn, isReviewAuthor}=require("../Middleware.js");

//Review Post Route
router.post("/", isLoggedIn, validateReview, WrapAsync(ReviewController.newReviewForm));

//Review Delete Route
router.delete("/:reviewId",isLoggedIn, WrapAsync(ReviewController.destroyReview));

module.exports=router;
