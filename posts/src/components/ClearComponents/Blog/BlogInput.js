function BlogInput(props){
  const addPost = ()=>{
    props.addPost();
  }

  const onPostChange = (e) => {
    props.setNewPostText(e.target.value);
  }
  return (
    <div className='Input'>
      <textarea onChange={onPostChange} value={props.newPost.content.text} />
      <button onClick={addPost}>POST</button>
    </div>
  )
}

export default BlogInput;