module.exports = mongoose => {
    const schema = mongoose.Schema({
        image: String,
        author: String,
        location: String,
        description: String,
        likes: String,
        date: String,
        id: String
    })
    schema.method("toJSON", function() {
        const {__v, _id, ...object} = this.toObject();
        object.id = _id;
        return object;
    });
    const PostModel = mongoose.model("posts", schema);
    return PostModel;
}
