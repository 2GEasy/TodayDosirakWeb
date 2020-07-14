import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import ResultForm from './ResultForm';
import ApiService from '../ApiService';
import { Grid } from '@material-ui/core';
import {Link} from 'react-router-dom';
import ChkItem from './ChkItem';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        오늘도시락
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor:'#FDC06D',
    color:'#ffffff'
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));




export default function Checkout(props) {
  const steps = ['배달 정보 작성', '결제 작성', '주문 확인'];
  const classes = useStyles();
  const [orderInfo,setOrderInfo] = useState([]);
  const [deliverInfo,setDeliverInfo] = useState({}); 

  const [paymentInfo,setPaymentInfo] = useState({});
  const [total,setTotal] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);
  useEffect(()=>{
    fetchCartList(window.sessionStorage.getItem('cid'),props.su_id);
  },[])
  useEffect(()=>{

  },[orderInfo])
  const fetchCartList=(pu_id,su_id)=>{
    ApiService.fetchCartList(pu_id,su_id)
    .then(res=>{
      setOrderInfo(res.data);
    })
    .catch(err=>{
      console.log("fetchCartList ERR",err);
    })
  }
  const handleNext = () => {
    if(activeStep === steps.length - 1) {
      let order = {
        su_id: props.su_id,
        pu_id: window.sessionStorage.getItem('cid'),
        name: deliverInfo.name,
        addr1: deliverInfo.addr1,
        addr2: deliverInfo.addr2,
        phone: deliverInfo.phone,
        dreqstart: deliverInfo.dreqstart,
        dreqend: deliverInfo.dreqend,
        ordDate: new Date()
      }
      insertOrder(order);
      orderInfo.map((c)=>{
        let orderMenu = {
          su_id: c.su_id,
          mn_id: c.mn_id,
          amount: c.amount
        }
        insertOrderMenu(orderMenu,window.sessionStorage.getItem('cid'));
      })
      let notification = {
        user_id: props.su_id,
        user_type : 's',
        title: "주문 확인",
        message: window.sessionStorage.getItem('cid')+"님의 주문이 확인되었습니다."
      }
      sendNotification(notification);
      setActiveStep(activeStep + 1);
    }else{
      setActiveStep(activeStep + 1);
    }
  };
  const insertOrder=(order)=>{
    ApiService.insertOrder(order)
    .then(res=>{
      console.log("inserOrder",res);
    })
    .catch(err=>{
      console.log("insertOrder ERR",err);
    })
  }
  const insertOrderMenu=(orderMenu,pu_id)=>{
    ApiService.insertOrderMenu(orderMenu,pu_id)
    .then(res=>{
      console.log("insertOrderMenu",res);
    })
    .catch(err=>{
      console.log("insertOrderMenu ERR",err);
    })
  }
  const sendNotification=(noti)=>{
    ApiService.sendNotification(noti)
    .then(res=>{
      console.log(res);
    })
    .catch(err=>console.log(err))
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <AddressForm setDeliver={setDeliverInfo} deliver={deliverInfo} />;
      case 1:
        return <PaymentForm setPayment={setPaymentInfo} payment={paymentInfo} />;
      case 2:
        return <ResultForm order={orderInfo} deliverSet={deliverInfo} paymentSet={paymentInfo} />;
      default:
        throw new Error('알 수 없는 단계입니다.');
    }
  }
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="absolute" color="default" className={classes.appBar}>
        <Toolbar>
          <Link to="/customer/" style={{textDecoration:'none',color:'#ffffff'}}>
          <Typography variant="h6" color="inherit" noWrap>
            <b>오늘도시락</b>
          </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            주문 확인
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  주문해주셔서 감사합니다.
                </Typography>
                    {/* {props.name}/{props.price} * {props.amount}개 */}
                {orderInfo.map((c)=>{
                  return <ChkItem su_id={c.su_id} mn_id={c.mn_id} amount={c.amount} setTotal={setTotal} total={total} />;
                })}
                <br/>
                <Typography>
                    합계: {total}원
                </Typography>
                <Grid item container direction="column" xs={12}>
                  <Link to="/customer/orderHistory"><Button>확인</Button></Link>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      뒤로
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? '주문' : '다음'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}