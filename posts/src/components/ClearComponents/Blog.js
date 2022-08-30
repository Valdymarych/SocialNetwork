import axios from 'axios';
import React from 'react';
import avatar from '../../static/undefinedAvatar.jpg'
import PreLoader from "../PreLoader";

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
    console.log("rerender");
    return (
      <div className='Post'>
        <p>{this.props.post.content.text}</p>
        {(this.props.post.uploaded)? undefined:<p>Незагрузилось</p>}
      </div>
    )
  }
}

function Blog(props){
  const posts=props.posts.map((post,i)=>
    (
      <PostContainerClass postUploaded={props.postUploaded} post={post} key={i}/>
    )
  );
  
  const addPost = ()=>{
    props.addPost();
  }

  const onPostChange = (e) => {
    props.setNewPostText(e.target.value);
  }

  return (
    <>
      <header style={{backgroundColor:"blue", height: 120,alignItems:"center",display:"flex"}}>
        <div className="avatar-container">
          <img className="avatar-image" src={avatar}></img>
        </div>
        <h1 style={{marginLeft:60}}>{props.name}</h1>
      </header>
      <div className='Input'>
        <textarea onChange={onPostChange} value={props.newPost.content.text} />
        <button onClick={addPost}>POST</button>
      </div>

      <div className='Blog'>
        {props.isFetching? <PreLoader/> :posts}
      </div>
    </>
  )
}

export default Blog;