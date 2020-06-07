import React,{useState,useEffect} from 'react';
import {Typography,ListItem,ListItemText} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ApiService from '../ApiService';

const useStyles = makeStyles((theme) => ({
    listItem: {
      padding: theme.spacing(1, 0),
    },
    total: {
      fontWeight: 700,
    },
    title: {
      marginTop: theme.spacing(2),
    },
  }));

export default function ResultItem(props) {
    const classes = useStyles();
    const [menu,setMenu] = useState({name:'',price:0});
    useEffect(()=>{
        fetchMenu(props.su_id,props.mn_id);
    },[])
    useEffect(()=>{
        props.setTotal((props.total+(menu.price*props.amount)));
    },[menu])
    const fetchMenu=(su_id,mn_id)=>{
        ApiService.fetchMenu(su_id,mn_id)
        .then(res=>{
            setMenu(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log("fetchMenu ERR",err);
        })
    }
    return (
        <>
            <ListItem className={classes.listItem}>
                <ListItemText primary={menu.name} secondary={`${props.amount}개`} />
                <Typography variant="body2">{menu.price}</Typography>
            </ListItem>
        </>
    );
}