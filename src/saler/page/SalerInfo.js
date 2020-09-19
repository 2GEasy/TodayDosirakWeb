import React,{useState, useEffect} from 'react';
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
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Appbar from '../component/Appbar';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';
import ApiService from '../ApiService';
import { Link as RouterLink } from 'react-router-dom';

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
    formControl: {
      margin: theme.spacing(3),
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
      link: {
        textDecoration:'none',
        color:'#000000'
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
  const CssCheckbox = withStyles({
    root: {
      color: "#F57C00",
      '&$checked': {
        color: "#F57C00",
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

export default function SalerInfo(props) {
    const defaultTime = new Date();
    defaultTime.setHours(defaultTime.getHours()+6);
    const [store,setStore] = useState({
      storename:'',
      storedesc:'',
      storeImgChk:false,
      deliverposible:'',
      name:'',
      addr1:'',
      addr2:'',
      phone:'',
      dstart:new Date(),
      dend:defaultTime,
      normal: false,
      health: false,
      lowsalt: false,
      premium: false,
    });
    const [storeImg,setStoreImg] = useState({
      file:null,
      fileName:'',
      path: '',
    });
    let regImg = "https://todaydsr.kro.kr:8090/upload/store/"+storeImg.fileName;
    useEffect(()=>{
      console.log(window.sessionStorage.getItem("userID"));
      loadStoreInf();
      
    },[])
    const loadStoreInf =()=>{
      ApiService.fetchStoreByID(window.sessionStorage.getItem("userID"))
      .then(res => {
          let store = res.data;
          console.log(store.abledeliverS);
          console.log(store.abledeliverE);
          setStore({
            ...store,
              storename: store.storeName,
              storedesc: store.storeExplain,
              deliverposible: store.deliverPosible,
              addr1: store.storeAddr1,
              addr2: store.storeAddr2,
              phone: store.storePhone,
              dstart: store.abledeliverS,
              dend: store.abledeliverE,
              normal: store.normal,
              health: store.health,
              lowsalt: store.lowsalt,
              premium: store.premium
          })
          console.log("storeImgChk:",store.storeImgChk);
          if(store.storeImgChk) {
            loadStoreImg();
          }
      })
      .catch(err =>{
          console.log('loadStoreInf() Error!', err);
      });
  }
  const loadStoreImg =()=>{
    ApiService.fetchStoreImgByID(window.sessionStorage.getItem("userID"))
    .then(res => {
        let storeImg = res.data;
        console.log("loadImg:",res.data);
        setStoreImg({
          ...storeImg,
            path: storeImg.path,
            fileName: storeImg.fileName,
        })
    })
    .catch(err =>{
        console.log('loadStoreInf() Error!', err);
    });
}
    const classes = useStyles();

    
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
            판매자정보
          </Typography>
          <form className={classes.form} noValidate>
            <Typography>스토어 이미지</Typography>
            <img src={regImg} width={100} height={100}/>
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="storename"
              label="스토어 이름"
              name="storename"
              value={store.storename}
              placeholder="스토어 이름을 적어주세요."
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              
              fullWidth
              name="storedesc"
              label="스토어 설명"
              id="storedesc"
              value={store.storedesc}
              placeholder="스토어에 대한 설명을 적어주세요."
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="deliverposible"
              label="배달가능 지역"
              id="deliverposible"
              value={store.deliverposible}
              placeholder="배달가능 지역을 적어주세요"
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="addr1"
              label="주소"
              name="addr1"
              value={store.addr1}
              placeholder="스토어 주소를 입력해주세요."
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="addr2"
              label="상세주소"
              name="addr2"
              value={store.addr2}
              placeholder="스토어 상세주소를 입력해주세요."
              readOnly
            />
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="phone"
              label="연락처"
              name="phone"
              value={store.phone}
              placeholder="스토어 연락처를 입력해주세요."
              readOnly
            />
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                name="dstart"
                label="배달 가능시간"
                value={store.dstart}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                disabled
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                name="dend"
                label="배달 가능시간"
                value={store.dend}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                disabled
                />
            </MuiPickersUtilsProvider>
            
            <FormLabel component="legend" className={classes.margin}>판매종류</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={<CssCheckbox checked={store.normal} name="normal" />}
              label="일반식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.health} name="health" />}
              label="건강식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.lowsalt} name="lowsalt" />}
              label="관리식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.premium} name="premium" />}
              label="프리미엄식"
            />
            </FormGroup>
            <RouterLink to="storeMod" className={classes.link}>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              className={classes.submit}
              >
              수정
            </Button>
            
            </RouterLink>
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

