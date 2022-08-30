import express from 'express'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import postController from './postController'
import userController from './userController'
import User from './Schemas/userSchema'
import userBlogController from './userBlog/userBlogController'


const app = express()
const port = 3001

const USERNAME="admin"
const PASSWORD="user"
const BD_NAME="test"

const BD_URL=`mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yqi8l.mongodb.net/${BD_NAME}?retryWrites=true&w=majority`

app.use(express.json());
app.use(cookieParser("Покішо так, потім розберусь"))
// app.use('/api/users',cookieChecker);
// app.use('/api/post',cookieChecker);

app.get('/api/post',postController.getAll);
app.post('/api/post',postController.create);
app.delete('/api/post',postController.delete);
app.put('/api/post',postController.update);

app.get('/api/users',userController.getAll);
app.delete('/api/users',userController.delete);
app.put('/api/users',userController.update);

app.get('/api/userBlog',userBlogController.getAll)
app.post('/api/userBlog',userBlogController.create)

app.post('/api/user/reg',userController.registration)
app.post('/api/user/login',userController.login)
app.get('/api/user/logout',userController.logout)
app.get('/api/user/check',userController.checkAuth)

async function cookieChecker(req:express.Request,res:express.Response,next:Function){
  if (req.cookies.auth){
    const currentUser=(await User.find({"name":req.cookies.name}))[0];
  
    if (!currentUser){
      res.send({done:false,error:"bad username"});
    } else if (req.cookies.password===currentUser.password){
      next();
    } else{
      res.send({done:false,error:"bad password"});
    }
  } else {
    res.send({done:false,error:"you havent login"});
  }
}

async function startApp(){
  mongoose.connect(BD_URL, (err) => {
    if (!err){
      console.log("Connected to database!")
    } else {
      console.log("UNconnected to database! <-------------------------------------------------------------");
      
    }
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

startApp();