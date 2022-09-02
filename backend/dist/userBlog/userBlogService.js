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
const userBlogSchema_1 = __importDefault(require("./userBlogSchema"));
const postService_1 = __importDefault(require("../postService"));
class UserBlogService {
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = (yield userBlogSchema_1.default.findOne({ user: userId }));
            yield (blog === null || blog === void 0 ? void 0 : blog.populate("posts"));
            return blog === null || blog === void 0 ? void 0 : blog.posts;
        });
    }
    create(userId, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const blog = (yield userBlogSchema_1.default.findOne({ user: userId }));
            if (blog) {
                if (blog.posts) {
                    const postCreated = yield postService_1.default.create(post);
                    blog.posts.push(postCreated.id);
                    yield blog.save();
                    return { done: true, postCreated: postCreated };
                }
                else {
                    return { done: false };
                }
            }
            else {
                return { done: false };
            }
        });
    }
    visit(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const blog = (yield userBlogSchema_1.default.findOne({ user: userId }));
            yield ((_a = (yield (blog === null || blog === void 0 ? void 0 : blog.populate("posts")))) === null || _a === void 0 ? void 0 : _a.populate("user"));
            console.log(blog);
            const result = {
                posts: blog === null || blog === void 0 ? void 0 : blog.posts,
                user: blog === null || blog === void 0 ? void 0 : blog.user
            };
            return result;
        });
    }
}
exports.default = new UserBlogService();
