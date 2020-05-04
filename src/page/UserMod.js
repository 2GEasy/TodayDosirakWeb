import React,{useState} from 'react';
import 'date-fns';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {withStyles,makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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
    const [gender,setGender] = useState('female');
    const [selectedDate, setSelectedDate] = React.useState('1994-08-18');

    const classes = useStyles();

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
    const handleChange =(e)=> {
        setGender(e.target.value);
    }
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };
      const returnGender = (gender)=>{
        if(gender==='female') {
            return '여자';
        }else{
            return '남자';
        }
      }
    
    return (
        <>
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
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              value="email@a.a"
              readOnly
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
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="이름"
              name="name"
              value="이름"
              readOnly
            />
            <Button style={{backgroundColor:'#f57c00',color:'#ffffff'}}>주소찾기</Button>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="addr1"
              label="주소"
              name="addr1"
              placeholder="주소를 입력해주세요."
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
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              format="MM/dd/yyyy"
              id="phone"
              label="성별"
              name="phone"
              value={returnGender(gender)}
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              format="MM/dd/yyyy"
              id="phone"
              label="생년월일"
              name="phone"
              value={selectedDate}
              readOnly
            />
            
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              className={classes.submit}
            >
              수정
            </Button>
            
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
      </>
    );
}

