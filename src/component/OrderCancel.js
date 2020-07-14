import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { Button } from '@material-ui/core';

export default function OrderCancel(props) {
    const onCancel=(ord_id,su_id,pu_id)=>{
        let notification = {
            user_id: pu_id,
            user_type: 'p',
            title: "주문 취소",
            message: "주문하신 도시락 주문이 취소 되었습니다."
        }
        ApiService.deleteOrder(ord_id,su_id,pu_id)
        .then(res=>{
            console.log("deleteOrder:",res);
            sendNotification(notification);
            props.stateRefresh();
        })
        .catch(err=>{
            console.log("deleteOrder Error!",err);
        })
    }
    const sendNotification=(noti)=>{
        ApiService.sendNotification(noti)
        .then(res=>console.log(res))
        .catch(err=>console.log(err)
        )
    }
    return (
        <Button color="secondary" onClick={()=>onCancel(props.ord,props.su_id,props.pu_id)}>주문취소</Button>
    );
}