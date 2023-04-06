const db = require("../models");
const Posts = db.posts

var exports = module.exports = {}
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'request body not found'});
    }
    const post = new Posts({
        image: req.body.image,
        author: req.body.author,
        location: req.body.location,
        description: req.body.description,
        likes: req.body.likes,
        date: req.body.date,
        id: req.body.id
    });
    post.save().then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.all = (req, res) => {
    Posts.find().then(data => {
        if (data.length == 0) {
            return res.send({message: 'No Posts are there'})
        }
        res.status(200).json(data);
    }).catch(err => {
        res.status(500).send({message: 'error while getting posts'})
    })

}