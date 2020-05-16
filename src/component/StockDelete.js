import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ApiService from '../ApiService';

export default function StockDelete(props) {
    const [open,setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const deleteStock=(su_id,stck_id)=> {
        ApiService.deleteStock(su_id,stck_id)
        .then(res=>{
            console.log("재고 삭제 성공", res);
            props.stateRefresh();
            handleClose();
        })
        .catch(err=>{
            console.log("재고 삭제 Error!",err)
        })
    }
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>삭제하기</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                삭제 경고
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    선택한 재고가 삭제됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={()=>deleteStock(window.sessionStorage.getItem("userID"), props.stck_id)}>삭제</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
