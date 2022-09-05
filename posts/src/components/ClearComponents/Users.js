import PreLoader from "../PreLoader"
import avatar from '../../static/undefinedAvatar.jpg'
import { NavLink } from "react-router-dom";
export function Avatar(props){
  const url = props.photo==="urltophoto"? avatar : props.photo
  return (
    <img src={url} className={props.className}/>
  );
}

function Users(props){
  const users=props.users.map((user)=>
    (
      <NavLink to={`/blog/${user._id}`} className="User" key={user._id}>
        <Avatar photo={user.photos} className="Avatar_mini" />
        <p>{user.name}</p>
      </NavLink>
    )
  );
  const pages=(new Array(Math.ceil(props.total/props.pageSize))).fill().map((_,index)=>
    (
      <div className={index===props.currentPage? "active":undefined} key={index}>
        <button onClick={()=>props.onPageChange(index)}>
          {index+1}
        </button>
      </div>
    )
  );
  
  if (props.isFetching){
    return (
      <div className="users-container">
        <PreLoader/>
      </div>
    );
  }

  return (
    <>
      <div className='users-container'>
        {users}
      </div>
      <div className="pages">
        {pages}
      </div>
    </>
  )
}

export default Users;