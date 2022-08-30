import { combineReducers, legacy_createStore as createStore } from "redux";
import appReducer from "./Reducers/appReducer";
import blogReducer from "./Reducers/blogReducer";
import registrationLoginReducer from "./Reducers/registrationLoginReducer";
import usersReducer from "./Reducers/usersReducer";

const reducers=combineReducers({
    blog: blogReducer,
    users: usersReducer,
    regLog: registrationLoginReducer,
    app: appReducer
})

const store=createStore(reducers);

window.store=store;

export default store;
