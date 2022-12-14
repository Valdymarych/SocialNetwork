import express, { query } from "express"
import UserBlogService from "./userBlogService";
import UserService from "../userService";
const HTTP={
  OK_200:200,
  CREATED_201:201,

  BAD_REQUEST_400:400
}

class UserBlogController{
  async getAll(req:express.Request,res:express.Response){
    try{
      const postsFounded=await UserBlogService.getAll(req.cookies.userId);
      res.status(HTTP.OK_200).json(postsFounded);
    } catch (e){
      console.log(e);
    } 
  }

  async create(req:express.Request,res:express.Response){
    try{
      const dataCreated=await UserBlogService.create(req.cookies.userId,req.body)
      res.status(HTTP.OK_200).json(dataCreated);
    } catch (e){
      console.log(e);
    }
  }

  async visit(req:express.Request,res:express.Response) {
    try {
      if (typeof req.query.id==="string"){
        const userData=await UserBlogService.visit(req.query.id);
        res.status(HTTP.OK_200).json(userData);
      }
    } catch (e) {
      console.log(e);
    }
  }
}

export default new UserBlogController();