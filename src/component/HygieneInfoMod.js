import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ApiService from '../ApiService';

export default function HygieneInfoMod(props) {
    const [open,setOpen] =useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }
    const modifyHygieneInfo=(su_id,hgn_id)=> {
        // ApiService.modifyHygieneInfo(su_id,hgn_id)
        // .then(res=>{

        // })
        // .catch(err=>{
        //     console.log("위생정보 수정 Error!",err)
        // })
    }
    return (
        <div>
        <Button variant="contained" color="secondary" onClick={handleClickOpen}>수정하기</Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
                위생정보 수정
            </DialogTitle>
            <DialogContent>
                <Typography gutterBottom>
                    선택한 위생정보가 삭제됩니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={modifyHygieneInfo(props.su_id,props.hgn_id)}>수정</Button>
                <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
            </DialogActions>
        </Dialog>
        </div>
    );
}
