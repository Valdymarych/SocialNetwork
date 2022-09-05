import BlogContainer from "./Containers/BlogContainer";
import {Route, Routes } from "react-router-dom"
import UsersContainer from "./Containers/UsersContainer";
import FormRegistrationContainer from "./Containers/FormRegistrationContainer";
import FormLoginContainer from "./Containers/FormLoginContainer";
function Content(){
    return (
        <div className="Content">
            <Routes>
                <Route path="blog" element={<BlogContainer/>}/>
                <Route path="blog/:id" element={<BlogContainer/>}/>
                <Route path="users" element={<UsersContainer/>}/>
                <Route path="regist" element={<FormRegistrationContainer/>}/>
                <Route path="login" element={<FormLoginContainer/>}/>
            </Routes>
        </div>
    )
}

export default Content;