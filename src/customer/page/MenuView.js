import React,{useState,useEffect} from 'react';
import Appbar from '../component/Appbar';
import { Container, Typography, Divider, Button, Paper } from '@material-ui/core';
import {Link} from 'react-router-dom';
import ApiService from '../ApiService';

export default function MenuView(props) {
    
    
    const [count,setCount] = useState(1);
    useEffect(()=>{
        console.log(props.match.params.mn_id);
    },[])

    const addCart =(pu_id,su_id,mn_id,amount)=>{
        let CartItem = {
            pu_id: pu_id,
            su_id: su_id,
            mn_id: mn_id,
            amount: amount
        }
        ApiService.insertCart(CartItem)
        .then(res=>{
            console.log("insertCart Success",res);
            const result = window.confirm("장바구니로 이동하시겠습니까?");
            if(result) {
                props.history.push({pathname:"/customer/cart",state:{su_id:props.match.params.su_id}});
            }
        })
        .catch(err=>{
            console.log("insertCart Error",err);
        })
    }
    const imadiatelyBuy=(pu_id,su_id,mn_id,amount)=>{
        let CartItem = {
            pu_id: pu_id,
            su_id: su_id,
            mn_id: mn_id,
            amount: amount
        }
        ApiService.insertCart(CartItem)
        .then(res=>{
            console.log("insertCart Success",res);
        })
        .catch(err=>{
            console.log("insertCart Error",err);
        })
    }
    return (
        <>
            <Appbar>
                <Container component="main" maxWidth="xs">
                    <Paper>
                    <img src={props.location.state.img} width="100%" height="60%" /><br/>
                    <Typography>{props.location.state.name}</Typography><br/>
                    <Typography>{props.location.state.price}원</Typography><br/>
                    <Button onClick={()=>setCount(count+1)}>+</Button>{count}<Button onClick={()=>{if(count>1) {setCount(count-1)}else{alert("수량이 1 이하 입니다.")}}}>-</Button><br/>
                    
                    <hr/>
                    <Typography>총금액 {(props.location.state.price*count)}</Typography>
                    <hr/>
                    <Button onClick={()=>addCart(window.sessionStorage.getItem('cid'), props.match.params.su_id, props.match.params.mn_id,count)}>장바구니에 추가</Button>
                    <Link to={{pathname:`/customer/order`,state:{su_id:props.match.params.su_id}}} style={{textDecoration:'none'}}><Button onClick={()=>imadiatelyBuy(window.sessionStorage.getItem('cid'), props.match.params.su_id, props.match.params.mn_id,count)}>바로 주문</Button></Link>
                    </Paper>
                </Container>
            </Appbar>
        </>
    );
}