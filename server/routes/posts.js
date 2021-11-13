import express from 'express';
import auth from "../middleware/auth.js"
const router=express.Router();



import {getPostBySearch,getPost,createPost,updatePost,deletePost,likePost,getPost2,commentPost} from '../controllers/posts.js';

router.get('/search', getPostBySearch);
router.get('/', getPost);
router.get('/:id', getPost2);
router.post('/',auth, createPost);
router.patch('/:id', auth, updatePost)
router.delete('/:id',auth, deletePost)
router.patch('/:id/likePost',auth,likePost)
router.post('/:id/commentPost',auth,commentPost)

// /posts/${id}/commentPost`


export default router;