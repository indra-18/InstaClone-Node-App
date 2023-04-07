const db = require("../models");
const Posts = db.posts

var exports = module.exports = {}
exports.create = async(req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'request body not found'});
    }
    try {
        let post = new Posts({
            image: `image/${req.body.image}`,
            author: req.body.author,
            location: req.body.location,
            description: req.body.description,
            likes: req.body.likes,
            date: req.body.date,
            id: req.body.id
        });
        post = await post.save()
        res.status(200).json({status: "Success", message: "Post Created", result: post});
    }
    catch(err) {
            res.status(400).send({message: err.message})
        }
    }

exports.all = async(req, res) => {
    try{
        let posts = await Posts.find()
        if (posts.length == 0) {
            return res.send({message: 'No Posts are there'})
        }
        res.status(200).json({status: "Success", result: posts});
    }

    catch(err) {
        res.status(500).send({message: `error while getting posts => ${err.message}`})
    }

}