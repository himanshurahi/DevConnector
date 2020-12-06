const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    //   date: {
    //     type: Date,
    //     default: Date.now,
    //   },
  },
  {
    timestamps: true,
  }
);

// UserSchema.virtual("profile", {
//   ref: "Profile",
//   localField: "_id",
//   foreignField: "user",
//   justOne: false,
// });

// UserSchema.set("toJSON", { virtuals: true });

let User = mongoose.model("User", UserSchema);
module.exports = User;
