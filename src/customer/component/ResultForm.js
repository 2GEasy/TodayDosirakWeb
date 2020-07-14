import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import ResultItem from './ResultItem';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function Review(props) {
  const classes = useStyles();
  const [orderItems,setOrderItems] = useState([]);
  const [total,setTotal] = useState(0);
  useEffect(()=>{
    setOrderItems(props.order);
  },[])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        주문 확인
      </Typography>
      <List disablePadding>
        {orderItems.map((c)=>{
          return <ResultItem su_id={c.su_id} mn_id={c.mn_id} amount={c.amount} setTotal={setTotal} total={total}/>;
        })}
        <ListItem className={classes.listItem}>
          <ListItemText primary="합계" />
          <Typography variant="subtitle1" className={classes.total}>
            {total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            배달지
          </Typography>
          <Typography gutterBottom>{props.deliverSet.name}</Typography>
          <Typography gutterBottom>{props.deliverSet.addr1}</Typography>
          <Typography gutterBottom>{props.deliverSet.addr2}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            결제 상세
          </Typography>
          <Grid container>
              <React.Fragment>
                <Grid item xs={6}>
                  <Typography gutterBottom>카드사</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.paymentSet.cardName}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>카드번호</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.paymentSet.cardNumber}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>유효기간</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.paymentSet.expDate}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>cvc</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{props.paymentSet.cvc}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}