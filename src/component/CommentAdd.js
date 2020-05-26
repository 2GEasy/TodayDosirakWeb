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
import { set } from 'date-fns';
import IconButton from '@material-ui/core/IconButton';
import AddCommentIcon from '@material-ui/icons/AddComment';

export default function CommentAdd(props) {
    const [open,setOpen] = useState(false);
    const [comment, setComment] = useState({
        rvw_id:0,
        content:'',
        regDate:new Date()
    });
    const handleClickOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
        setComment({
            rvw_id:0,
            content:'',
            regDate:new Date()
        });
    }
    const handleChange=(e)=>{
        setComment({
            ...comment,[e.target.name]:e.target.value
        })
    }

    const onSubmit=(e)=>{
        e.preventDefault();
        let commentTemp = {
            rvw_id:props.rvw_id,
            content: comment.content,
            regDate: new Date()
        }
        ApiService.insertCommnet(commentTemp)
        .then(res=>{
            console.log('코멘트 등록 성공.' ,res);
            props.stateRefresh();
            handleClose();
        })
        .catch(err=>{
            console.log("insertCommnet Error!",err);
        })
    }
    return (
        <>
                <IconButton aria-label="commentAdd" onClick={handleClickOpen}>
                    <AddCommentIcon />
                    <Typography>댓글 등록</Typography>
                </IconButton>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle><b>댓글 등록</b></DialogTitle>
                    <DialogContent>
                        <TextField label="내용" type="text" variant="outlined" name="content" value={comment.content} onChange={handleChange} multiline rows={4} /><br/>
                        <br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={onSubmit} style={{backgroundColor:'#f57c00',color:'#ffffff'}}>등록</Button>
                        <Button variant="outlined" onClick={handleClose} style={{backgroundColor:'#f57c00',color:'#ffffff'}}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </>
    );
}