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
const userSchema_1 = __importDefault(require("./Schemas/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userBlogSchema_1 = __importDefault(require("./userBlog/userBlogSchema"));
class userService {
    getAll(pageSize, pageIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const usersFound = yield userSchema_1.default.find().skip(pageSize * pageIndex).limit(pageSize);
            const totalCount = yield userSchema_1.default.find().count();
            const result = {
                users: usersFound,
                totalCount: totalCount
            };
            return result;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userFound = yield userSchema_1.default.findById(id);
            return userFound;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userDeleted = yield userSchema_1.default.findByIdAndDelete(id);
            return userDeleted;
        });
    }
    update(user, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const userUpdated = yield userSchema_1.default.findByIdAndUpdate(id, user, { new: true });
            return userUpdated;
        });
    }
    registration(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (yield userSchema_1.default.find({ name: name }))[0];
            if (currentUser) {
                return { done: false, error: `USER '${currentUser.name}' EXIST`, userCreated: null };
            }
            else {
                const blog = yield userBlogSchema_1.default.create({ posts: [] });
                const passwordToSave = yield bcrypt_1.default.hash(password, 10);
                const userCreated = yield userSchema_1.default.create({ name: name, password: passwordToSave, blog: blog });
                blog.user = userCreated.id;
                yield blog.save();
                return { done: true, error: null, userCreated: userCreated };
            }
        });
    }
    login(name, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (yield userSchema_1.default.find({ name: name }))[0];
            let isPassword = false;
            if (currentUser) {
                if (currentUser.password) {
                    isPassword = yield bcrypt_1.default.compare(password, currentUser.password);
                    if (isPassword) {
                        return { "auth": true, "password": currentUser.password, "user": currentUser };
                    }
                    else {
                        return { "auth": false, "error": "неправильний password", "user": null };
                    }
                }
                else {
                    return { "auth": false, "error": "не переданий password", "user": null };
                }
            }
            else {
                return { "auth": false, "error": `не існує usera ${name}`, "user": null };
            }
        });
    }
    checkAuth(cookies) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = (yield userSchema_1.default.find({ name: cookies.name }))[0];
            if (currentUser) {
                if (currentUser.password === cookies.password) {
                    const logined = {
                        name: currentUser.name,
                        avatar: currentUser.photos,
                        blog: currentUser.blog
                    };
                    return { "auth": true, "logined": logined };
                }
                else {
                    return { "auth": false, "error": "неправильний пароль", "logined": null };
                }
            }
            else {
                return { "auth": false, "error": `не існує '${cookies.name}'`, "logined": null };
            }
        });
    }
}
exports.default = new userService();
