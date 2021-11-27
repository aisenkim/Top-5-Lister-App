const Comment = require("../models/comment-model");

createComment = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: "You must provide a comment",
        });
    }

    const comment = new Comment(body);
    if (!comment)
        return res.status(400).json({success: false, error: "Couldn't Create Comment"})

    comment
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                comment: comment,
                message: "Comment Saved"
            });
        })
        .catch((error) => {
            return res.status(400).json({
                error,
                message: "COMMENT NOT CREATED"
            })
        })
}

getComments = async (req, res) => {
    const listId = req.query.listId;
    await Comment.find({listId}, (err, comments) => {
       if (err) {
           return res.status(400).json({success: false, error: err})
       }
       if(!comments) {
           return res.status(404).json({success:false, error: "Comments not found"})
       }
       return res.status(200).json({success: true, comments: comments})
    })
}

deleteListComments = async (req, res) => {
   const listId = req.query.listId;
    await Comment.deleteMany({listId}, () => {
        return res.status(200).json({success: true})
    })
}

module.exports = {
    createComment,
    getComments,
    deleteListComments
}