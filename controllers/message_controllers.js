const Message = require('../models/message_model');

exports.createMessage = (req, res) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({
      success: false,
      error: "You must add message",
    });
  }

  const message = new Message(body);
  if (!message) {
    return res.status(400).json({
      success: false,
      error: err
    });
  }
  
  // message.user = req.user._id;
  
  message
    .save()
    .then((message) => {
      console.log(message.populate('user'));
      return res.status(200).json({
        success: true,
        id: message._id,
        message: "Message item created",
      });
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: "Message item not created",
      });
    });
}

exports.getMessages = async (req, res) => {
  const {skip=0,limit=0} = req.query
  const messages = await Message.find({})
                                .skip(parseInt(skip)).limit(parseInt(limit))
  res.send({messages})
}

exports.deleteMessage = async (req, res) => {
  const message_id = req.params.id;
  Message.findByIdAndDelete(message_id)
         .then(data => res.send({success:true,message:"message has been deleted"}))
         .catch(err => res.send({success:false,err}))
}

//admin controllers
