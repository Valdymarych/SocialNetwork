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
const postService_1 = __importDefault(require("./postService"));
const HTTP = {
    OK_200: 200,
    CREATED_201: 201,
    BAD_REQUEST_400: 400
};
class PostController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postsFounded = yield postService_1.default.getAll();
                res.status(HTTP.OK_200).json(postsFounded);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postFounded = yield postService_1.default.getOne("1");
                res.status(HTTP.OK_200).json(postFounded);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.query.id === undefined) {
                    res.status(HTTP.BAD_REQUEST_400).json("не передано ID ");
                }
                if (typeof req.query.id === "string") {
                    const postDeleted = yield postService_1.default.delete(req.query.id);
                    res.status(HTTP.OK_200).json(postDeleted);
                }
                else {
                    res.status(HTTP.BAD_REQUEST_400).json(`Погане ID, неправильний тип, має бути ( string ) а не ( ${typeof req.query.id} )`);
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postUpdated = yield postService_1.default.update(req.body, "1");
                res.status(HTTP.OK_200).json(postUpdated);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const postCreated = yield postService_1.default.create(req.body);
                res.status(HTTP.CREATED_201).json(postCreated);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new PostController();
