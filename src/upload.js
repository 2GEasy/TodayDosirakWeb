const multer = require('multer');
const moment = require('moment');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null, '/upload');//저장 경로
    },
    filename: function(req,file,cb) {
        cb(null,moment().format('YYYYMMDDHHmmss')+"_"+file.originalname);//저장 파일명
    }
});

const upload = multer({storage:storage}).single("file");//파일 하나만 업로드

module.exports = upload;