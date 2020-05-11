const express = require('express');
const upload = require('./upload');
const multer = require('multer');

const router = express.Router();

router.post("/upload", (req,res,next) => {
    upload(req,res,function(err) {
        if(err instanceof multer.MulterError) {
            return next(err);
        }else if(err) {
            return next(err);
        }
        console.log("원본 파일명: "+req.file.originalname);
        console.log("저장 파일명: "+req.file.filename);
        console.log("크기: "+req.file.size);

        return res.json({success:1});
    })
})