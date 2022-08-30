import mongoose, { Schema } from "mongoose";

const PostSchema = new mongoose.Schema(
    {
        content: {
            text: String,
        },
        user: {type: Schema.Types.ObjectId, ref: "user"}
    }
);

export default mongoose.model("post",PostSchema);
