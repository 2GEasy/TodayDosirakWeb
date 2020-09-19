import React,{useState,useEffect} from 'react';
import CartItem from '../component/CartItem';
import ApiService from '../ApiService';
import { Button,TableHead, Table, TableRow, TableCell, TableBody, Typography, Container } from '@material-ui/core';
import Appbar from '../component/Appbar';
import {Link} from 'react-router-dom';

export default function Cart(props) {
    const [cart,setCart] = useState([]);
    const titles=["메뉴","가격","수량","합","삭제"];
    
    useEffect(()=>{
      fetchCartList(window.localStorage.getItem('cid'),props.location.state.su_id);
    },[])
    const fetchCartList=(pu_id,su_id)=>{
      ApiService.fetchCartList(pu_id,su_id)
      .then(res=>{
        setCart(res.data);
        console.log(res.data);
      })
      .catch(err=>{
        console.log("fetchCartList ERR",err);
      })
    }
    const returnCartItems=(items)=>{
      return items.map((c,index)=>{
        return <CartItem su_id={c.su_id} mn_id={c.mn_id} amount={c.amount} refreshState={refreshState}/>;
      })
    }
    const refreshState=()=>{
      setCart([]);
      fetchCartList(window.localStorage.getItem('cid'),props.location.state.su_id);
    }
    return (
      <>
        <Appbar>
          <Container maxWidth="md">
          <Typography>장바구니</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {
                  titles.map(c=>{
                    return <TableCell style={{fontSize:'1.4vw'}}>{c}</TableCell>;
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {returnCartItems(cart)}
            </TableBody>
          </Table>
          <Link to={{pathname:`/customer/order`,state:{su_id:props.location.state.su_id}}} style={{textDecoration:'none'}}><Button variant="contained" style={{backgroundColor:'#F57C00',color:'#FFFFFF',float:'right',marginTop:20}}>주문</Button></Link>
          </Container>
        </Appbar>
      </>
    );
}