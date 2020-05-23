import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import ApiService from '../ApiService';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
    margin: '10px'
  },
});

export default function Order(props) {
  const classes = useStyles();
  const [storeInf,setStoreInf] = useState({});
  const [file,setFile] = useState({});
  const [orderMenu,setOrderMenu] = useState([]);

  useEffect(()=>{
    if(props.su_id !== null){
        fetchStoreInfo(props.su_id);
        fetchStoreImg(props.su_id);
        fetchOrderMenu(props.ord_id);
    }
  },[])

  const fetchStoreInfo=(su_id)=>{
    ApiService.fetchStoreInfo(su_id)
    .then(res=>{
      setStoreInf(res.data);
    })
    .catch(err=>{
      console.log("fetchStoreInfo ERR.",err);
    })
  }
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
  const fetchOrderMenu=(ord_id)=>{
    ApiService.fetchOrderMenu(ord_id)
    .then(res=>{
        setOrderMenu(res.data);
        console.log("fetchOrderMenu",res.data);
    })
    .catch(err=>{
        console.log("fetchOrderMenu ERR", err);
    })
  }
  const attach =(orderMenu)=>{
        orderMenu.map((c,index)=>{
            if(index>0) {
                if(ordid==c.ord_id){
                    menu+=c.name+" "+c.amount+"개";
                    summary+=c.sum;
                }else{
                    ordid=c.ord_id;
                    menu=c.name+" "+c.amount+"개";
                    summary+=c.sum;
                }
            }else{
                ordid=c.ord_id;
                menu+=c.name+" "+c.amount+"개";
                summary+=c.sum;
            }
        })
        return (
                <>
                <Typography variant="subtitle1" color="textSecondary">{menu}</Typography>
                <Typography variant="subtitle1" color="textSecondary">{summary}원</Typography>
                </>
        );
    }
    let ordid=0;
    let menu='';
    let summary=0;
  return (
    <Grid item xs={12} md={6}>
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={("/"+file.path+file.fileName)} title={file.fileName} />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h5" variant="h6">
                {props.ordDate}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {storeInf.storeName}
              </Typography>
                  {attach(orderMenu)}
            </CardContent>
            <Button style={{float:'right',color:'#FF9595'}}><b>리뷰 작성</b></Button>
          </div>
        </Card>
    </Grid>
  );
}

Order.propTypes = {
  post: PropTypes.object,
};