import User from "./Schemas/userSchema"
import bcrypt from "bcrypt";
import UserBlog from "./userBlog/userBlogSchema";

class userService{
    async getAll(pageSize:number,pageIndex:number) {
        const usersFound = await User.find().skip(pageSize*pageIndex).limit(pageSize);
        const totalCount = await User.find().count();
        const result = {
            users: usersFound,
            totalCount: totalCount
        }
        return result
    }
    
    async getOne(id:String) {
        const userFound = await User.findById(id);
        return userFound;
    }

    async delete(id:string) {
        const userDeleted = await User.findByIdAndDelete(id);
        return userDeleted;
    }

    async update(user:Object,id:String) {
        const userUpdated = await User.findByIdAndUpdate(id,user,{new:true});
        return userUpdated;
    } 
    
    async registration(name:String, password:string) {

        const currentUser=(await User.find({name:name}))[0];
        if (currentUser){
            return {done:false,error:`USER '${currentUser.name}' EXIST`,userCreated:null}
        } else {
            const blog = await UserBlog.create({posts:[]});
            const passwordToSave=await bcrypt.hash(password,10);
            const userCreated = await User.create({name:name,password:passwordToSave,blog:blog});
            blog.user=userCreated.id;
            await blog.save();
            return {done:true,error:null,userCreated:userCreated} ;
        }
    }

    async login(name:string,password:string){
        const currentUser=(await User.find({name:name}))[0];
        let isPassword=false;
        
        if (currentUser){
            if (currentUser.password){
                isPassword = await bcrypt.compare(password,currentUser.password);
                if (isPassword){

                    return {"auth":true,"password":currentUser.password,"user":currentUser};
                } else {
                    return {"auth":false,"error":"неправильний password","user":null}
                }
            } else {
                return {"auth":false,"error":"не переданий password","user":null}
            }
        } else {
            return {"auth":false,"error":`не існує usera ${name}`,"user":null}
        }
    }

    async checkAuth(cookies:any){
        const currentUser=(await User.find({name:cookies.name}))[0];
        if (currentUser){
            if (currentUser.password===cookies.password){
                const logined={
                    name: currentUser.name,
                    avatar: currentUser.photos,
                    blog: currentUser.blog
                }
                return {"auth":true,"logined":logined}
            } else {
                return {"auth":false,"error":"неправильний пароль","logined":null}
            }
        } else {
            return {"auth":false,"error":`не існує '${cookies.name}'`,"logined":null}
        }
    }

}

export default new userService();