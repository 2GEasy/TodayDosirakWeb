import React,{useState,useEffect} from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import ApiService from '../ApiService';
import { Link } from 'react-router-dom';


  export default function Chart() {
    const theme = useTheme();
    const [sales,setSales] = useState([]);
    useEffect(()=>{
      if(window.localStorage.getItem("userID")!==null){
        fetchYearSales(window.localStorage.getItem("userID"));
      }
    },[])
    const fetchYearSales=(su_id)=>{
      ApiService.fetchYearSales(su_id)
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
      <Title><Link to="/yearSales" style={{textDecoration:'none'}}>올해 매출</Link></Title>
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