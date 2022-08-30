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
const postSchema_1 = __importDefault(require("./Schemas/postSchema"));
class PostService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const postCreated = yield postSchema_1.default.find();
            return postCreated;
        });
    }
    getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postFound = yield postSchema_1.default.findById(id);
            return postFound;
        });
    }
    create(post) {
        return __awaiter(this, void 0, void 0, function* () {
            const postCreated = yield postSchema_1.default.create(post);
            return postCreated;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postDeleted = yield postSchema_1.default.findByIdAndDelete(id);
            return postDeleted;
        });
    }
    update(post, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const postUpdated = yield postSchema_1.default.findByIdAndUpdate(id, post, { new: true });
            return postUpdated;
        });
    }
}
exports.default = new PostService();
