import React, { useState,useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';
import ReviewImgs from './ReviewImgs';
import ApiService from '../ApiService';

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
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [orderMenu, setOrderMenu] = useState([]);
  const [reviewImgs,setReviewImgs] = useState([]);
  const [comment,setComment] = useState({});
  useEffect(()=>{
    fetchOrderMenu(props.ord_id);
    fetchReviewImg(props.rvw_id);
    fetchComment(props.rvw_id);
  },[])
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const fetchReviewImg=(rvw_id)=>{
    ApiService.fetchReviewImg(rvw_id)
    .then(res=>{
        setReviewImgs(res.data);
    })
    .catch(err=>{
        console.log("fetchReviewImg ERR", err);
    })
  }
  const fetchOrderMenu=(ord_id)=>{
    ApiService.fetchOrderMenu(ord_id)
    .then(res=>{
        setOrderMenu(res.data);
        console.log(res.data);
    })
    .catch(err=>{
        console.log("fetchOrderMenu ERR", err);
    })
  }
  const fetchComment=(rvw_id)=>{
    console.log("fetchComment:",rvw_id);
    ApiService.fetchComment(rvw_id)
    .then(res=>{
      setComment(res.data);
    })
    .catch(err=>{
        console.log("fetchComment ERR", err);
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
            <CardHeader
              title={(window.localStorage.getItem('cid')+"님")}
              subheader={menu}
            />
            </>
    );
  }
  const returnReviewImgs=(reviewImgs)=>{
    let path = [];
    reviewImgs.map((c,index)=>{
      path.push("http://todaydsr.kro.kr:7979/upload/rview/"+c.fileName);
    })
    return <ReviewImgs path={path}/>;
  }
  let ordid=0;
  let menu='';
  let summary=0;
  return (
    <>
    
    <Card className={classes.root} style={{margin:20}}>
      {attach(orderMenu)}
      {/* <CardMedia
        className={classes.media}
        image="이미지"
        title="리뷰 이미지"
      /> */}
      {returnReviewImgs(reviewImgs)}
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.content}
        </Typography>
        <Rating
          name="score"
          value={props.score}
          disabled
        />
        <Typography variant="body2" color="textSecondary" component="p">
          {new Date(props.regDate).toLocaleString("ko-KR")}
        </Typography>
      </CardContent>
      {comment?
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="더 보기"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      :
      null
      }
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph variant="subtitle2" color="textSecondary">사장님 댓글</Typography>
          <Typography paragraph>
            {comment.content}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
    
    
    </>
  );
}