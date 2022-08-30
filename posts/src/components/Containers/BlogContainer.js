import { connect } from "react-redux";
import { addPost, setNewPostText, setPosts, toogleIsFetching, postUploaded} from "../../redux/Reducers/blogReducer";
import Blog from "../ClearComponents/Blog";
import { Component } from "react";
import axios from 'axios'

class BlogContainerClass extends Component{
  componentDidMount(){
    this.getPosts()
  }

  getPosts(){
    this.props.toogleIsFetching(true);
    axios.get('/api/userBlog').then(
      (res)=>this.props.setPosts(res.data)
    ).then(
      ()=>this.props.toogleIsFetching(false)
    );
  }
  render() {
    return (
      <Blog {...this.props}/>
    )
  }
}


const mapStateToProps = (state)=>({

})


const mapDispatchToProps = {
  setPosts,
  toogleIsFetching
}


const BlogContainer = connect(mapStateToProps,mapDispatchToProps)(BlogContainerClass);

export default BlogContainer;