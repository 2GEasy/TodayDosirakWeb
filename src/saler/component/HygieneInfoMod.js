import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ApiService from '../ApiService';

export default function HygieneInfoMod(props) {
    const [open,setOpen] =useState(false);
    const [hygiene,setHygiene] = useState({
        su_id: window.sessionStorage.getItem("userID"),
        hgn_id:props.hgn_id,
        hgnTitle: '',
        hgnExpln: '',
        hgnFileChk: false,
    });
    const [file, setFile] = useState({
        files:null,
        fileName:'',
    });
    useEffect(()=>{
        console.log("props.hgn_id: ",props.hgn_id);
        loadHygieneInfo(window.sessionStorage.getItem("userID"),props.hgn_id);
    },[])
    const loadHygieneInfo=(su_id,hgn_id)=> {
        ApiService.fetchHygieneByID(su_id,hgn_id)
        .then(res=> {
          console.log("위생정보 로드 성공 ");
          let temp = res.data;
          setHygiene({
              ...hygiene,
              su_id:temp.su_id,
              hgn_id:temp.hgn_id,
              hgnTitle:temp.hgnTitle,
              hgnExpln:temp.hgnExpln,
              hgnFileChk:temp.hgnFileChk
          })
          console.log("res.data: ",res.data);
        })
        .catch(err=> {
          console.log("loadHygiene Error!", err);
        })
      }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange=(e)=>{
        setHygiene({
            ...hygiene, [e.target.name]:e.target.value
        });
    }
    const modifyHygieneInfo=(su_id,hgn_id)=> {
        let modHygiene = {
            su_id: window.sessionStorage.getItem("userID"),
            hgn_id: hgn_id,
            hgnTitle: hygiene.hgnTitle,
            hgnExpln: hygiene.hgnExpln,
            hgnFileChk: hygiene.hgnFileChk
        }
        ApiService.modifyHygieneInfo(modHygiene)
        .then(res=>{
            props.stateRefresh();
            handleClose();
            if(hygiene.hgnFileChk) {
                handlePostImg(window.sessionStorage.getItem("userID"), props.hgn_id);
            }
        })
        .catch(err=>{
            console.log("위생정보 수정 Error!",err)
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
      const handlePostImg=(su_id,hgn_id)=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.updateHygieneImg(formData,su_id,hgn_id)
        .then(res=>{
          
          console.log('위생이미지 업데이트 성공:',res.data);
        })
        .catch(err=>{
          console.log('위생이미지 업데이트 실패: ',err);
        })
      }
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>수정하기</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                위생정보 수정
            </DialogTitle>
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
                <Button variant="contained" color="primary" onClick={()=>modifyHygieneInfo(window.sessionStorage.getItem("userID"),props.hgn_id)}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
