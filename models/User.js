const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  roles: { type: [String], default: ["Normal User"] },
  // roles: [{ type: String, default:"Normal User"}],
  active: { type: Boolean, default:true},
  favorites: [{ type : Schema.Types.ObjectId, ref : 'Book'}],
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);