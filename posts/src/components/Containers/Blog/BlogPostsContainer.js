import { connect } from "react-redux";
import { addPost, setNewPostText, setPosts, toogleIsFetching, postUploaded} from "../../../redux/Reducers/blogReducer";
import BlogPosts from "../../ClearComponents/Blog/BlogPosts";

const mapStateToProps = (state)=>({
  posts: state.blog.posts,
  isFetching: state.blog.isFetching,
  noUploadedCount: state.blog.noUploadedCount
})


const mapDispatchToProps = {
  setNewPostText,
  addPost,
  setPosts,
  toogleIsFetching,
  postUploaded
}


const BlogPostsContainer = connect(mapStateToProps,mapDispatchToProps)(BlogPosts);

export default BlogPostsContainer;