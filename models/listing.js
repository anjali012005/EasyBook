const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { application } = require("express");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews : [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: String,
  //   enum: ["mountains", ""]
  // }
});

listingSchema.post("findOneDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany( {_id: { $in: listing.reviews}});
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;