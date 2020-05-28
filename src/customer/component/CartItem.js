import React,{useState,useEffect} from 'react';
import ApiService from '../ApiService';
import { TableRow, TableCell, TextField, Button } from '@material-ui/core';

export default function CartItem(props) {
    const [menu,setMenu] = useState({
        name:'',
        price:0
    });
    const [amount,setAmount] = useState(1);

    useEffect(()=>{
        if(props.su_id!==null && props.mn_id!==null) {
            fetchMenu(props.su_id,props.mn_id);
            setAmount(props.amount);
        }
    },[])
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
    const onChange=(e)=>{
        if(e.target.value>0) {
            setAmount(e.target.value);
        }else{
            alert("수량이 0이하 입니다.");
        }
    }
    const changeAmount=(amount)=>{
        let updateItem={
            pu_id: window.sessionStorage.getItem('cid'),
            su_id: props.su_id,
            mn_id: props.mn_id,
            amount: amount
        }
        ApiService.updateCartItem(updateItem)
        .then(res=>{
            console.log("updateCartItem Success",res);
            props.refreshState();
        })
        .catch(err=>{
            console.log("updateCartItem ERR",err);
        })
    }
    const deleteItem=(pu_id,su_id,mn_id)=>{
        ApiService.deleteItem(pu_id,su_id,mn_id)
        .then(res=>{
            console.log("deleteItem Success",res);
            props.refreshState();
        })
        .catch(err=>{
            console.log("deleteItem ERR",err);
        })
    }
    return(
        <>
            <TableRow>
                <TableCell>{menu.name}</TableCell>
                <TableCell>{menu.price}</TableCell>
                <TableCell><TextField type="number" value={amount} onChange={onChange} style={{width:40}}/><Button onClick={()=>changeAmount(amount)}>수량 변경</Button></TableCell>
                <TableCell>{(menu.price*props.amount)}</TableCell>
                <TableCell><Button onClick={()=>deleteItem(window.sessionStorage.getItem('cid'),props.su_id,props.mn_id)}>삭제</Button></TableCell>
            </TableRow>
        </>
    )
}