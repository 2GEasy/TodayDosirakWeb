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
  useEffect(()=>{
    if(window.sessionStorage.getItem("userID")!==null){
      fetchYearSales(window.sessionStorage.getItem("userID"));
    }
  },[])
  const fetchYearSales=(su_id)=>{
    ApiService.fetchYearSales(su_id)
    .then(res=>{
      setSales(res.data);
      console.log(res.data);
    })
    .catch(err=>{
      console.log("fetchYearSales",err);
    })
  }
  return (
    <React.Fragment>
      <Appbar>
      <Container maxWidth="xs" style={{width:'400px'}}>
      <Title>올해 매출</Title>
      {/* <ResponsiveContainer>
        <LineChart
          data={sales}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="ordDate" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              매출 (천원)
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="sum" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>월</TableCell>
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