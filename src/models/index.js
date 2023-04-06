const dbConfig=require("../config/db.js");

const mongoose= require("mongoose");
mongoose.Promise=global.Promise;
//GLOBAL--MONGOOSE--> DB
const db={};
db.mongoose=mongoose;
db.url=dbConfig.url;
db.posts=require("./post.model")(mongoose);

module.exports=db;