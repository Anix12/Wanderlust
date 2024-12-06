const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../Middleware.js");
const controllerListing = require("../controllers/listing.js");

const multer = require('multer');
const { storage } = require("../cloudconfig.js");
const upload = multer({ storage })


// index Route // new Listing Create route z
router
    .route("/")
    .get(WrapAsync(controllerListing.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, WrapAsync(controllerListing.createNewList));


//New Listing
router.get("/new", isLoggedIn, WrapAsync(controllerListing.renderNewForm));
//Privacy
router.get("/privacy", controllerListing.privacy);
router.get("/terms", controllerListing.terms);
router.get("/contact", controllerListing.contact)


router.route("/type/:name")
    .get(WrapAsync(controllerListing.type));

//search bar
router.route("/search")
    .get(controllerListing.search);

    //Delete Route //update route //Show Route
    router.route("/:id")
    .get(WrapAsync(controllerListing.renderShowRoute))
    .delete(isLoggedIn, isOwner, WrapAsync(controllerListing.DestroyRoute))
    .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, WrapAsync(controllerListing.UpdateRoute));

//edit Route
router.get("/:id/edit", isLoggedIn, isOwner, WrapAsync(controllerListing.renderEditForm));



module.exports = router;