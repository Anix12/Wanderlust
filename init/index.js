const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");


main()
    .then((res) => { console.log("Connection Sucessful with DB") })
    .catch((err) => { console.log(err) });

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/airbub');
}

const initDB = (async () => {
    await Listing.deleteMany({});
    initData.data= initData.data.map((obj)=>({...obj, owner: '6741b9edd1dc848a05d86996' }));
    await Listing.insertMany(initData.data);
    console.log("data Was Initialite");
});

initDB();