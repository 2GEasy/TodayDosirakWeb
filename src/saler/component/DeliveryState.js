import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { Button } from '@material-ui/core';


export default function DeliveryStart(props) {
    const [delivery,setDlvr] = useState({
        dlvr_id:null,
        ord_id: null,
        pu_id: '',
        su_id: '',
        state: null,
        start: '',
        end: '',
        date: ''
    });

    useEffect(()=>{
        fetchDeliver(props.ord);
    },[]);
    const onStart=(ord_id,pu_id,su_id)=>{
        let deliver = {
            ord_id: ord_id,
            pu_id: pu_id,
            su_id: su_id,
            state: 1,
            start: new Date(),
            end: '',
            date: new Date()
        }
        let notification = {
            user_id: pu_id,
            user_type: 'p',
            title: "배송 시작",
            message: "주문하신 도시락의 배송이 시작되었습니다.",
            // url: "OrderHistory"
        }
        ApiService.insertDelivery(deliver)
        .then(res=>{
            console.log("insertDeliver",res);
            sendNotification(notification);
            props.stateRefresh();
        })
        .catch(err=>{
            console.log("insertDeliver Error!",err);
        })
    }
    const onEnd=(ord_id,pu_id,su_id)=>{
        let deliver = {
            ord_id: ord_id,
            pu_id: pu_id,
            su_id: su_id,
            state: 2,
            start: delivery.start,
            end: new Date(),
            date: delivery.date
        }
        let notification = {
            user_id: pu_id,
            user_type: 'p',
            title: "배송 종료",
            message: "주문하신 도시락의 배송이 종료되었습니다.",
            // url: "OrderHistory"
        }
        ApiService.updateDelivery(deliver)
        .then(res=>{
            console.log("updateDelivery",res);
            sendNotification(notification);
            props.stateRefresh();
        })
        .catch(err=>{
            console.log("updateDelivery Error!",err);
        })
    }
    const fetchDeliver=(ord)=>{
        ApiService.fetchDeliver(ord)
        .then(res=>{
            setDlvr(res.data);
            console.log(res.data);
        })
        .catch(err=>{
            console.log("fetchDeliver Error!",err);
        })
    }
    const attDelivery=(delivery)=>{
        const state = delivery.state;
        if(state==="1") {
            return <Button color="secondary" onClick={()=>onEnd(props.ord,props.pu_id,props.su_id)}>배달 완료</Button>
        }else if(state==="2") {
            return <Button color="secondary" disabled>종료</Button>
        }
    }
    const sendNotification=(noti)=>{
        console.log(noti);
        ApiService.sendNotification(noti)
        .then(res=>console.log(res))
        .catch(err=>console.log(err)
        )
    }
    return(
        <>
        {delivery?
        attDelivery(delivery)
        :
        <Button color="primary" onClick={()=>onStart(props.ord,props.pu_id,props.su_id)}>배달 시작</Button>
        }
        </>
    );
}