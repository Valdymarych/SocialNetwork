import { connect } from "react-redux"
import { setRegName, setRegPassword, toogleIsFetching, toogleIsLogin } from "../../redux/Reducers/registrationLoginReducer"
import { FormRegistration } from "../ClearComponents/FormRegistration"
import React from "react";

import { Navigate } from "react-router-dom"
import axios from "axios";

class FormRegistrationClass extends React.Component {
  async onSubmit(e){
    e.preventDefault();
    this.props.toogleIsFetching(true);
    const data=new FormData(e.target);
    const jsonData={};
    for (let key of data.keys()) {
      jsonData[key]=data.get(key);
    }
    axios.post(e.target.action,jsonData).then(
      (res)=>this.handleResponse(res.data)
    )
  }
  handleResponse(data){
    this.props.toogleIsFetching(false);
    if (data.done){
      this.props.toogleIsLogin(true,data.logined);
      this.props.setRegPassword("");
      this.props.setRegName("");
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
      <FormRegistration {...this.props} onSubmit={(e)=>this.onSubmit(e)} />
    );
  }
}

const mapStateToProps=(state)=>({
  regName: state.regLog.reg.name,
  regPassword: state.regLog.reg.password,
  isFetching: state.regLog.isFetching
})

const mapDispatchToProps={
  setRegName,
  setRegPassword,
  toogleIsFetching,
  toogleIsLogin
}

const FormRegistrationContainer = connect(mapStateToProps,mapDispatchToProps)(FormRegistrationClass)

export default FormRegistrationContainer;