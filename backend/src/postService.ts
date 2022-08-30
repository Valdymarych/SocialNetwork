import Post from "./Schemas/postSchema"


class PostService{
    async getAll() {
        const postCreated = await Post.find();
        return postCreated
    }
    
    async getOne(id:String) {
        const postFound = await Post.findById(id);
        return postFound;
    }

    async create(post:Object) {
        const postCreated = await Post.create(post);
        return postCreated;
    }

    async delete(id:string) {
        const postDeleted = await Post.findByIdAndDelete(id);
        return postDeleted;
    }

    async update(post:Object,id:String) {
        const postUpdated = await Post.findByIdAndUpdate(id,post,{new:true});
        return postUpdated;
    } 

}

export default new PostService();