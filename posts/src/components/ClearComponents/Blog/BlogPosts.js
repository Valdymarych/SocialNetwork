import React from "react"
import PreLoader from "../../PreLoader";
import axios from "axios"
class PostContainerClass extends React.Component{
  componentDidMount(){
    if (!this.props.post.uploaded){
      axios.post("/api/userBlog",this.props.post).then(
        (res)=>this.handleResponse(res.data)
      );
    }
  }
  handleResponse(data){
    if (data.done){
      this.props.postUploaded(this.props.post.onUpload,data.postCreated);
    } else {
      alert("не вдалось загрузити")
    }
  }
  render(){
    return (
      <div className='Post'>
        <p>{this.props.post.content.text}</p>
        {(this.props.post.uploaded)? undefined:<p>Незагрузилось</p>}
      </div>
    )
  }
}


function BlogPosts(props){
  const posts=props.posts.map((post)=>
    (
      <PostContainerClass key={post._id} postUploaded={props.postUploaded} post={post} />
    )
  );
  return (
    <div className='Blog'>
      {props.isFetching? <PreLoader/> :posts}
  </div>
  )
}
export default BlogPosts;