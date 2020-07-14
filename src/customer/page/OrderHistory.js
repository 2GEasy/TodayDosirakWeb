import React,{useState,useEffect} from 'react';
import { Container, Typography, Grid } from '@material-ui/core';
import Appbar from '../component/Appbar';
import BottomNav from '../component/BottomNav';
import Order from '../component/Order';
import ApiService from '../ApiService';

export default function OrderHistory(props) {
    const [orders,setOrders] = useState([]);
    useEffect(()=>{
        fetchOrderByID(window.sessionStorage.getItem('cid'));
    },[])
    const fetchOrderByID=(pu_id)=>{
        ApiService.fetchOrderByID(pu_id)
        .then(res=>{
            setOrders(res.data);
        })
        .catch(err=>{
            console.log("fetchOrderByID ERR",err);
        })
    }
    const refreshState=()=>{
      setOrders([]);
      fetchOrderByID(window.sessionStorage.getItem('cid'));
    }
    return (
        <Appbar>
            <div>
            <Container maxWidth="lg">
                <Typography variant="h6"><b>주문내역</b></Typography>
                <Grid container direction="column">
                    {orders.map((post,index) => (
                    <Order key={post.index} ord_id={post.ord_id} su_id={post.su_id} ordDate={post.ordDate} refreshState={refreshState}/>
                    ))}
                </Grid>
            </Container>
            <BottomNav/>
            </div>
        </Appbar>
    );
}