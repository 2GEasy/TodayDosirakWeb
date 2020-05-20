import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ReviewInfo from '../component/ReviewInfo';
import ApiService from '../ApiService';
import { Typography } from '@material-ui/core';
import Appbar from '../component/Appbar';

const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 600,
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    avatar: {
      backgroundColor: red[500],
    },
  }));

export default function Review(props) {
  const [review,setReview] = useState([]);
    const classes = useStyles;
  useEffect(()=>{
    if(window.sessionStorage.getItem("userID")===null){
        alert("로그인을 해주세요.");
        props.history.push('login');
      }else{
        fetchReviewList(window.sessionStorage.getItem("userID"));
      }
  },[])
  const fetchReviewList=(su_id)=>{
    ApiService.fetchReviewList(su_id)
    .then(res=>{
        setReview(res.data);
        console.log("fetchReview:",res.data);
    })
    .catch(err=>{
        console.log("fetchReview Error!",err);
    })
  }

  const returnReviewList=(data)=>{
    return data.map((c,index)=>{
      return <ReviewInfo key={index,c.ord_id} rvw_id={c.rvw_id} ord_id={c.ord_id} su_id={c.su_id} pu_id={c.pu_id} title={c.title} content={c.content} score={c.score} fileChk={c.fileChk} regDate={c.regDate} />;
    })
  }
  return (
    <>
    <Appbar>
        <Container>
            <Paper>
                {returnReviewList(review)}
            </Paper>
        </Container>
    </Appbar>
    </>
  );
}