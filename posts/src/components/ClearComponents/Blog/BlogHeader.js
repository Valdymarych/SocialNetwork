import avatar from '../../../static/undefinedAvatar.jpg'

function BlogHeader(props){
  return (
    <header style={{backgroundColor:"blue", height: 120,alignItems:"center",display:"flex"}}>
      <div className="avatar-container">
        <img className="avatar-image" src={avatar}></img>
      </div>
      <h1 style={{marginLeft:60}}>{props.name}</h1>
    </header>
  )
}

export default BlogHeader;