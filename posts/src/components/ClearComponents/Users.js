import PreLoader from "../PreLoader"
import avatar from '../../static/undefinedAvatar.jpg'
function Avatar(props){
  const url = props.photo==="urltophoto"? avatar : props.photo
  const style={
    clipPath: "circle(50% at 50% 50%)",
    backgroundSize: "cover"
  }
  return (
    <img src={url} style={style}/>
  );
}

function Users(props){
  const users=props.users.map((user)=>
    (
      <div className="User" key={user._id}>
        <Avatar photo={user.photos} />
        <p>{user.name}</p>
      </div>
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