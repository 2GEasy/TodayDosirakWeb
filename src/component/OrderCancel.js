import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { Button } from '@material-ui/core';

export default function OrderCancel(props) {
    const onCancel=(ord_id,su_id,pu_id)=>{
        ApiService.deleteOrder(ord_id,su_id,pu_id)
        .then(res=>{
            console.log("deleteOrder:",res);
            props.stateRefresh();
        })
        .catch(err=>{
            console.log("deleteOrder Error!",err);
        })
    }
    return (
        <Button color="secondary" onClick={()=>onCancel(props.ord,props.su_id,props.pu_id)}>주문취소</Button>
    );
}