const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const topicsSchema = new Schema({
  __v: { type: Number, select: false },
  name: { type: String, required: true },
  avatar_url: { type: String },
  introduction: { type: String, select: false },
},{timestamps: true});

module.exports = model("Topics", topicsSchema);
