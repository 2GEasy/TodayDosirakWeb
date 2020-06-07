import 'date-fns';
import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../img/logo.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {withStyles,makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import ApiService from '../ApiService';
import AddrSearch from '../component/AddrSearch';

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
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#ff9800',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    cssOutlinedInput: {
        borderColor: '#F57C00',
    },
    cssFocused: {
        borderColor: '#F57C00',
    },
    notchedOutline: {
        borderColor: '#F57C00',
    },
    margin: {
        margin: theme.spacing(1),
      },
}));

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#FF9800',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'yellow',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'black',
        },
        '&:hover fieldset': {
          borderColor: '#FF9800',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#F57C00',
        },
      },
    },
  })(TextField);
  const CssRadio = withStyles({
    root: {
      color: '#FF9800',
      '&$checked': {
        color: '#F57C00',
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} />);
  
export default function SignIn(props) {
    const [addr,setAddr] = useState("");
    const [value,setValue] = useState({
      su_id:'',
      password1:'',
      password2:'',
      password:'',
      name:'',
      addr1:'',
      addr2:'',
      phone:'',
      gender:'female',
      birth:new Date('1994-08-18')
    });
    
    const [selectedDate, setSelectedDate] = React.useState(new Date('1994-08-18'));
    const [passChk, setPassChk] = useState('비밀번호는 영문과 숫자를 사용하여 8~16자로 정해주세요.');
    const [message, setMessage] = useState('');
    const classes = useStyles();
    
    useEffect(()=>{
      setValue({...value,addr1:addr});
    },[addr])
    const handleChange =(e)=> {
      setValue({
        ...value,[e.target.name] : e.target.value,
      });
    }
    const onInsert =()=>{
        let user = {
            su_id: value.su_id,
            pw: value.password,
            name: value.name,
            addr1: value.addr1, 
            addr2: value.addr2,
            phone: value.phone,
            gender: value.gender,
            birth: value.birth
        };
        console.log("user: ",user);
        ApiService.insertUser(user)
        .then(res=> {
            setMessage(
                user.name + '님이 성공적으로 등록되었습니다.'
            );
            console.log(message);
            props.history.push(`/storeadd/${value.su_id}`);
        })
        .catch(err => {
            console.log('insertUser() Error!' , err);
        })
    }
    
    const handlePassChk=(e)=>{
      if(value.password1===e.target.value) {
        setValue({...value,password:e.target.value})
        setPassChk('비밀번호가 맞습니다.')
      }else{
        setPassChk('비밀번호가 맞지 않습니다.')
      }
    }
    const handleDateChange = (date) => {
      console.log(date);
      console.log(value.birth);
      setSelectedDate(date);
      setValue({...value,birth:date});
      console.log("setbirth: "+value.birth);
    };
    return (
        <>
    <AppBar position="static" style={{backgroundColor: '#FDC06D'}}>
        <Toolbar>
            <img src={logo} alt="logo" width="50" height="50"/>
            <Typography variant="h6">
                <b>판매자 회원가입</b>
            </Typography>
        </Toolbar>
    </AppBar>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <form className={classes.form}>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="su_id"
              label="이메일"
              name="su_id"
              placeholder="이메일을 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password1"
              label="비밀번호"
              type="password"
              id="password1"
              placeholder="비밀번호를 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password2"
              label="비밀번호 확인"
              type="password"
              id="password2"
              placeholder="비밀번호를 다시 입력해주세요."
              helperText={passChk}
              onChange={handlePassChk}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="이름"
              name="name"
              placeholder="이름을 입력해주세요."
              onChange={handleChange}
            />
            <AddrSearch setAddr={setAddr}/>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="addr1"
              label="주소"
              name="addr1"
              placeholder="주소를 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="addr2"
              label="상세주소"
              name="addr2"
              placeholder="상세주소를 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="연락처"
              name="phone"
              placeholder="연락처를 입력해주세요."
              onChange={handleChange}
            />
            <RadioGroup aria-label="gender" name="gender" value={value.gender} onChange={handleChange}>
                <FormControlLabel value="female" control={<CssRadio />} label="여자"/>
                <FormControlLabel value="male" control={<CssRadio />} label="남자"/>
            </RadioGroup>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                    margin="normal"
                    id="birth"
                    name="birth"
                    label="생년월일"
                    format="MM/dd/yyyy"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>
            
            <Button
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              className={classes.submit}
              onClick={onInsert}
            >
              회원가입
            </Button>
            <Grid container>
              <Grid item xs>
                
              </Grid>
              <Grid item>
                <Link href="login" variant="body2">
                  {'로그인'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </>
)}