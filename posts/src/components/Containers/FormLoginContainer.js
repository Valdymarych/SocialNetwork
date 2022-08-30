import { connect } from "react-redux"
import { setLoginPassword, setLoginName, toogleIsFetching, toogleIsLogin } from "../../redux/Reducers/registrationLoginReducer"
import { FormLogin } from "../ClearComponents/FormLogin"
import React from "react";
import axios from "axios";
import { Navigate } from "react-router-dom"

class FormLoginClass extends React.Component {

  onSubmit(e){
    e.preventDefault();
    this.props.toogleIsFetching(true);
    const data=new FormData(e.target);
    const jsonData={};
    for (let key of data.keys()) {
      jsonData[key]=data.get(key);
    }
    axios.post(e.target.action,jsonData).then(
      (res)=>this.handleResponse(res.data)
    );
  }
  handleResponse(data){
    this.props.toogleIsFetching(false);
    if (data.done){
      this.props.toogleIsLogin(true,data.logined);
      this.props.setLoginPassword("");
      this.props.setLoginName("");

    } else {
      alert(data.error);
    }
  }
  render(){
    if (this.props.isLogin){
      return (
        <Navigate to="/blog" />
      )
    }
    return (
      <FormLogin {...this.props} onSubmit={(e)=>this.onSubmit(e)} />
    );
  }
}

const mapStateToProps=(state)=>({
  logName: state.regLog.login.name,
  logPassword: state.regLog.login.password,
  isFetching: state.regLog.isFetching
})

const mapDispatchToProps={
  setLoginName,
  setLoginPassword,
  toogleIsFetching,
  toogleIsLogin
}

const FormLoginContainer = connect(mapStateToProps,mapDispatchToProps)(FormLoginClass)

export default FormLoginContainer;