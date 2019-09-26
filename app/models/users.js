const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  name: { type: String, required: true },
  __v: { type: Number, select: false },
  password: { type: String, required: true, select: false },
  avatar_url: { type: String },
  gender: {
    type: String,
    enum: ["male", "female"],
    default: "male",
    required: true
  },
  headline: { type: String },
  locations: {
    type: [{ type: Schema.Types.ObjectId, ref: "Topics" }],
    select: false
  },
  business: { type: Schema.Types.ObjectId, ref: "Topics", select: false },
  employments: {
    type: [
      {
        company: { type: Schema.Types.ObjectId, ref: "Topics" },
        job: { type: Schema.Types.ObjectId, ref: "Topics" }
      }
    ],
    select: false
  },
  educations: {
    type: [
      {
        school: { type: Schema.Types.ObjectId, ref: "Topics" },
        major: { type: Schema.Types.ObjectId, ref: "Topics" },
        diploma: { type: Number, enum: [1, 2, 3, 4, 5] },
        entrance_year: { type: Number },
        graduation_year: { type: Number }
      }
    ],
    select: false
  },
  following: {
    type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    select: false
  }
});

module.exports = model("User", userSchema);
