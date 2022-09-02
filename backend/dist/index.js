"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const postController_1 = __importDefault(require("./postController"));
const userController_1 = __importDefault(require("./userController"));
const userSchema_1 = __importDefault(require("./Schemas/userSchema"));
const userBlogController_1 = __importDefault(require("./userBlog/userBlogController"));
const app = (0, express_1.default)();
const port = 3001;
const USERNAME = "admin";
const PASSWORD = "user";
const BD_NAME = "test";
const BD_URL = `mongodb+srv://${USERNAME}:${PASSWORD}@cluster0.yqi8l.mongodb.net/${BD_NAME}?retryWrites=true&w=majority`;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)("Покішо так, потім розберусь"));
// app.use('/api/users',cookieChecker);
// app.use('/api/post',cookieChecker);
app.get('/api/post', postController_1.default.getAll);
app.post('/api/post', postController_1.default.create);
app.delete('/api/post', postController_1.default.delete);
app.put('/api/post', postController_1.default.update);
app.get('/api/users', userController_1.default.getAll);
app.delete('/api/users', userController_1.default.delete);
app.put('/api/users', userController_1.default.update);
app.get('/api/userBlog', userBlogController_1.default.getAll);
app.post('/api/userBlog', userBlogController_1.default.create);
app.post('/api/user/reg', userController_1.default.registration);
app.post('/api/user/login', userController_1.default.login);
app.get('/api/user/logout', userController_1.default.logout);
app.get('/api/user/check', userController_1.default.checkAuth);
app.get('/api/userBlog/visit', userBlogController_1.default.visit);
function cookieChecker(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.cookies.auth) {
            const currentUser = (yield userSchema_1.default.find({ "name": req.cookies.name }))[0];
            if (!currentUser) {
                res.send({ done: false, error: "bad username" });
            }
            else if (req.cookies.password === currentUser.password) {
                next();
            }
            else {
                res.send({ done: false, error: "bad password" });
            }
        }
        else {
            res.send({ done: false, error: "you havent login" });
        }
    });
}
function startApp() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(BD_URL, (err) => {
            if (!err) {
                console.log("Connected to database!");
            }
            else {
                console.log("UNconnected to database! <-------------------------------------------------------------");
            }
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });
    });
}
startApp();
