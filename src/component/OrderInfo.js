import React, {useState,useEffect} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ApiService from '../ApiService';
import DeliveryState from './DeliveryState';
import OrderCancel from './OrderCancel';

export default function OrderInfo(props) {
    const [orderMenu,setOrderMenu] = useState([{
        ord_id:0,
        mn_id:0,
        amount:0,
        sum:0,
        name:''
    }]);
    useEffect(()=>{
        loadSalerOrderMenu(props.ord);
    },[])
    const loadSalerOrderMenu=(ord_id)=>{
        ApiService.loadSalerOrderMenu(ord_id)
        .then(res=>{
          setOrderMenu(res.data);
          console.log(res.data);
        })
        .catch(err=>{
          console.log("loadSalerOrderMenu Error!",err);
        })
    }
    const attach =(orderMenu)=>{
        orderMenu.map((c,index)=>{
            if(index>0) {
                if(ordid==c.ord_id){
                    menu+=c.name+" "+c.amount+"개";
                    summary+=c.sum;
                }else{
                    ordid=c.ord_id;
                    menu=c.name+" "+c.amount+"개";
                    summary+=c.sum;
                }
            }else{
                ordid=c.ord_id;
                menu+=c.name+" "+c.amount+"개";
                summary+=c.sum;
            }
        })
        return (
            <>
                <TableCell width={150}>{menu}</TableCell>
                <TableCell width={80}>{summary}</TableCell>
                </>
        );
    }
    let ordid=0;
    let menu='';
    let summary=0;
    return (
        <>
        <TableRow>
            <TableCell width={70}>{props.num}</TableCell>
            <TableCell>{props.addr1} {props.addr2}</TableCell> 
            {/* 주문자이름 > 상세보기 */}
            <TableCell>{props.dreqstart}</TableCell>
            <TableCell>{props.dreqend}</TableCell>
            {attach(orderMenu)}
            <TableCell>{props.ordDate}</TableCell>
            <TableCell width={110}><DeliveryState ord={props.ord} su_id={props.su_id} pu_id={props.pu_id} stateRefresh={props.stateRefresh}/></TableCell>
            <TableCell width={110}><OrderCancel ord={props.ord} su_id={props.su_id} pu_id={props.pu_id} stateRefresh={props.stateRefresh} /></TableCell>
        </TableRow>
        </>
    );
}