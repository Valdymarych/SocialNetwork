import { connect } from "react-redux"
import React from "react"
import App from "./App";
import { Routes, Route } from 'react-router-dom';
import FormLoginContainer from "./components/Containers/FormLoginContainer";
import FormRegistrationContainer from "./components/Containers/FormRegistrationContainer";
import cookie from "cookie"
import axios from "axios";
import { toogleIsLogin } from "./redux/Reducers/registrationLoginReducer"
import { toogleIsFetching } from "./redux/Reducers/appReducer"
import PreLoader from "./components/PreLoader";
class AppContainerClass extends React.Component {
  componentDidMount(){
    const auth=cookie.parse(document.cookie).auth==="true";
    
    if (auth){
      this.props.toogleIsFetching(true);
      axios.get('/api/user/check').then(
        (res)=>this.handleResponse(res.data)
      );
    }
  }
  handleResponse(data){
    this.props.toogleIsFetching(false);
    if (data.auth){
      this.props.toogleIsLogin(true,data.logined);
    } else {
      alert(data.error);
    }
  }
  render(){
    if (this.props.isFetching){
      return (
        <div className="preloader-center-container">
          <PreLoader/>
        </div>
      )
    }
    return (
      <Routes>
        <Route path="/*" element={<App isLogin={this.props.isLogin} />} />
        <Route path="/regist" element={<FormRegistrationContainer isLogin={this.props.isLogin} />} />
        <Route path="/login" element={<FormLoginContainer isLogin={this.props.isLogin} />}/>
      </Routes>
    );
  }
}

const mapStateToProps=(state)=>({
  isLogin: state.regLog.isLogin,
  isFetching: state.app.isFetching
})

const mapDispatchToProps={
  toogleIsFetching,
  toogleIsLogin,
}

const AppContainer = connect(mapStateToProps,mapDispatchToProps)(AppContainerClass)

export default AppContainer