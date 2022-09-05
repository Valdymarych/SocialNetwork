import { connect } from "react-redux";
import { setForeigned, setPosts, toogleIsFetching, toogleIsForeign} from "../../redux/Reducers/blogReducer";
import Blog from "../ClearComponents/Blog";
import { Component } from "react";
import axios from 'axios'
import { Route, Routes, useParams } from "react-router-dom";

function BlogWithUrl(props){
  const { id } = useParams();
  return (
    <BlogContainerClass {...props} id={id} isForeign={!!id}/>
  )
}

class BlogContainerClass extends Component{
  componentDidMount(){
    this.props.toogleIsForeign(this.props.isForeign);
    if (this.props.isForeign){
      this.getVisit()
    } else {
      this.getPosts()
    }
  }
  getVisit(){
    this.props.toogleIsFetching(true);
    axios.get(`/api/userBlog/visit?id=${this.props.id}`).then(
      (res)=>{
        this.props.setPosts(res.data.posts)
        this.props.setForeigned(res.data.user.name,res.data.user.photos)
      }
    ).then(
      ()=>this.props.toogleIsFetching(false)
    )
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
  isForeign: state.blog.isForeign
})


const mapDispatchToProps = {
  setPosts,
  toogleIsFetching,
  toogleIsForeign,
  setForeigned
}


const BlogContainer = connect(mapStateToProps,mapDispatchToProps)(BlogWithUrl);

export default BlogContainer;