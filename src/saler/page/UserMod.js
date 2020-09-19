import React,{useState, useEffect} from 'react';
import 'date-fns';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {withStyles,makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import ApiService from '../ApiService';
import Appbar from '../component/Appbar';
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

export default function UserMod(props) {
    const [user,setUser] = useState({
      su_id:'',
      pw:'',
      name: '',
      addr1: '', 
      addr2: '',
      phone: '',
      gender: '',
      birth: ''
    });
    const [addr,setAddr] = useState('');
    const [passChk, setPassChk] = useState('비밀번호는 영문과 숫자를 사용하여 8~16자로 정해주세요.');
    useEffect(()=>{
      console.log(window.sessionStorage.getItem("userID"));
      loadUser();
    },[])
    useEffect(()=>{
      setUser({...user,addr1:addr});
    },[addr])
    const loadUser =()=>{
      ApiService.fetchUserByID(window.sessionStorage.getItem("userID"))
      .then(res => {
        console.log(res.data);
          let user = res.data;
          setUser({
              su_id : user.su_id,
              name : user.name,
              addr1: user.addr1,
              addr2: user.addr2,
              phone: user.phone,
              gender: user.gender,
              birth: user.birth
          })
      })
      .catch(err =>{
          console.log('loadUser() Error!', err);
      });
  }
    const classes = useStyles();

    const handleChange =(e)=> {
        setUser({
          ...user, [e.target.name]: e.target.value,

        });
    }
    const onSubmit =(e)=>{
      e.preventDefault();
      let update = {
          su_id: user.su_id,
          pw: user.pw,
          addr1: user.addr1, 
          addr2: user.addr2,
          phone: user.phone,
      };
      console.log("user: ",update);
      ApiService.updateUser(update)
      .then(res=> {
          console.log(user.name + '님이 성공적으로 등록되었습니다.');
          alert(user.name + '님이 성공적으로 등록되었습니다.');
          refreshState();
      })
      .catch(err => {
          console.log('updateUser() Error!' , err);
      })
  }
  const refreshState=()=>{
    setUser({
      su_id:'',
      pw:'',
      name: '',
      addr1: '', 
      addr2: '',
      phone: '',
      gender: '',
      birth: ''
    });
    loadUser();
  }
  const handlePassChk=(e)=>{
    if(user.pw===e.target.value) {
      setPassChk('비밀번호가 맞습니다.')
    }else{
      setPassChk('비밀번호가 맞지 않습니다.')
    }
  }
    
    return (
        <>
        <Appbar>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar} >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원정보 수정
          </Typography>
          <form className={classes.form} noValidate>
            <CssTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="su_id"
              label="이메일"
              name="su_id"
              value={user.su_id}
              readOnly
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
              fullWidth
              id="name"
              label="이름"
              name="name"
              value={user.name}
              readOnly
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
              value={user.addr1}
              placeholder="주소를 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              type="text"
              required
              fullWidth
              id="addr2"
              label="상세주소"
              name="addr2"
              value={user.addr2}
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
              value={user.phone}
              placeholder="연락처를 입력해주세요."
              onChange={handleChange}
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="gender"
              label="성별"
              name="gender"
              value={user.gender}
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              format="MM/dd/yyyy"
              id="birth"
              label="생년월일"
              name="birth"
              value={user.birth}
              readOnly
            />
            
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              onClick={onSubmit}
            >
              수정
            </Button>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </Appbar>
      </>
    );
}

