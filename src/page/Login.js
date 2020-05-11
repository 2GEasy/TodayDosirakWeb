import React,{useState} from 'react';
import {useHistory} from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import logo from '../img/logo.png';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {withStyles} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ApiService from '../ApiService';

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

export default function Login(props) {
    const classes = useStyles();
    const [auth,setAuth] = useState();
    const [message,setMessage] = useState('');
    const [login,setLogin] = useState({
      su_id: '',
      pw: ''
    });
    const styles={
    
        appbar: {
          backgroundColor: '#FDC06D',
          width: '100%',
          height: '7%',
        },
        addr: {
          
          color: '#ffffff',
          flexGrow: 1,
          textAlign:'center',
          fontSize: '1.2rem'
    
        },
        content: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '0 auto',
            alignItems: 'center'
        },
        tf: {
            margin: '10px'
        }
    }
    const handleChange=(e)=>{
      setLogin({
        ...login,[e.target.name] : e.target.value
      })
    }
    const handleLogin=(e)=>{
      e.preventDefault();
      ApiService.loginUser(login.su_id,login.pw)
        .then(res=> {
          if(res.data===0) {
            setMessage(
              '확인되지 않는 회원정보입니다. 다시 확인해주세요'
            );
            console.log(message);
          }else if(res.data===2){
            setMessage(
              '비밀번호가 틀렸습니다. 다시 확인해주세요'
            );
            console.log(message);
          }else if(res.data===1) {
            setMessage(
                login.su_id + '님이 성공적으로 로그인 되었습니다.'
            );
            console.log(message);
            window.sessionStorage.setItem("userID",login.su_id);
            
            props.history.push('/');
          }else if(res.data===3) {
            setMessage('알 수 없는 오류');
            console.log(message);
          }
        })
        .catch(err => {
            console.log('insertUser() Error!' , err);
        })
    }
    return (
        <>
    <AppBar position="static" style={styles.appbar}>
        <Toolbar>
            <img src={logo} alt="logo" width="50" height="50"/>
            <Typography variant="h6">
                <b>판매자 로그인</b>
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
            로그인
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
              autoComplete="email"
              placeholder="이메일을 입력해주세요."
              autoFocus
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="pw"
              label="비밀번호"
              type="password"
              id="pw"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="current-password"
              onChange={handleChange}
            />
            
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="#F57C00"/>}
              label="로그인정보 기억"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              className={classes.submit}
              onClick={handleLogin}
            >
              로그인
            </Button>
            {/* <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#ffd400',backgroundColor: '#ffd400',color: '#3c1e1e'}}
              className={classes.submit}
            >
              <b>Kakao 로그인</b>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#4dc247',backgroundColor:'#4dc247',color: '#FFFFFF'}}
              className={classes.submit}
            >
              <b>Naver 로그인</b>
            </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  비밀번호 찾기
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {'회원가입'}
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