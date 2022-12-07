import { model, Schema } from "mongoose";

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true,
      max: 300
    },
    picturePath: {
      type: String,
      default: ""
    },
    likes: {
      type: Map,
      of: Boolean
    },
    comments: {
      type: Array,
      default: []
    },
    userName: String,
    userPicturePath: String,
    location: String,
  },
  {
    timestamps: true
  }
);

// delete fields on convert to json
PostSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    returnedObject.id = returnedObject._id,
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Post = model("Post", PostSchema);

export default Post;
