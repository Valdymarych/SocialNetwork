const SET_REG_NAME="REQLOG_SET_REG_NICKNAME"
const SET_REG_PASSWORD="REQLOG_SET_REG_PASSWORD"

const SET_LOGIN_NAME="REQLOG_SET_LOGIN_NICKNAME"
const SET_LOGIN_PASSWORD="REQLOG_SET_LOGIN_PASSWORD"

const TOOGLE_IS_FETCHING="REQLOG_TOOGLE_IS_FETCHING"
const TOOGLE_IS_LOGIN="REQLOG_TOOGLE_IS_LOGIN"


const initState={
  login: {
    name: "",
    password: ""
  },
  reg: {
    name: "",
    password: ""
  },
  logined: {
    name: "",
    avatar: null
  },
  isLogin: false,
  isFetching: false
}

function registrationLoginReducer(state=initState,action){
  let stateCopy={...state};

  switch (action.type){
    case SET_LOGIN_NAME:{
      stateCopy={
        ...state,
        login: {
          ...state.login,
          name: action.name
        }
      }
      break;
    }
    case SET_LOGIN_PASSWORD:{
      stateCopy={
        ...state,
        login: {
          ...state.login,
          password: action.password
        }
      }
      break;
    }
    case SET_REG_NAME:{
      stateCopy={
        ...state,
        reg: {
          ...state.reg,
          name: action.name
        }
      }
      break;
    }
    case SET_REG_PASSWORD:{

      stateCopy={
        ...state,
        reg: {
          ...state.reg,
          password: action.password
        }
      }
      break;
    }
    case TOOGLE_IS_FETCHING:{
      stateCopy={
        ...state,
        isFetching:action.isFetching
      }
      break;
    }
    case TOOGLE_IS_LOGIN:{
      stateCopy={
        ...state,
        isLogin:action.isLogin,
        logined:action.logined
      }
      break;
    }
    default: {
      break
    }
  }
  return stateCopy;
}

export const setRegName = (name) => ({
  type: SET_REG_NAME,
  name: name
});
export const setRegPassword = (password) => ({
  type: SET_REG_PASSWORD,
  password: password
});
export const setLoginName = (name) => ({
  type: SET_LOGIN_NAME,
  name: name
});
export const setLoginPassword = (password) => ({
  type: SET_LOGIN_PASSWORD,
  password: password
});
export const toogleIsFetching = (isFetching) => ({
  type: TOOGLE_IS_FETCHING,
  isFetching: isFetching
});
export const toogleIsLogin= (isLogin,logined) => ({
  type: TOOGLE_IS_LOGIN,
  isLogin: isLogin,
  logined: logined
});

export default registrationLoginReducer;