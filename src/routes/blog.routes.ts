import { Router } from 'express';
import BlogController from '../controllers/blog.controller';

const blogRouter = Router();

// Create a new blog post
blogRouter.post('/posts', BlogController.createPost);

// Get all blog posts
blogRouter.get('/posts', BlogController.getAllPosts);

// Get a specific blog post by ID
blogRouter.get('/posts/:id', BlogController.getPostById);

// Update a blog post
blogRouter.put('/posts/:id', BlogController.updatePost);

// Delete a blog post
blogRouter.delete('/posts/:id', BlogController.deletePost);

export default blogRouter;
