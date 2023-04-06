module.exports = app => {
    const upload = require('multer')();
    const posts = require('../controllers/post.controller');

    const router = require('express').Router();

    router.post('/new',upload.any(), posts.create);
    router.get('/view', posts.all);

    app.use('/posts', router)
}