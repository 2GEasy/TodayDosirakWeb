import React,{useState,useEffect} from 'react';
import CartItem from '../component/CartItem';
import ApiService from '../ApiService';
import { TableHead, Table, TableRow, TableCell, TableBody, Typography } from '@material-ui/core';

export default function Cart(props) {
    const [cart,setCart] = useState([]);
    const titles=["메뉴","가격","수량","합","삭제"];
    
    useEffect(()=>{
      fetchCartList(window.sessionStorage.getItem('cid'));
    },[])
    const fetchCartList=(pu_id)=>{
      ApiService.fetchCartList(pu_id)
      .then(res=>{
        setCart(res.data);
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
      fetchCartList(window.sessionStorage.getItem('cid'));
    }
    return (
      <div>
          <Typography>장바구니</Typography>
          <Table>
            <TableHead>
              <TableRow>
                {
                  titles.map(c=>{
                    return <TableCell>{c}</TableCell>;
                  })
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {returnCartItems(cart)}
            </TableBody>
          </Table>
      </div>
    );
}