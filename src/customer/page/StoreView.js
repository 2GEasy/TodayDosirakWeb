import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import {Container,Paper, Typography,Fab,Toolbar} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import Menu from '../component/Menu';
import Review from '../component/Review';
import StoreInf from '../component/StoreInf';
import ApiService from '../ApiService';
import Appbar from '../component/Appbar';
import BottomNav from '../component/BottomNav';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CallIcon from '@material-ui/icons/Call';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
    },
    fab: {
      position:'fixed',
      color:'#F57C00',
      backgroundColor:'#FFFFFF',
      bottom: theme.spacing(10),
      right: theme.spacing(2),
      '&:hover': {
        backgroundColor:'#f0f0f0'
      }
    }
}));

export default function StoreView(props) {
    const classes = useStyles();
    const [value, setValue] = useState('1');
    const [menus,setMenus] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [storeInf,setStoreInf] = useState({});
    const [favorite,setFavorite] = useState(false);
    useEffect(()=>{
      if(window.sessionStorage.getItem("cid")===null) {
        alert("로그인을 해주세요.");
        props.history.push("/customer/login");
      }else{
        fetchMenuList(props.match.params.su_id);
        fetchReviewList(props.match.params.su_id);
        fetchStoreInfo(props.match.params.su_id);
        chkFavorite(props.match.params.su_id,window.sessionStorage.getItem('cid'));
      }
      console.log(props.match.params.su_id);
    },[])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    const refreshState=()=>{
      fetchMenuList(props.match.params.su_id);
      fetchReviewList(props.match.params.su_id);
      fetchStoreInfo(props.match.params.su_id);
      chkFavorite(props.match.params.su_id,window.sessionStorage.getItem('cid'));
    }
    const fetchMenuList=(su_id)=>{
      ApiService.fetchMenuList(su_id)
      .then(res=>{
        setMenus(res.data);
        console.log("fetchMenuList.",res.data);
      })
      .catch(err=>{
        console.log("fetchMenuList ERR.",err);
      })
    }
    const fetchReviewList=(su_id)=>{
      ApiService.fetchReviewList(su_id)
      .then(res=>{
        setReviews(res.data);
        console.log("fetchReviewList.",res.data);
      })
      .catch(err=>{
        console.log("fetchReviewList ERR.",err);
      })
    }
    const fetchStoreInfo=(su_id)=>{
      ApiService.fetchStoreInfo(su_id)
      .then(res=>{
        setStoreInf(res.data);
        console.log("StoreInf:",res.data);
      })
      .catch(err=>{
        console.log("fetchStoreInfo ERR.",err);
      })
    }
    const chkFavorite=(su_id,pu_id)=>{
      ApiService.chkFavorite(su_id,pu_id)
      .then(res=>{
        setFavorite(res.data);
        console.log("chkFavorite",res.data);
    })
    .catch(err=>{
        console.log("chkFavorite ERR", err);
    })
    }
    const addFavorite=(su_id,pu_id)=>{
      ApiService.addFavorite(su_id,pu_id)
      .then(res=>{
        console.log("addFavorite Success");
        refreshState();
      })
      .catch(err=>{
        console.log("addFavorite ERR.",err);
      })
    }
    const cancelFavorite=(su_id,pu_id)=>{
      ApiService.cancelFavorite(su_id,pu_id)
      .then(res=>{
        console.log("cancelFavorite Success");
        refreshState();
      })
      .catch(err=>{
        console.log("cancelFavorite ERR.",err);
      })
    }
    const toCart=(su_id)=>{
      props.history.push({pathname:"/customer/cart",state:{su_id:su_id}});
    }
    const returnMenuList=(data)=>{
      return data.map((c,index)=>{
        return (<Menu key={index} su_id={c.su_id} mn_id={c.mn_id} name={c.name} produce={c.produce} price={c.price} fileChk={c.fileChk} />);
      })
    }
    const returnReviewList=(data)=>{
      return data.map((c,index)=>{
        return <Review key={index} su_id={c.su_id} rvw_id={c.rvw_id} ord_id={c.ord_id} content={c.content} score={c.score} fileChk={c.fileChk} regDate={c.regDate} />;
      })
    }
    const returnStoreInf=(data)=>{
        return <StoreInf su_id={data.su_id} storeName={data.storeName} storeExplain={data.storeExplain} deliverPosible={data.deliverPosible} storeAddr1={data.storeAddr1} storeAddr2={data.storeAddr2} storePhone={data.storePhone} abledeliverS={data.abledeliverS} abledeliverE={data.abledeliverE} count={data.count} favorite={data.favorite} />;
    }
    return (
        <>
        <AppBar position="fixed" style={{backgroundColor:'#FDC06D'}}>
          <Toolbar>
            <Button style={{color:'#ffffff'}}><ArrowBackIcon/></Button>
            <Typography style={{fontSize:'1.4em',width:'90%',textAlign:'center'}}>{storeInf.storeName}</Typography>
            <Button style={{color:'#ffffff',float:'right'}} onClick={()=>{props.history.push("/customer/main")}}><HomeIcon/></Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="sm" style={{marginTop:100}}>
          <Paper>
          <Typography style={{fontSize:"2em",padding:20,textAlign:"center"}}>{storeInf.storeName}</Typography>
          <ButtonGroup variant="text" fullWidth orientation="horizontal" aria-label="text primary button group" style={{padding:20}}>
            <Button aria-label="call" style={{color:'#F57C00'}}>
              <CallIcon />
            </Button>
            {favorite?
            <Button aria-label="favorite" style={{color:'#F57C00'}} onClick={()=>cancelFavorite(props.match.params.su_id,window.sessionStorage.getItem('cid'))}>
              <FavoriteIcon />
            </Button>
            :
            <Button aria-label="favorite" style={{color:'#F57C00'}} onClick={()=>addFavorite(props.match.params.su_id,window.sessionStorage.getItem('cid'))}>
              <FavoriteBorderIcon/>
            </Button>
            }
            <Button aria-label="share" style={{color:'#F57C00'}}>
              <ShareIcon />
            </Button>
          </ButtonGroup>
          <TabContext value={value}>
          <AppBar position="static" style={{backgroundColor:'#ffffff'}} className={classes.appbar} fullWidth>
            <TabList onChange={handleChange} TabIndicatorProps={{style: {backgroundColor:'#F57C00'}}} centered>
              <Tab label="메뉴" value="1" style={{color:'#000000'}}/>
              <Tab label="정보" value="2" style={{color:'#000000'}}/>
              <Tab label="리뷰" value="3" style={{color:'#000000'}}/>
            </TabList>
          </AppBar>
          <TabPanel value="1" style={{paddingBottom:'100px'}}>{returnMenuList(menus)}</TabPanel>
          <TabPanel value="2" style={{paddingBottom:'100px'}}>{returnStoreInf(storeInf)}</TabPanel>
          <TabPanel value="3" style={{paddingBottom:'100px'}}>{returnReviewList(reviews)}</TabPanel>
          </TabContext>
          </Paper>
        </Container>
        <Fab aria-label="Cart" className={classes.fab} onClick={()=>toCart(props.match.params.su_id)}>
          <ShoppingCartIcon/>
        </Fab>
        <BottomNav/>
        </>
    );
}