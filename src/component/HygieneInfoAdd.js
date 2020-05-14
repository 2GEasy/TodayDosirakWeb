import React , {useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import ApiService from '../ApiService';


export default function HygieneInfoAdd(props) {
    const [open,setOpen] = useState(false);
    const [hygiene,setHygiene] = useState({
        su_id: window.sessionStorage.getItem("userID"),
        hgnTitle: '',
        hgnExpln: '',
        hgnFileChk: false,
    });
    const [file, setFile] = useState({
        files:null,
        fileName:'',
    })
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setHygiene({su_id:'',hgnTitle:'',hgnExpln:'',hgnFileChk: false});
        setFile({files:null,fileName:''});
    }
    const handleChange=(e)=>{
        setHygiene({
            ...hygiene, [e.target.name]:e.target.value
        });
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let hygieneInfo = {
            su_id: hygiene.su_id,
            hgnTitle: hygiene.hgnTitle,
            hgnExpln: hygiene.hgnExpln,
            hgnFileChk: hygiene.hgnFileChk,
        }
        ApiService.insertHygiene(hygieneInfo)
        .then(res=>{
            console.log('위생정보 등록 성공.' ,res);
            if(file.file!==null) {
                handlePostImg();
            }
            handleClose();
        })
        .catch(err=>{
            console.log("insertHygiene Error!",err);
        })
    }
    const handleFileInput =(e)=>{
        setFile({
            ...file,
          files: e.target.files,
          fileName: e.target.value
        })
        setHygiene({
            ...hygiene, hgnFileChk:true
        })
        console.log("fileInput:",e.target.files);
      }
      const handlePostImg=()=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.insertHygieneImg(formData,window.sessionStorage.getItem("userID"))
        .then(res=>{
          alert('성공');
          console.log(res.data);
        })
        .catch(err=>{
          alert('실패: '+err);
        })
      }
    const {classes} = props;
    

        return(
            <div>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>위생정보 등록</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>위생정보 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="hgnTitle" value={hygiene.hgnTitle} onChange={handleChange} /><br/>
                        <TextField label="설명" type="text" name="hgnExpln" value={hygiene.hgnExpln} onChange={handleChange}/><br/>
                        
                        <input style={{display:'none'}} multiple accept="image/*" id="raised-button-file" type="file" file={file.files} value={file.fileName} onChange={handleFileInput} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
                            {file.fileName===''? "위생정보 사진 등록" : file.fileName }
                            </Button>
                        </label>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={onSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
   
}