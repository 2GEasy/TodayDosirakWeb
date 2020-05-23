import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import ApiService from '../ApiService';


const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Deposits() {
  const classes = useStyles();
  const [sales,setSales] = useState([]);
  
  useEffect(()=>{
    if(window.sessionStorage.getItem("userID")!==null){
      fetchMonthSales(window.sessionStorage.getItem("userID"));
    }
  },[])
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
  let summary = 0;
  let dt = '';
  const attach=(data)=>{
    data.map((c,index)=>{
      summary+=c.sum;
      dt=c.ordDate;
    })
    return summary;
  }
  return (
    <React.Fragment>
      <Title>이달의 매출</Title>
      <Typography component="p" variant="h4">
        {attach(sales)}원
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        
      </Typography>
      <div>
        <Link to="/monthSales">
          상세보기
        </Link>
      </div>
    </React.Fragment>
  );
}