"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var blog_controller_1 = __importDefault(require("../controllers/blog.controller"));
var verify_token_1 = __importDefault(require("../middlewares/verify-token"));
var admin_check_1 = __importDefault(require("../middlewares/admin-check"));
var file_upload_1 = require("../config/file-upload");
var blogRouter = (0, express_1.Router)();
// Create a new blog post
blogRouter.post('/posts', file_upload_1.upload.single('imageUrl'), verify_token_1.default, admin_check_1.default, blog_controller_1.default.createPost);
// Get all blog posts
blogRouter.get('/posts', blog_controller_1.default.getAllPosts);
// Get a specific blog post by ID
blogRouter.get('/posts/:id', blog_controller_1.default.getPostById);
// Update a blog post
blogRouter.put('/posts/:id', verify_token_1.default, admin_check_1.default, blog_controller_1.default.updatePost);
// Delete a blog post
blogRouter.delete('/posts/:id', verify_token_1.default, admin_check_1.default, blog_controller_1.default.deletePost);
exports.default = blogRouter;
//# sourceMappingURL=blog.routes.js.map