module.exports = app => {
    const multer = require('multer');
    require('dotenv').config();
    const MongoClient = require("mongodb").MongoClient;
    const client = new MongoClient(process.env.DB_URL);
    const {GridFsStorage} = require("multer-gridfs-storage");
    const posts = require('../controllers/post.controller');

    const router = require('express').Router();

    const fileStorage = new GridFsStorage({
        url : process.env.DB_URL+ 'test',
        file : (req, file) => {
            return {
                bucketName : 'posts',
                filename : `${Date.now()}_${file.originalname}`
            }
        }
    });

    const fileUpload = multer({
        storage : fileStorage
    });

    router.post('/new',fileUpload.single("image"), posts.create);
    router.get('/view', posts.all);

    router.get("/image/:name", posts.load)
    app.use('/', router)
}