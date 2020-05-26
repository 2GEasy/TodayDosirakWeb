import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
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
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Store(props) {
  const classes = useStyles;
  const theme = useTheme;
  const [file,setFile] = useState({})
  
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
    <Card className={classes.root}>
       
      <div className={classes.details}>
        <CardContent className={classes.content}>
        <img src={path} width={200} height={200} style={{float:'left'}}/>
          <Typography component="h5" variant="h5">
            {props.storeName}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.storeExplain}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(props.abledeliverS).toLocaleString("ko-KR")}~
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {new Date(props.abledeliverE).toLocaleString("ko-KR")} 배달가능
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.deliverPosible}
          </Typography>
        </CardContent>
      </div>
    </Card>
    </Link>
  );
}