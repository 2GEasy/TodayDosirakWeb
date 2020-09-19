import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ApiService from '../ApiService';

export default function MenuMod(props) {
    const [open,setOpen] =useState(false);
    const [menu,setMenu] = useState({
        su_id: window.localStorage.getItem("userID"),
        mn_id:props.mn_id,
        name: '',
        produce: '',
        price:'',
        fileChk: false,
    });
    const [file, setFile] = useState({
        files:null,
        fileName:'',
    });
    useEffect(()=>{
        console.log("props.mn_id: ",props.mn_id);
        loadMenu(window.localStorage.getItem("userID"),props.mn_id);
    },[])
    const loadMenu=(su_id,mn_id)=> {
        ApiService.fetchMenuByID(su_id,mn_id)
        .then(res=> {
          console.log("메뉴 로드 성공 ");
          let temp = res.data;
          setMenu({
              ...menu,
              su_id:temp.su_id,
              mn_id:temp.mn_id,
              name:temp.name,
              produce:temp.produce,
              price:temp.price,
              fileChk:temp.fileChk
          })
          console.log("res.data: ",res.data);
        })
        .catch(err=> {
          console.log("loadMenu Error!", err);
        })
      }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange=(e)=>{
        setMenu({
            ...menu, [e.target.name]:e.target.value
        });
    }
    const modifyMenu=(su_id,mn_id)=> {
        let modMenu = {
            su_id: window.localStorage.getItem("userID"),
            mn_id: mn_id,
            name: menu.name,
            produce: menu.produce,
            price: menu.price,
            fileChk: menu.fileChk
        }
        ApiService.modifyMenu(modMenu)
        .then(res=>{
            props.stateRefresh();
            handleClose();
            if(menu.fileChk) {
                handlePostImg(window.localStorage.getItem("userID"), props.mn_id);
            }
        })
        .catch(err=>{
            console.log("메뉴 수정 Error!",err)
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
      const handlePostImg=(su_id,mn_id)=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.updateMenuImg(formData,su_id,mn_id)
        .then(res=>{
          
          console.log('메뉴이미지 업데이트 성공:',res.data);
        })
        .catch(err=>{
          console.log('메뉴이미지 업데이트 실패: ',err);
        })
      }
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>수정하기</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                메뉴 수정
            </DialogTitle>
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
                <Button variant="contained" color="primary" onClick={()=>modifyMenu(window.localStorage.getItem("userID"),props.mn_id)}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
