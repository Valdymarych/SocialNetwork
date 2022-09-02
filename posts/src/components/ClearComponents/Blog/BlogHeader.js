import avatar from '../../../static/undefinedAvatar.jpg'
import PreLoader from '../../PreLoader';
import styles from "./Blog.module.css"
function BlogHeader(props){
  const logout = (props.foreign? <></>:
    <div className={styles.flexEnd}>
      {props.isFetching? (<PreLoader width={32} color="rgb(51,51,51)"/>): (<button type="button" onClick={props.logout} className={`${styles.logout} btn btn-outline-light me-2`}>Logout</button>)}
    </div>
  )
  return (
    <header style={{backgroundColor:"blue", height: 120,alignItems:"center",display:"flex"}}>
      <div className="avatar-container">
        <img className="avatar-image" src={avatar}></img>
      </div>
      <h1 style={{marginLeft:60}}>{props.name}</h1>
      {logout}
    </header>
  )
}

export default BlogHeader;