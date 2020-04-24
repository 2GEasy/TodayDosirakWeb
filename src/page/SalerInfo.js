import React,{useState} from 'react';
import 'date-fns';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from '@material-ui/core/Input';
import {withStyles,makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputBase from '@material-ui/core/InputBase';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
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
            판매자정보 수정
          </Typography>
          <form className={classes.form} noValidate>
          <input style={{display:'none'}} accept="image/*" id="raised-button-file" type="file" /><br/>
            <label htmlFor="raised-button-file">
            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>스토어 사진 등록</Button>
            </label>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="storename"
              label="스토어 이름"
              name="storename"
              value=""
              placeholder="스토어 이름을 적어주세요."
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              
              fullWidth
              name="storedesc"
              label="스토어 설명"
              id="storedesc"
              value=""
              placeholder="스토어에 대한 설명을 적어주세요."
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="deliverposible"
              label="배달가능 지역"
              id="deliverposible"
              placeholder="배달가능 지역을 적어주세요"
            />
            <input style={{display:'none'}} accept="image/*" id="raised-button-file" type="file" /><br/>
            <label htmlFor="raised-button-file">
            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>판매자 사진 등록</Button>
            </label>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="판매자 이름"
              name="name"
              value="판매자 이름"
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
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="배달 가능시간"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="배달 가능시간"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
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

