import React , {useState,useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import ApiService from '../ApiService';


export default function MenuAdd(props) {
    const [open,setOpen] = useState(false);
    const [menu,setMenu] = useState({
        su_id: window.sessionStorage.getItem("userID"),
        name: '',
        produce: '',
        price:'',
        fileChk: false,
    });
    const [file, setFile] = useState({
        files:null,
        fileName:'',
    });
    
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setMenu({name:'',produce:'',price:'',fileChk: false});
        setFile({files:null,fileName:''});
    }
    const handleChange=(e)=>{
        setMenu({
            ...menu, [e.target.name]:e.target.value
        });
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let menuTemp = {
            su_id: window.sessionStorage.getItem("userID"),
            name: menu.name,
            produce: menu.produce,
            price: menu.price,
            fileChk: menu.fileChk,
        }
        ApiService.insertMenu(menuTemp)
        .then(res=>{
            console.log('메뉴 등록 성공.' ,res);
            if(file.file!==null) {
                handlePostImg();
            }
            props.stateRefresh();
            handleClose();
        })
        .catch(err=>{
            console.log("insertMenu Error!",err);
        })
    }
    const handleFileInput =(e)=>{
        setFile({
            ...file,
          files: e.target.files,
          fileName: e.target.value
        })
        setMenu({
            ...menu, fileChk:true
        })
        console.log("fileInput:",e.target.files);
      }
      const handlePostImg=()=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.insertMenuImg(formData,window.sessionStorage.getItem("userID"))
        .then(res=>{
          console.log('성공:',res.data);
        })
        .catch(err=>{
          console.log('실패: ',err);
        })
      }
    const {classes} = props;
    

        return(
            <div>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>메뉴 등록</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>메뉴 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="name" value={menu.name} onChange={handleChange} /><br/>
                        <TextField label="설명" type="text" name="produce" value={menu.produce} onChange={handleChange}/><br/>
                        <TextField label="가격" type="text" name="price" value={menu.price} onChange={handleChange}/><br/>
                        <input style={{display:'none'}} multiple accept="image/*" id="raised-button-file" type="file" file={file.files} value={file.fileName} onChange={handleFileInput} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
                            {file.fileName===''? "메뉴 사진 등록" : file.fileName }
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