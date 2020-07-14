import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ApiService from '../../ApiService';
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  
  root: {
    display: 'flex',
    maxWidth: '600px',
    width: '50%'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,

  },
  playIcon: {
    height: 38,
    width: 38,
  },
  name:{
    fontSize:'1rem'
  }, 
  desc:{
    fontSize:'0.8rem'
  }
}));

export default function FavoriteStore(props) {
  const classes = useStyles();
  const theme = useTheme;
  const [file,setFile] = useState({});
  
  useEffect(()=>{
    if(props.storeImgChk) {
        fetchStoreImg(props.su_id);
    }else{
        setFile(null);
    }
  },[])
  const fetchStoreImg=(su_id)=>{
      ApiService.fetchStoreImgByID(su_id)
      .then(res=>{
          setFile(res.data);
          console.log("fetchStoreImg",res.data);
      })
      .catch(err=>{
          console.log("fetchStoreImg ERR", err);
      })
  }
  
  const path = "/upload/store/" + file.fileName;
  return (
    <Link to={`/customer/store/${props.su_id}`} style={{textDecoration:'none'}}>
    <Card>
       
       <div className={classes.details}>
         <CardContent>
            <img src={path} style={{float:'left'}} height="100%"/>
           <Typography component="h5" variant="h5" className={classes.name}>
             <b>{props.storeName}</b>
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             {props.storeExplain}
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             {new Date(props.abledeliverS).toLocaleTimeString("ko-KR")}~
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             {new Date(props.abledeliverE).toLocaleTimeString("ko-KR")} 배달가능
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             {props.deliverPosible}
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             거리 {props.distance} m
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             주문수 {props.count}
           </Typography>
           <Typography variant="subtitle1" color="textSecondary" className={classes.desc}>
             찜 수 {props.favorite}
           </Typography>
         </CardContent>
       </div>
     </Card>
    </Link>
  );
}