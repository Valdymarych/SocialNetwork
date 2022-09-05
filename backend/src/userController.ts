import express from "express"
import userService from "./userService";
function setCookieAndLoginRes(user:any,res:express.Response){
    const logined={
        name: user.name,
        avatar: user.photos,
        userId: user.id,
    }
    res.cookie("password",user.password);
    res.cookie("auth",true);
    res.cookie("name",user.name);
    res.cookie("userId",user.id)
    return logined;
}
const HTTP={
    OK_200:200,
    CREATED_201:201,

    REDIRECT_300: 302,

    BAD_REQUEST_400:400
}


async function getOne(req:express.Request,res:express.Response){
    try{
        if (typeof req.query.id==="string"){
            const userFound=await userService.getOne(req.query.id);
            res.status(HTTP.OK_200).json(userFound);
        }
    } catch (e){
        console.log(e);
    } 
}

class userController{
    async getAll(req:express.Request,res:express.Response){
        try{
            const pageIndex:number=Number(req.query.pageIndex);
            const pageSize:number=Number(req.query.pageSize);
            const usersFound=await userService.getAll(pageSize, pageIndex,req.cookies.userId);
            
            res.status(HTTP.OK_200).json(usersFound);
        } catch (e){
            console.log(e);
        }
    }

    async getOne(req:express.Request,res:express.Response) {
        await getOne(req,res);
    }

    async delete(req:express.Request,res:express.Response){
        try{
            if (req.query.id===undefined){
                res.status(HTTP.BAD_REQUEST_400).json("не передано ID ");
            }
            if (typeof req.query.id ==="string"){
                const userDeleted=await userService.delete(req.query.id);
                res.status(HTTP.OK_200).json(userDeleted);
            } else {
                res.status(HTTP.BAD_REQUEST_400).json(`Погане ID, неправильний тип, має бути ( string ) а не ( ${typeof req.query.id} )`);
            }
        } catch (e){
            console.log(e);
        } 
    }

    async update(req:express.Request,res:express.Response){
        try{
            const userUpdated=await userService.update(req.body,"1");
            res.status(HTTP.OK_200).json(userUpdated);
        } catch (e){
            console.log(e);
        } 
    }

    async registration(req: express.Request, res: express.Response){
        try{
            const regResult = await userService.registration(req.body.name,req.body.password);
            if (regResult.done && regResult.userCreated){
                const logined = setCookieAndLoginRes(regResult.userCreated,res);
                res.status(HTTP.OK_200).json({done:true,error:null,logined:logined});
            } else {
                res.status(HTTP.OK_200).json({done:false,error:regResult.error});
            }            
        } catch (e){
            console.log(e);
        }
    }

    async login(req: express.Request, res: express.Response){
        try{
            const loginResult = await userService.login(req.body.name,req.body.password);
            if (loginResult["auth"]&&loginResult.user){
                const logined = setCookieAndLoginRes(loginResult.user,res);
                res.status(HTTP.OK_200).json({done:true,error:null,logined:logined})
            } else{
                res.status(HTTP.OK_200).send({done:false,error:loginResult["error"]});
            }
        } catch(e){
            console.log(e);
        }
    }



    async logout(req: express.Request, res: express.Response){
        try{
            for (let prop in req.cookies) {
                res.clearCookie(prop);
            }
            res.status(HTTP.OK_200).json({done:true})
        } catch(e) {
            console.log(e);
        }
    }

    async checkAuth(req: express.Request, res: express.Response){
        try{
            const check=await userService.checkAuth(req.cookies);
            res.status(HTTP.OK_200).json(check);
        } catch(e) {
            console.log(e);
        }
    }
}

export default new userController();