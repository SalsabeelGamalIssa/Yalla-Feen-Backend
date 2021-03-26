const multer = require('multer');
const maxSize = 2 * 1024 * 1024
const util = require('util');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log('----------url',req.originalUrl);
    if (req.originalUrl == '/user/upload-profile-pic') {
      // console.log('trueeeeeeeeee');
      return cb(null, 'uploads/user')
    }else if(req.originalUrl == '/advertise/create'){
      return cb(null, 'uploads/ads')
    }else{
    return cb(null, 'uploads/place')
    }
  },
  filename: (req, file, cb) => {
    // console.log(file);
    cb(null, file.fieldname+'-'+Date.now()+'.'+file.originalname.split('.')[1])
  }
});
const fileFilter = (req, file, cb) => {
    if(file.mimetype =='image/jpeg' || file.mimetype == 'image/png'){
      return cb(null,true)
    }
    return cb(new Error('only images are allowed'))
}


const upload = multer({ storage: storage,
                       fileFilter: fileFilter,
                       limits:{
                       fileSize:maxSize
                      },
                    });

// const uploadFile = util.promisify(upload.single('avatar'))
module.exports = {upload}
