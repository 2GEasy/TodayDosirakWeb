import React, { useState,useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';
import ApiService from '../ApiService';
import { Button } from '@material-ui/core';
import ReviewWrite from './ReviewWrite';
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
  const [reviewChk,setReviewChk] = useState(false);
  

  useEffect(()=>{
    if(props.su_id !== null){
        fetchStoreInfo(props.su_id);
        fetchStoreImg(props.su_id);
        fetchOrderMenu(props.ord_id);
        fetchReviewChk(props.ord_id,props.su_id,window.sessionStorage.getItem('cid'));
    }
  },[])
  const fetchReviewChk=(ord_id,su_id,pu_id)=>{
    ApiService.fetchReviewChk(ord_id,su_id,pu_id)
    .then(res=>{
      setReviewChk(res.data);
      console.log("fetchReviewChk:",res.data);
      console.log("주문번호:" +ord_id,"리뷰유무:"+reviewChk);
    })
    .catch(err=>{
      console.log("fetchReviewChk ERR.",err);
    })
  }
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
    })
    .catch(err=>{
        console.log("fetchStoreImg ERR", err);
    })
  }
  const fetchOrderMenu=(ord_id)=>{
    ApiService.fetchOrderMenu(ord_id)
    .then(res=>{
        setOrderMenu(res.data);
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
    const returnButton=(reviewChk)=>{
      console.log("returnButton.reviewChk:"+reviewChk);
      if(reviewChk) {
        return <Button style={{marginBottom:10,marginRight:10,float:'right',color:'#535353'}} disabled><b>작성 완료</b></Button>;
      }else{
        return <ReviewWrite ord_id={props.ord_id} su_id={props.su_id} storeName={storeInf.storeName} menu={menu} refreshState={props.refreshState} />;
      }
    }
  return (
    <Grid item xs={12} md={6} style={{padding:10}}>
        <Card className={classes.card}>
          <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={("/"+file.path+file.fileName)} title={file.fileName} style={{width:150,height:150}} />
          </Hidden>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h5" variant="h6">
                {new Date(props.ordDate).toLocaleString("ko-KR")}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {storeInf.storeName}
              </Typography>
                  {attach(orderMenu)}
            </CardContent>
            {returnButton(reviewChk)}
          </div>
        </Card>
    </Grid>
  );
}

Order.propTypes = {
  post: PropTypes.object,
};