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
const userService_1 = __importDefault(require("./userService"));
function setCookieAndLoginRes(user, res) {
    const logined = {
        name: user.name,
        avatar: user.photos,
        userId: user.id,
    };
    res.cookie("password", user.password);
    res.cookie("auth", true);
    res.cookie("name", user.name);
    res.cookie("userId", user.id);
    return logined;
}
const HTTP = {
    OK_200: 200,
    CREATED_201: 201,
    REDIRECT_300: 302,
    BAD_REQUEST_400: 400
};
class userController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageIndex = Number(req.query.pageIndex);
                const pageSize = Number(req.query.pageSize);
                const usersFound = yield userService_1.default.getAll(pageSize, pageIndex);
                res.status(HTTP.OK_200).json(usersFound);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    getOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query);
                const userFound = yield userService_1.default.getOne("1");
                res.status(HTTP.OK_200).json(userFound);
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
                    const userDeleted = yield userService_1.default.delete(req.query.id);
                    res.status(HTTP.OK_200).json(userDeleted);
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
                console.log(req.query);
                const userUpdated = yield userService_1.default.update(req.body, "1");
                res.status(HTTP.OK_200).json(userUpdated);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    registration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const regResult = yield userService_1.default.registration(req.body.name, req.body.password);
                if (regResult.done && regResult.userCreated) {
                    const logined = setCookieAndLoginRes(regResult.userCreated, res);
                    res.status(HTTP.OK_200).json({ done: true, error: null, logined: logined });
                }
                else {
                    res.status(HTTP.OK_200).json({ done: false, error: regResult.error });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const loginResult = yield userService_1.default.login(req.body.name, req.body.password);
                if (loginResult["auth"] && loginResult.user) {
                    const logined = setCookieAndLoginRes(loginResult.user, res);
                    res.status(HTTP.OK_200).json({ done: true, error: null, logined: logined });
                }
                else {
                    res.status(HTTP.OK_200).send({ done: false, error: loginResult["error"] });
                }
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (let prop in req.cookies) {
                    res.clearCookie(prop);
                }
                res.status(HTTP.OK_200).json({ done: true });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    checkAuth(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const check = yield userService_1.default.checkAuth(req.cookies);
                res.status(HTTP.OK_200).json(check);
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.default = new userController();
