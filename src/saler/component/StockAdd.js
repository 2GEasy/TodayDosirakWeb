import React , {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ApiService from '../ApiService';


export default function StockAdd(props) {
    const [open,setOpen] = useState(false);
    const [stock,setStock] = useState({
        su_id: window.localStorage.getItem("userID"),
        name: '',
        amount: '',
        minAmount:'',
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
        setStock({name:'',amount:'',minAmount:'',fileChk: false});
        setFile({files:null,fileName:''});
    }
    const handleChange=(e)=>{
        setStock({
            ...stock, [e.target.name]:e.target.value
        });
    }
    const onSubmit=(e)=>{
        e.preventDefault();
        let stockTemp = {
            su_id: window.localStorage.getItem("userID"),
            name: stock.name,
            amount: stock.amount,
            minAmount: stock.minAmount,
            fileChk: stock.fileChk,
        }
        ApiService.insertStock(stockTemp)
        .then(res=>{
            console.log('재고 등록 성공.' ,res);
            if(file.file!==null) {
                handlePostImg();
            }
            props.stateRefresh();
            handleClose();
        })
        .catch(err=>{
            console.log("insertStock Error!",err);
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
      const handlePostImg=()=> {
        const formData = new FormData();
        for(var i=0; i<file.files.length; i++){
            formData.append('file',file.files[i]);

        }
        console.log("formData:",formData);
        ApiService.insertStockImg(formData,window.localStorage.getItem("userID"))
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
                <Button variant="contained" color="primary" onClick={handleClickOpen}>재고 등록</Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>재고 추가</DialogTitle>
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
                        <Button variant="contained" color="primary" onClick={onSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
   
}