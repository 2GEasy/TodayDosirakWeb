import React,{useState, useEffect} from 'react';
import 'date-fns';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import logo from '../../img/logo.png';
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
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
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
      su_id: props.match.params.su_id,
      storename:'',
      storedesc:'',
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
      fileName:''
    });
    

    
    const handleFileInput =(e)=>{
      setStoreImg({
        file: e.target.files[0],
        fileName: e.target.value
      })
      console.log(e.target.files[0])
    }
    const handlePost=()=> {
      const formData = new FormData();
      formData.append('file',storeImg.file);
      console.log(formData)
      ApiService.insertStoreImg(formData,store.su_id)
      .then(res=>{
        alert('성공');
        // props.history.push('/login');
        console.log(res.data);
      })
      .catch(err=>{
        alert('실패: '+err);
      })
    }
    
    useEffect(()=>{
      console.log(props.match.params.su_id);
      loadUser();
    },[])
    const setAddr=(addr)=>{
      setStore({...store,addr1:addr});
    }
    const loadUser =()=>{
      ApiService.fetchUserByID(props.match.params.su_id)
      .then(res => {
          let user = res.data;
          setStore({
            ...store,
              name : user.name,
              addr1: user.addr1,
              addr2: user.addr2,
              phone: user.phone,
          })
      })
      .catch(err =>{
          console.log('loadUser() Error!', err);
      });
  }

    const classes = useStyles();

    const handleChange =(e)=> {
        setStore({
          ...store, [e.target.name]:e.target.value
        })
    }
    const handleCheckChange =(e)=> {
        setStore({
          ...store, [e.target.name]:e.target.checked
        })
    }
    const handleStartDateChange = (date) => {
      setStore({
        ...store, dstart:date
      })
    };
    const handleEndDateChange = (date) => {
      setStore({
        ...store, dend:date
      })
    };
    const onSubmit =(e)=> {
      let id = window.sessionStorage.getItem("userID");
      let imgChk = false;
      if(!(storeImg.file===null)){
        imgChk = true;
      }
        let storeInf = {
            su_id: store.su_id,
            storeImgChk: imgChk,
            storeName: store.storename,
            storeExplain: store.storedesc,
            deliverPosible: store.deliverposible,
            storeAddr1: store.addr1, 
            storeAddr2: store.addr2,
            storePhone: store.phone,
            abledeliverS: store.dstart,
            abledeliverE: store.dend,
            normal: store.normal,
            health: store.health,
            lowsalt: store.lowsalt,
            premium: store.premium
        };

        if(!(storeImg.file===null)) {
          handlePost();
        }
        console.log(storeInf);
        ApiService.insertStoreInf(storeInf)
        .then(res=> {
        })
        .catch(err => {
          console.log('insertStoreInf() Error!' , err);
        })
        props.history.push('/login');
    }
    
    return (
        <>
        <AppBar position="static" style={{backgroundColor: '#FDC06D'}}>
            <Toolbar>
                <img src={logo} alt="logo" width="50" height="50"/>
                <Typography variant="h6">
                    <b>스토어정보</b>
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
            스토어정보 등록
          </Typography>
          <form className={classes.form} noValidate>
            <input style={{display:'none'}} accept="image/*" id="raised-button-file" type="file" file={storeImg.file} value={storeImg.fileName} onChange={handleFileInput} /><br/>
            <label htmlFor="raised-button-file">
            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>
              {storeImg.fileName===''? "스토어 사진 등록" : storeImg.fileName }
            </Button>
            </label>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            {/* <input style={{display:'none'}} accept="image/*" id="raised-button-file" type="file" /><br/>
            <label htmlFor="raised-button-file">
            <Button component="span" name="file" style={{backgroundColor:'#f57c00',color:'#ffffff'}}>판매자 사진 등록</Button>
            </label> */}
            <CssTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="판매자 이름"
              name="name"
              value={store.name}
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
              value={store.addr1}
              placeholder="스토어 주소를 입력해주세요."
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
              value={store.addr2}
              placeholder="스토어 상세주소를 입력해주세요."
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
              value={store.phone}
              placeholder="스토어 연락처를 입력해주세요."
              onChange={handleChange}
            />
            
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                name="dstart"
                label="배달 가능시간"
                value={store.dstart}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                name="dend"
                label="배달 가능시간"
                value={store.dend}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            
            <FormLabel component="legend" className={classes.margin}>판매종류</FormLabel>
            <FormGroup>
            <FormControlLabel
              control={<CssCheckbox checked={store.normal} onChange={handleCheckChange} name="normal" />}
              label="일반식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.health} onChange={handleCheckChange} name="health" />}
              label="건강식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.lowsalt} onChange={handleCheckChange} name="lowsalt" />}
              label="관리식"
            />
            <FormControlLabel
              control={<CssCheckbox checked={store.premium} onChange={handleCheckChange} name="premium" />}
              label="프리미엄식"
            />
            </FormGroup>
            
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              style={{borderColor: '#F57C00',color: '#F57C00'}}
              className={classes.submit}
              onClick={onSubmit}
            >
              등록
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

