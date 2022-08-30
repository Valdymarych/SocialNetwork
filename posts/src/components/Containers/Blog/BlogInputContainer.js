import { connect } from "react-redux";
import BlogInput from "../../ClearComponents/Blog/BlogInput";
import { addPost, setNewPostText} from "../../../redux/Reducers/blogReducer";

const mapStateToProps = (state)=>({
  posts: state.blog.posts,
  newPost: state.blog.newPost,
})


const mapDispatchToProps = {
  setNewPostText,
  addPost
}


const BlogInputContainer = connect(mapStateToProps,mapDispatchToProps)(BlogInput);

export default BlogInputContainer;