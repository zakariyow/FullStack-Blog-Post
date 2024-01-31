import express from "express";
import { createPost, deletePost, getAllPosts, getPostInfo, updatePost } from "../controllers/postController.js";
import { authticationUser } from "../middleWare/authMiddleWare.js";
import { validationCrearePost } from "../validations/posts.js";
const postRouter = express.Router();
// postRouter.post('/', validationCrearePost, authticationUser, createPost)
postRouter.route('/:id')
    .get(getPostInfo)
    .put(validationCrearePost, authticationUser, updatePost)
    .delete(authticationUser, deletePost);
postRouter.route('/')
    .get(getAllPosts)
    .post(validationCrearePost, authticationUser, createPost)
export default postRouter;