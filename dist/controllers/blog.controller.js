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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var BlogController = /** @class */ (function () {
    function BlogController() {
    }
    BlogController.createPost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, category, contentheading, contentdiscription, imageUrl, user, post, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, title = _a.title, category = _a.category, contentheading = _a.contentheading, contentdiscription = _a.contentdiscription, imageUrl = _a.imageUrl;
                        if (!title || !contentheading || !imageUrl) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: 'Required body params are missing' })];
                        }
                        user = req.user;
                        return [4 /*yield*/, index_1.prisma.post.create({
                                data: {
                                    userId: user.id,
                                    title: title,
                                    category: category,
                                    contentheading: contentheading,
                                    contentdiscription: contentdiscription,
                                    imageUrl: imageUrl,
                                },
                            })];
                    case 1:
                        post = _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, data: post })];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Something went wrong',
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BlogController.getAllPosts = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, page, _c, limit, parsedPage, parsedLimit, offset, posts, error_2;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.limit, limit = _c === void 0 ? 10 : _c;
                        parsedPage = parseInt(page.toString(), 10);
                        parsedLimit = parseInt(limit.toString(), 10);
                        offset = (parsedPage - 1) * parsedLimit;
                        return [4 /*yield*/, index_1.prisma.post.findMany({
                                skip: offset,
                                take: parsedLimit,
                                orderBy: {
                                    createdAt: 'desc',
                                }
                            })];
                    case 1:
                        posts = _d.sent();
                        return [2 /*return*/, res.status(200).send({ success: true, data: { posts: posts } })];
                    case 2:
                        error_2 = _d.sent();
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BlogController.getPostById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, post, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, index_1.prisma.post.findUnique({ where: { id: id } })];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, res.status(404).send({ success: false, message: 'Blog Post Not Found' })];
                        }
                        return [2 /*return*/, res.status(200).send({ success: true, data: post })];
                    case 2:
                        error_3 = _a.sent();
                        return [2 /*return*/, res.status(500).send({ success: false, message: 'Something went wrong' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    BlogController.updatePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, contentheading, category, contentdiscription, imageUrl, id, user, post, updatedPost, error_4;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = req.body, title = _a.title, contentheading = _a.contentheading, category = _a.category, contentdiscription = _a.contentdiscription, imageUrl = _a.imageUrl;
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: 'Post ID is required for this operation' })];
                        }
                        if (!title || !contentheading || !imageUrl) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: 'Required body params are missing' })];
                        }
                        user = req.user;
                        return [4 /*yield*/, index_1.prisma.post.findFirst({ where: { id: id, userId: user.id } })];
                    case 1:
                        post = _b.sent();
                        if (!post) {
                            return [2 /*return*/, res.status(404).json({ success: true, message: 'Post not found' })];
                        }
                        if (post.userId !== user.id) {
                            return [2 /*return*/, res.status(403).json({ success: true, message: 'Unauthorized Access' })];
                        }
                        return [4 /*yield*/, index_1.prisma.post.update({
                                where: { id: id },
                                data: {
                                    title: title,
                                    category: category,
                                    contentheading: contentheading,
                                    contentdiscription: contentdiscription,
                                    imageUrl: imageUrl,
                                },
                            })];
                    case 2:
                        updatedPost = _b.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, data: updatedPost })];
                    case 3:
                        error_4 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Something went wrong',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    BlogController.deletePost = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, user, post, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ success: true, message: 'Post ID is required for this operation' })];
                        }
                        user = req.user;
                        return [4 /*yield*/, index_1.prisma.post.findFirst({ where: { id: id, userId: user.id } })];
                    case 1:
                        post = _a.sent();
                        if (!post) {
                            return [2 /*return*/, res.status(404).json({ success: true, message: 'Post not found' })];
                        }
                        if (post.userId !== user.id) {
                            return [2 /*return*/, res.status(403).json({ success: true, message: 'Unauthorized Access' })];
                        }
                        return [4 /*yield*/, index_1.prisma.post.delete({
                                where: { id: id },
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, res.status(200).json({ success: true, message: 'Post deleted' })];
                    case 3:
                        error_5 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                success: false,
                                message: 'Something went wrong',
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BlogController;
}());
exports.default = BlogController;
//# sourceMappingURL=blog.controller.js.map