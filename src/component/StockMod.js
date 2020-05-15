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
    const [stock,setStock] = useState({
        su_id: window.sessionStorage.getItem("userID"),
        stck_id: props.stck_id,
        name: '',
        amount: '',
        minAmount:'',
        fileChk: false,
    });
    const [file, setFile] = useState({
        files:null,
        fileName:'',
    });
    useEffect(()=>{
        console.log("props.stck_id: ",props.stck_id);
        loadStock(window.sessionStorage.getItem("userID"),props.stck_id);
    },[])
    const loadStock=(su_id,stck_id)=> {
        ApiService.fetchMenuByID(su_id,stck_id)
        .then(res=> {
          console.log("재고 로드 성공 ");
          let temp = res.data;
          setStock({
              ...stock,
              su_id:temp.su_id,
              stck_id:temp.stck_id,
              name:temp.name,
              amount:temp.amount,
              minAmount:temp.minAmount,
              fileChk:temp.fileChk
          })
          console.log("res.data: ",res.data);
        })
        .catch(err=> {
          console.log("loadStock Error!", err);
        })
      }
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const handleChange=(e)=>{
        setStock({
            ...stock, [e.target.name]:e.target.value
        });
    }
    const modifyStock=(su_id,stck_id)=> {
        let modStock = {
            su_id: window.sessionStorage.getItem("userID"),
            stck_id: stck_id,
            name: stock.name,
            amount: stock.amount,
            minAmount: stock.minAmount,
            fileChk: stock.fileChk
        }
        ApiService.modifyStock(modStock)
        .then(res=>{
            props.stateRefresh();
            handleClose();
            if(stock.fileChk) {
                handlePostImg(window.sessionStorage.getItem("userID"), props.stck_id);
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
        setStock({
            ...stock, fileChk:true
        })
        console.log("fileInput:",e.target.files);
      }
      const handlePostImg=(su_id,stck_id)=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.updateStockImg(formData,su_id,stck_id)
        .then(res=>{
          
          console.log('재고이미지 업데이트 성공:',res.data);
        })
        .catch(err=>{
          console.log('재고이미지 업데이트 실패: ',err);
        })
      }
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>수정하기</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                재고 수정
            </DialogTitle>
            <DialogContent>
                        <TextField label="이름" type="text" name="name" value={stock.name} onChange={handleChange} /><br/>
                        <TextField label="수량" type="text" name="amount" value={stock.amount} onChange={handleChange}/><br/>
                        <TextField label="최소 수량" type="text" name="minAmount" value={stock.minAmount} onChange={handleChange}/><br/>
                        
                        <input style={{display:'none'}} multiple accept="image/*" id="raised-button-file" type="file" file={file.files} value={file.fileName} onChange={handleFileInput} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
                            {file.fileName===''? "재고 사진 등록" : file.fileName }
                            </Button>
                        </label>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={()=>modifyStock(window.sessionStorage.getItem("userID"),props.stck_id)}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
