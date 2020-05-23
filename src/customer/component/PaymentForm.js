import React,{useState,useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm(props) {
  const [payment,setPayment] = useState({
    cardName:'',
    cardNumber:'',
    expDate:'',
    cvc:''
  });
  useEffect(()=>{
    if(!(Object.keys(props.payment).length===0)) {
        console.log(props.payment);
        setPayment(props.payment);
    }
  },[])
  useEffect(()=>{
    props.setPayment(payment);
  },[payment])
  const onChange=(e)=>{
    setPayment({...payment,[e.target.name]:e.target.value});
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        결제방법
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" name="cardName" label="카드사" onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="cardNumber" name="cardNumber" label="카드번호" onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" name="expDate" label="유효기간" onChange={onChange} fullWidth />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvc"
            name="cvc" 
            label="CVC"
            helperText="카드 뒷면의 CVC번호를 입력해주세요."
            onChange={onChange}
            fullWidth
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}