import { connect } from "react-redux";
import { toogleIsFetching, toogleIsLogin } from "../../../redux/Reducers/registrationLoginReducer";
import BlogHeader from "../../ClearComponents/Blog/BlogHeader";
import axios from "axios";
import React from "react";

class BlogHeaderContainerClass extends React.Component{
  logout(){
    this.props.toogleIsFetching(true);
    axios.get("/api/user/logout").then(
      (res)=>this.handleLogout(res)
    );
  }
  handleLogout(res){
    this.props.toogleIsFetching(false);
    if (res.data.done){
      this.props.toogleIsLogin(false)
    } else {
      alert("не вийшло")
    }
  }
  render(){
    return (
      <BlogHeader {...this.props} logout={()=>this.logout()}/>
    )
  }
}

const mapStateToProps = (state)=>({
  name: state.regLog.logined.name,
  avatar: state.regLog.logined.avatar,
  isFetching: state.regLog.isFetching,
  isForeign: state.blog.isForeign,
  foreignName: state.blog.foreigned.name,
  foreignAvatar: state.blog.foreigned.avatar,
})

const mapDispatchToProps = {
  toogleIsLogin,
  toogleIsFetching
}


const BlogHeaderContainer = connect(mapStateToProps,mapDispatchToProps)(BlogHeaderContainerClass);

export default BlogHeaderContainer;