const joi=require("joi");
const Review = require("./models/Review");

module.exports.listingScheme= joi.object({
    listing: joi.object({
        title : joi.string().required(),
        description: joi.string().required(),
        country:joi.string().required(),
        location:joi.string().required(),
        price:joi.number().required().min(50),
        image:joi.string().allow("", null),
        kind: joi.string()
        .valid("Trending", "Rooms", "Mountains", "castles", "Farms", "Arctic", "Amazing pools", "Iconic Cities")
        .required(),
    }).required()
});

module.exports.reviewScheme=joi.object({
    review: joi.object({
        rating:joi.number().required().min(1).max(5),
        comment:joi.string().required(),
    }).required()
})