const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Comment = new Schema(
  {
    idReview: {
      type: String,
      required: true,
    },
    idUser: {
      type: String,
      required: true,
      default: "xxx",
    },
    name: {
      type: String,
      default: "Anonymous",
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, collection: "comments" }
);

module.exports = mongoose.model("Comment", Comment);
