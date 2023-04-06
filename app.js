require('dotenv').config();
const express = require('express');
const app = express();
const db = require('./src/models');
const cors = require('cors');

const PORT = process.env.PORT;

const corsOrigin = {
    origin: "http:localhost:3000"
}

app.use(cors(corsOrigin));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

db.mongoose.connect(db.url, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
        console.log('connted to database');
    }).catch(err => {
        console.log('cannot connect to database!', err);
        process.exit();
    })

    app.get('/', (req, res) => {
        res.json('Hello from Mongoose Application')
    });

    require('./src/routes/posts.routes')(app);

    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`)
    })