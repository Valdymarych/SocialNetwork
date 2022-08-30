import avatar from '../../../static/undefinedAvatar.jpg'
import PreLoader from '../../PreLoader';

function BlogHeader(props){
  return (
    <header style={{backgroundColor:"blue", height: 120,alignItems:"center",display:"flex"}}>
      <div className="avatar-container">
        <img className="avatar-image" src={avatar}></img>
      </div>
      <h1 style={{marginLeft:60}}>{props.name}</h1>
      
      <div className="text-end">
        {props.isFetching? (<PreLoader width={32} color="rgb(255,255,255)"/>): (<button type="button" onClick={props.logout} className="btn btn-outline-light me-2">Logout</button>)}
      </div>
    </header>
  )
}

export default BlogHeader;