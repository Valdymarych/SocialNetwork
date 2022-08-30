import express, { query } from "express"
import postService from "./postService";

const HTTP={
    OK_200:200,
    CREATED_201:201,

    BAD_REQUEST_400:400
}

class PostController{
    async getAll(req:express.Request,res:express.Response){
        try{
            const postsFounded=await postService.getAll();
            res.status(HTTP.OK_200).json(postsFounded);
        } catch (e){
            console.log(e);
        } 
    }

    async getOne(req:express.Request,res:express.Response){
        try{
            console.log(req.query);
            const postFounded=await postService.getOne("1");
            res.status(HTTP.OK_200).json(postFounded);
        } catch (e){
            console.log(e);
        } 
    }

    async delete(req:express.Request,res:express.Response){
        try{
            if (req.query.id===undefined){
                res.status(HTTP.BAD_REQUEST_400).json("не передано ID ");
            }
            if (typeof req.query.id ==="string"){
                const postDeleted=await postService.delete(req.query.id);
                res.status(HTTP.OK_200).json(postDeleted);
            } else {
                res.status(HTTP.BAD_REQUEST_400).json(`Погане ID, неправильний тип, має бути ( string ) а не ( ${typeof req.query.id} )`);
            }
        } catch (e){
            console.log(e);
        } 
    }

    async update(req:express.Request,res:express.Response){
        try{
            console.log(req.query);
            const postUpdated=await postService.update(req.body,"1");
            res.status(HTTP.OK_200).json(postUpdated);
        } catch (e){
            console.log(e);
        } 
    }

    async create(req:express.Request,res:express.Response){
        try{
            const postCreated=await postService.create(req.body);
            res.status(HTTP.CREATED_201).json(postCreated);
        } catch (e){
            console.log(e);
        } 
    }
}

export default new PostController();