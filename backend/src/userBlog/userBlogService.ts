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

  async visit(userId:string) {
    const blog=(await UserBlog.findOne({user:userId}));
    await (await blog?.populate("posts"))?.populate("user");
    console.log(blog);
    
    const result = {
      posts: blog?.posts,
      user: blog?.user
    }
    return result;
  }
}

export default new UserBlogService();