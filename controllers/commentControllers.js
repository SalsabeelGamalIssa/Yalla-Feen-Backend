const Comment = require('../models/comment_model');

exports.createComment = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add comment",
    });
  }

  const comment = new Comment(body);
  if (!comment) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }
  comment.user = req.user._id;
  comment
    .save()
    .then((comment) => {
      console.log(comment.populate('user'));
      return res.status(200).json({
        success: true,
        id: comment._id,
        message: "Comment item created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Comment item not created",
      });
    });
}

exports.getUserComments = async (req, res) => {
  const {skip=0,limit=0} = req.query
  const comments = await Comment.find({
    user: req.user._id
  })
  .skip(parseInt(skip)).limit(parseInt(limit))
  .populate({
    path: 'user',
    select: 'username'
  }).exec()
  res.send({
    comments
  })
}

exports.getComments = async (req, res) => {
  const {skip=0,limit=0} = req.query
  const comments = await Comment.find({
   
  })
  .skip(parseInt(skip)).limit(parseInt(limit))
  .populate({
    path: 'user',
    select: 'username'
  }).exec()
  res.send({
    comments
  })
}

exports.updateComment = async (req, res) => {
  const comment_id = req.params.id;
  try {
    const comment = await Comment.findById(comment_id)
    if (req.user._id.toString() === comment.user.toString()) {
      await Comment.findByIdAndUpdate({_id:comment_id},
        req.body,
        {new:true},
        (err,place)=>{
          if(err){
          return res.status(500).send({success:false,message:err});
          }
          res.send({success:true,message:place})
        })

    } else {
      res.send({
        baduser: "this is not your comment"
      })
    }
    res.send({
      comment
    })
  } catch (err) {
    res.status(404).send({
      success: false,
      message: "comment not found"
    })
  }
}

exports.deleteComment = async (req, res) => {
  const comment_id = req.params.id;
  try {
    const comment = await Comment.findById(comment_id);
    if (req.user._id.toString() === comment.user.toString()) {
      await Comment.findByIdAndDelete({
          _id: comment_id
        })
        .then(data => res.send({
          success: true,
          message: "comment has been deleted"
        }))
        .catch(err => res.send({
          err
        }))
    } else {
      res.send({
        baduser: "this is not your comment"
      })
    }
    res.send({
      comment
    })
  } catch (err) {
    res.status(404).send({
      success: false,
      message: "comment not found"
    })
  }
}

//admin controllers
