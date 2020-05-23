import React,{useState,useEffect} from 'react';
import Appbar from '../component/Appbar';
import { Container, Typography, Divider, Button, Paper } from '@material-ui/core';
import {Link} from 'react-router-dom';


export default function MenuView(props) {
    
    
    const [count,setCount] = useState(1);
    useEffect(()=>{
        console.log(props.match.params.mn_id);
    },[])
    
    return (
        <>
            <Appbar>
                <Container component="main" maxWidth="xs">
                    <Paper>
                    <img src={props.location.state.img} width={400} height={400} /><br/>
                    <Typography>{props.location.state.name}</Typography><br/>
                    <Typography>{props.location.state.price}원</Typography><br/>
                    <Button onClick={()=>setCount(count+1)}>+</Button>{count}<Button onClick={()=>{if(count>1) {setCount(count-1)}else{alert("수량이 1 이하 입니다.")}}}>-</Button><br/>
                    
                    <hr/>
                    <Typography>총금액 {(props.location.state.price*count)}</Typography>
                    <hr/>
                    <Button>장바구니</Button><Link to={{pathname:`/customer/order`,state:{su_id:props.match.params.su_id,mn_id:props.match.params.mn_id,name:props.location.state.name, amount:count, price:props.location.state.price}}} style={{textDecoration:'none'}}><Button>바로 주문</Button></Link>
                    </Paper>
                </Container>
            </Appbar>
        </>
    );
}