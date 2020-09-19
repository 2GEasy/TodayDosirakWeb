import React,{useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Rating from '@material-ui/lab/Rating';
import ApiService from '../ApiService';
import { Typography } from '@material-ui/core';

export default function ReviewWrite(props) {
    const [open,setOpen] = useState(false);
    const [files, setFiles] = useState(null);
    const [fileName, setFileName] = useState('');
    const [previewURL,setPreviewURL] = useState([]);
    const [review, setReview] = useState({
        ord_id:0,
        su_id:'',
        pu_id:'',
        content:'',
        score:0,
        fileChk:false,
        regDate:new Date()
    });
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setReview({
            ord_id:0,
            su_id:'',
            pu_id:'',
            content:'',
            score:0,
            fileChk:false,
            regDate:new Date()
        });
        setFiles(null);
        setFileName('');
        setPreviewURL([]);
    }
    const handleChange=(e)=>{
        setReview({
            ...review,[e.target.name]:e.target.value
        })
    }
    useEffect(()=>{
       
    },[files])

    const onSubmit=(e)=>{
        e.preventDefault();
        let reviewTemp = {
            ord_id: props.ord_id,
            su_id: props.su_id,
            pu_id: window.localStorage.getItem("cid"),
            content: review.content,
            score: review.score,
            fileChk: review.fileChk,
            regDate: new Date()
        }
        ApiService.insertReview(reviewTemp)
        .then(res=>{
            console.log('리뷰 등록 성공.' ,res);
            if(files!==null) {
                handlePostImg();
            }
            props.refreshState();
            handleClose();
        })
        .catch(err=>{
            console.log("insertReview Error!",err);
        })
    }
    const readURI=(e)=>{
        if(e.target.files) {
            const files = Array.from(e.target.files);

            Promise.all(files.map(file => {
                return (new Promise((resolve,reject)=>{
                    const reader = new FileReader();
                    reader.addEventListener('load',(ev)=>{
                        resolve(ev.target.result);
                    });
                    reader.addEventListener('error',reject);
                    reader.readAsDataURL(file);
                }));
            }))
            .then(images=>{
                setPreviewURL(images);
            }, error =>{
                console.log(error);
            });
        }
    }
    const handleFileInput =(e)=>{
        console.log("fileInput:",e.target.files);
        readURI(e);
        if(e.target.files) { 
            setFiles(e.target.files);
            setFileName(e.target.value);
            setReview({
                ...review, fileChk:true
            })
        }
      }
      
      const handlePostImg=()=> {
        const formData = new FormData();
        for(var i=0; i<files.length; i++){
            formData.append('file',files[i]);
        }
        console.log("formData:",formData);
        ApiService.insertReviewImg(formData,window.localStorage.getItem("cid"),props.su_id,props.ord_id)
        .then(res=>{
          console.log('성공:',res.data);
        })
        .catch(err=>{
          console.log('실패: ',err);
        })
      }
    const buildImgTag=()=>{
        return <div className="photo-container">
            {
                previewURL.map((imageURI) =>{ 
                    return <img className="photo-uploaded" src={imageURI} alt="Photo" width={150} height={150}/>
                })
            }
        </div>
    }
    const imgTag = buildImgTag();
    return (
        <>
                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{marginBottom:10,marginRight:10,backgroundColor:'#f57c00',color:'#ffffff',float:'right'}}>리뷰 등록</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>리뷰 등록</DialogTitle>
                    <DialogContent>
                        <Typography variant="subtitle2" color="textSecondary">{props.storeName}</Typography>
                        <Typography variant="subtitle2" color="textSecondary">{props.menu}</Typography><br/>
                        <TextField label="내용" type="text" variant="outlined" name="content" value={review.content} onChange={handleChange} multiline rows={4} /><br/>
                        <input style={{display:'none'}} multiple accept="image/*" id="raised-button-file" type="file" file={files} value={fileName} onChange={handleFileInput} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
                            {fileName===''? "리뷰 사진 등록" : fileName }
                            </Button>
                        </label>
                        {imgTag}
                        <br/><br/>
                        <Rating
                            name="score"
                            value={review.score}
                            onChange={(event, newValue) => {
                                setReview({...review,score:newValue});
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={onSubmit} style={{backgroundColor:'#f57c00',color:'#ffffff'}}>등록</Button>
                        <Button variant="outlined" onClick={handleClose} style={{backgroundColor:'#f57c00',color:'#ffffff'}}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </>
    );
}