const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const MapToken = process.env.MAP_TOKEN;

const geocodingClient = mbxGeocoding({ accessToken: MapToken });

module.exports.index = async (req, res) => {
    let allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new");
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing Doesn't Exist");
        res.redirect("/listings");
    }
    let originalImage = listing.image.url;
    originalImage = originalImage.replace("/upload", "/upload/h_300,w_250");
    res.render("listings/edit.ejs", { listing, originalImage });
}
module.exports.renderShowRoute = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate(
            {
                path: "reviews",
                populate: { path: "author" }
            })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing Doesn't Exist");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render("listings/show.ejs", { listing });
}

module.exports.createNewList = async (req, res, next) => {
    let responce = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1
    })
        .send()

    let url = req.file.path;
    let filename = req.file.filename;
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    newListing.geometry = responce.body.features[0].geometry;
    let savedListing = await newListing.save();
    req.flash("sucess", "New Listing Created !");
    res.redirect("/listings");
}
module.exports.DestroyRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("sucess", "Listing Deleted!");
    res.redirect("/listings");
}
module.exports.UpdateRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }
    if (!listing) {
        req.flash("error", "Listing Doesn't Exist");
        res.redirect("/listings");
    }
    req.flash("sucess", "Listing Updated!");
    res.redirect(`/listings/${id}`);
}
module.exports.type = async (req, res) => {
    let { name } = req.params;
    let allListings = await Listing.find({ kind: { $eq: name } });
    res.render("./listings/index.ejs", { allListings });
}

module.exports.search = async (req, res) => {
    try {
        const { key: parameter, country, title } = req.query;

        const query = {};

        if (parameter) {
            query.location = { $regex: parameter, $options: "i" };
        }
        if (country) {
            query.country = { $regex: country, $options: "i" };
        }

        if (title) {
            const escapedTitle = title.replace(/[.*+?^=!:${}()|\[\]\/\\]/g, "\\$&");
            query.title = { title: { $regex: escapedTitle, $options: "i" } };
        }

        console.log("Constructed query:", query);
        let allListings = await Listing.find(query);

        console.log("Listings found:", allListings);

        if (allListings.length === 0) {
            return res.render("listings/search.ejs", {
                allListings: [],
                message: `No listings related to "${country || parameter || title}" yet.`,
            });
        }

        // Render the listings if found
        res.render("listings/search.ejs", { allListings, message: null });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}