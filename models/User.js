import { model, Schema } from "mongoose";

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 100
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true
    },
    password: {
      type: String,
      required: true,
      min: 6
    },
    picturePath: {
      type: String,
      default: ""
    },
    friends: {
      type: Array,
      default: []
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number
  },
  {
    timestamps: true
  }
);

const User = model("User", UserSchema);
export default User;
