require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const client = new MongoClient(process.env.DB_URL);
const db = require("../models");
const Posts = db.posts

var exports = module.exports = {}
exports.create = async(req, res) => {
    if (!req.body) {
        res.status(400).send({message: 'request body not found'});
    }
    try {
        let post = await new Posts({
            ...req.body,
            image: `image/${req.file.filename}`
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

exports.load = async function(req, res){
    try{
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const collection = new GridFSBucket(db, {
            bucketName : 'posts'
        });
        const loadImage = collection.openDownloadStreamByName(req.params.name);
        loadImage.on("data", data => res.status(200).write(data));
        loadImage.on("error", (err) => {
            res.status(400).send({status:"failed to load", message: err.message});
        });
        loadImage.on("end", () => {
            res.end();
        });
    }
    catch(err)
    {
        res.status(500).send({status:"Server Error", message : err.message});
    }
};