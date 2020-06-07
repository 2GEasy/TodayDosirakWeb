import React,{useState,useEffect} from 'react';
import {Typography} from '@material-ui/core';
import ApiService from '../ApiService';

export default function ChkItem(props) {
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
            <Typography variant="subtitle1">
                {menu.name}/{menu.price} * {props.amount}개
            </Typography>
        </>
    );
}