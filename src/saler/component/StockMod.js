import React, {useState, useEffect} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ApiService from '../ApiService';

export default function StockMod(props) {
    const [open,setOpen] =useState(false);
    const [stock,setStock] = useState({
        su_id: window.localStorage.getItem("userID"),
        mn_id: props.mn_id,
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
        console.log("props.mn_id: ",props.mn_id);
        loadStock(window.localStorage.getItem("userID"),props.mn_id);
    },[])
    const loadStock=(su_id,mn_id)=> {
        ApiService.fetchMenuByID(su_id,mn_id)
        .then(res=> {
          let temp = res.data;
          setStock({
              ...stock,
              su_id:temp.su_id,
              mn_id:temp.mn_id,
              name:temp.name,
              amount:temp.amount,
              minAmount:temp.minAmount,
              fileChk:temp.fileChk
          })
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
    const modifyStock=(su_id,mn_id)=> {
        let modStock = {
            su_id: window.localStorage.getItem("userID"),
            mn_id: mn_id,
            amount: stock.amount,
            minAmount: stock.minAmount
        }
        ApiService.modifyStock(modStock)
        .then(res=>{
            props.stateRefresh();
            handleClose();
        })
        .catch(err=>{
            console.log("메뉴 수정 Error!",err)
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
                        <TextField label="이름" type="text" name="name" value={stock.name} readOnly /><br/>
                        <TextField label="수량" type="text" name="amount" value={stock.amount} onChange={handleChange}/><br/>
                        <TextField label="최소 수량" type="text" name="minAmount" value={stock.minAmount} onChange={handleChange}/><br/>
                        
                        {/* <input style={{display:'none'}} multiple accept="image/*" id="raised-button-file" type="file" file={file.files} value={file.fileName} onChange={handleFileInput} /><br/>
                        <label htmlFor="raised-button-file">
                            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
                            {file.fileName===''? "재고 사진 등록" : file.fileName }
                            </Button>
                        </label> */}
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={()=>modifyStock(window.localStorage.getItem("userID"),props.mn_id)}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
