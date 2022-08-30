import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
    {
        "name": {type: String, require:true},
        "photos": {type:String, default:"urltophoto"},
        "password": {type: String, require:true},
        "blog": {type: Schema.Types.ObjectId, ref:"userBlog"}
    },
);

export default mongoose.model("user",UserSchema);