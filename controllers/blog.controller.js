// creating post controller using sequelize orm

const {Post} =require("../models")

class BlogController {


    createPost = async (req, res, next) => {

        const { title, content, imageUrl,user_id } = req.body;
        const newPost = new Post(req.body);

        try {
            const savedPost = await newPost.save();
            res.status(201).json(savedPost);
            console.log(savedPost);
            return;
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
            return;
        }


    }

    getPosts = async (req, res, next) => {
        try {
            const posts = await Post.findAll({});
            res.status(200).json(posts);
            return;
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
            return;
        }

    }


    deletePost = async (req, res, next) => {

        try {
            const post = await Post.findOne(
                {
                    where: {
                        id: req.params.id
                    }
                }
            );
            await post.destroy();
            res.status(200).json(post);
            
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
            return;
       }

    }

updatePost = async (req, res, next) => {

    Post.findOne({
        where: {
            id: req.params.id
        }
    }).then((Post) => {
        Post.update({
            title: req.body.title,
            content: req.body.content,
            imageUrl: req.body.image
        }).then((response) => {


            response.send(200).json('post updated successfully')
        } ).catch(() => {

            response.send(500).json('error updating post')
        })
    }).catch(error => {
        response.send(500).json(error.message)
    })


}




}



module.exports = new BlogController()
