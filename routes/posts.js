const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

router.get('/', async (request, response) => {
	try {
		const posts = await Post.find();
		response.json(posts);
	} catch (error) {
		response.send({message:error});
	}
});

router.post('/', async (request, response) => {
	const post = new Post({
		title: request.body.title,
		description: request.body.description
	});

	try {
		const savedPost = await post.save();
		response.json(savedPost);
	} catch (error) {
		response.json({ message: error });
	}
});

router.get('/:postId', async (request, response) => {
	try{
		const post = await Post.findById(request.params.postId);
		response.json(post);
		//console.log(request.params.postId);
	} catch (error) {
		response.json({ message: error });
	}
});

router.delete('/:postId', async (request, response) => {
	try {
		const removedPost = Post.remove({ _id: request.params.postId });
		response.json(removedPost);
	} catch (error) {
		response.json({ message: error });
	}
});

router.patch('/:postId', (request, response) => {
	try {
		const updatedPost = Post.updateOne(
			{ _id: request.params.postId },
			{ $set: {title: request.body.title } }
			);
		response.json(updatedPost);
	} catch (error) {
		response.json({ message: error })
	}
});

module.exports = router;