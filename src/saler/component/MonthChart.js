import React, { useState,useEffect } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import ApiService from '../ApiService';
import { Container,Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import Appbar from './Appbar';

export default function MonthChart() {
  const [sales,setSales] = useState([]);
  const theme = useTheme();
  const data = sales;
  useEffect(()=>{
    if(window.sessionStorage.getItem("userID")!==null){
      fetchMonthSales(window.sessionStorage.getItem("userID"));
    }
  },[])
  useEffect(()=>{
    console.log(data);
  },[sales])
  const fetchMonthSales=(su_id)=>{
    ApiService.fetchMonthSales(su_id)
    .then(res=>{
      setSales(res.data);
      console.log(res.data);
    })
    .catch(err=>{
      console.log("fetchMonthSales",err);
    })
  }
  return (
    <React.Fragment>
      <Appbar>
      <Container maxWidth="xs" style={{width:'400px'}}>
      <Title>이번달 매출</Title>
      
        <LineChart
          data={data}
        >
          <XAxis dataKey="ordDate" stroke={theme.palette.text.secondary} />
          <YAxis/>
          <Line type="monotone" dataKey="sum" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>일자</TableCell>
            <TableCell>매출</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sales.map((c,index)=>{
            return (
            <TableRow key={index}>
              <TableCell>{c.ordDate}</TableCell>
              <TableCell>{c.sum}</TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
      </Container>
      </Appbar>
    </React.Fragment>
  );
}