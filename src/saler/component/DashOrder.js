import React, {useState, useEffect} from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import ApiService from '../ApiService';

export default function DashOrder(props) {
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
                <TableCell>{menu}</TableCell>
                <TableCell>{summary}</TableCell>
                </>
        );
    }
    let ordid=0;
    let menu='';
    let summary=0;
    return (
        <>
        <TableRow>
            <TableCell>{props.addr2}</TableCell> 
            {/* 주문자이름 > 상세보기 */}
            <TableCell>{new Date(props.dreqstart).toLocaleTimeString("ko-KR")}</TableCell>
            <TableCell>{new Date(props.dreqend).toLocaleTimeString("ko-KR")}</TableCell>
            {/* <TableCell>{new Date(props.dreqend).toLocaleString("ko-KR")}</TableCell> */}
            {attach(orderMenu)}
            <TableCell>{new Date(props.ordDate).toLocaleString("ko-KR")}</TableCell>
        </TableRow>
        </>
    );
}