import { connect } from "react-redux";
import React from 'react'
import Header from "../ClearComponents/Header";
import axios from "axios";
import { toogleIsLogin, toogleIsFetching} from "../../redux/Reducers/registrationLoginReducer";
class HeaderContainerClass extends React.Component{
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
      <Header {...this.props} logout={()=>this.logout()}/>
    )
  }
}
const mapStateToProps = (state) => ({
  isLogin: state.regLog.isLogin,
  isFetching: state.regLog.isFetching,
})

const mapDispatchToProps={
  toogleIsLogin,
  toogleIsFetching
}

const HeaderContainer = connect(mapStateToProps,mapDispatchToProps)(HeaderContainerClass)

export default HeaderContainer;