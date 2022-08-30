import mongoose, { Schema } from "mongoose";

const UserBlogSchema = new Schema(
    {
      "posts":[
        {type: Schema.Types.ObjectId, ref:"post"}
      ],
      "user":{type:Schema.Types.ObjectId, ref:"user"}
    },
);

export default mongoose.model("userBlog",UserBlogSchema);