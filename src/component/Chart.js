import React,{useState,useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import ApiService from '../ApiService';


// Generate Sales Data

// const data = [
  //   createData(0, 0),
  //   createData(2, 300),
  //   createData(4, 600),
  //   createData(6, 800),
  //   createData(8, 1500),
  //   createData(10, 2000),
  //   createData(12, 2400),
  //   createData(20, 2800),
  //   createData(24, undefined),
  // ];
  
  export default function Chart() {
    const theme = useTheme();
    const [sales,setSales] = useState([]);
    useEffect(()=>{
      if(window.sessionStorage.getItem("userID")!==null){
        fetchDaySales(window.sessionStorage.getItem("userID"));
      }
    },[])
    const fetchDaySales=(su_id)=>{
      ApiService.fetchDaySales(su_id)
      .then(res=>{
        setSales(res.data);
        console.log(res.data);
      })
      .catch(err=>{
        console.log("fetchDaySales",err);
      })
    }
  
  const data=sales;
  return (
    <React.Fragment>
      <Title>오늘 매출</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="ordDate" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}/>
          <Line dataKey="sum" stroke={theme.palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}