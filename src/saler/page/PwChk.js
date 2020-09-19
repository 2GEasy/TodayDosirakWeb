import React,{useState, useEffect} from 'react';
import {withStyles, makeStyles} from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import ApiService from '../ApiService';
import Appbar from '../component/Appbar';

const useStyles = makeStyles((theme) => ({
  paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
  },
  form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
  },
  submit: {
      margin: theme.spacing(3, 0, 2),
  },
  margin: {
      margin: theme.spacing(1),
  },
  title: {
    fontSize: '2em',
    
  }
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

function PwChk(props) {
    const [user,setUser] = useState();
    const [pw,setPw] = useState();
    const [passChk,setPassChk] = useState('');
    const classes = useStyles();
    const style = {
        container : {
            align: 'center',
        }
    }

    useEffect(()=>{
        setUser(window.localStorage.getItem("userID"));
    })
    const onChange =(e)=>{
        setPw(
            e.target.value
        )
    }
    const handlePassChk=(e)=>{
        if(pw===e.target.value) {
          setPassChk('비밀번호가 맞습니다.')
        }else{
          setPassChk('비밀번호가 맞지 않습니다.')
        }
      }
    const onSubmit=(e)=>{
        e.preventDefault();
        ApiService.loginUser(user,pw)
        .then(res=> {
            if(res.data===0) {
                console.log('확인되지 않는 회원정보입니다. 다시 확인해주세요');
              }else if(res.data===2){
                console.log('비밀번호가 틀렸습니다. 다시 확인해주세요');
              }else if(res.data===1) {
                console.log('비밀번호가 확인 되었습니다.');
                props.history.push('/usermod');
              }else if(res.data===3) {
                console.log('알 수 없는 오류');
              }
        })
        .catch(err => {
            console.log('PasswordChk() Error!' , err);
        })
    }
    return(
        <>
        <Appbar>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Typography className={classes.title}><b>비밀번호 확인</b></Typography>
            <p>회원정보 수정을 위해 비밀번호를 다시 입력해주세요.</p>
            <form className={classes.form} noValidate>
            <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pw"
            label="비밀번호"
            type="password"
            name="pw"
            placeholder="비밀번호를 입력해주세요."
            onChange={onChange}
            >
            </CssTextField>
            <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="pwchk"
            label="비밀번호 확인"
            type="password"
            name="pwchk"
            placeholder="비밀번호를 다시 입력해주세요."
            helperText={passChk}
            onChange={handlePassChk}
            >
            </CssTextField>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              onClick={onSubmit}
            >
              확인
            </Button>
            </form>
            </div>
            </Container>
        </Appbar>
        </>
    );
}
export default PwChk;