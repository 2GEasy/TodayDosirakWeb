import React,{useState,useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ApiService from '../ApiService';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker
} from '@material-ui/pickers';


export default function OrderForm(props) {
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours()+6);
    const [deliver,setDeliver] = useState({
        name:'',
        addr1:'',
        addr2:'',
        phone:'',
        dreqstart:new Date(),
        dreqend:defaultTime
    });
    useEffect(()=>{
        if(!(Object.keys(props.deliver).length===0)) {
            console.log(props.deliver);
            setDeliver(props.deliver);
        }else{
            if(window.sessionStorage.getItem('cid')){
                fetchCustomerByID(window.sessionStorage.getItem('cid'));
            }
        }
    },[])
    useEffect(()=>{
        props.setDeliver(deliver);
    },[deliver])
    const fetchCustomerByID=(pu_id)=>{
        ApiService.fetchCustomerByID(pu_id)
        .then(res=>{
            const customer = res.data;
            setDeliver(
                {
                ...deliver,
                name:customer.name,
                addr1:customer.addr1,
                addr2:customer.addr2,
                phone:customer.phone
            })
        })
        .catch(err=>{
            console.log("fetchCustomer ERR", err);
        })
    }
    const onChange=(e)=>{
        setDeliver({...deliver,[e.target.name]:e.target.value});
    }
    const handleStartDateChange = (date) => {
        setDeliver({
          ...deliver, dreqstart:date
        })
      };
      const handleEndDateChange = (date) => {
        setDeliver({
          ...deliver, dreqend:date
        })
      };
    return (
        <>
            <Typography variant="h6" gutterBottom>
                배달 주소
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                <TextField
                    required
                    id="name"
                    name="name"
                    label="이름"
                    value={deliver.name}
                    fullWidth
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="addr"
                    name="addr1"
                    label="주소"
                    value={deliver.addr1}
                    fullWidth
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    id="addr2"
                    name="addr2"
                    label="상세주소"
                    value={deliver.addr2}
                    fullWidth
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    id="phone"
                    name="phone"
                    label="연락처"
                    value={deliver.phone}
                    fullWidth
                    onChange={onChange}
                />
                </Grid>
                <Grid item xs={12} sm={6}>
                배달요청시간(부터)
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    name="dreqstart"
                    label="배달 요청시간"
                    value={deliver.dreqstart}
                    onChange={handleStartDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </MuiPickersUtilsProvider>
            
                </Grid>
                <Grid item xs={12} sm={6}>
                배달요청시간(까지)
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    name="dreqend"
                    label="배달 요청시간"
                    value={deliver.dreqend}
                    onChange={handleEndDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change time',
                    }}
                    />
                </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </>
    );
}