import UserBlog from "./userBlogSchema"
import postService from "../postService";
class UserBlogService{
  async getAll(userId:string) {
    const blog=(await UserBlog.findOne({user:userId}));
    await blog?.populate("posts")
    return blog?.posts;
  }

  async create(userId:string,post:Object) {
    const blog=(await UserBlog.findOne({user:userId}));
    if (blog){
      if (blog.posts){
        const postCreated = await postService.create(post)
        blog.posts.push(postCreated.id);
        await blog.save();
        return {done:true,postCreated:postCreated};
      } else {
        return {done:false}
      }
    } else {
      return {done:false}
    }
  }
}

export default new UserBlogService();