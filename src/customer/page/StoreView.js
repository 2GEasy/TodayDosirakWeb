import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import {Container,Paper} from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
    root: {
      width:'100%',
    },
    appbar: {
      maxWidth: '500px',
    }
}));

export default function StoreView(props) {
    const classes = useStyles;
    const [value, setValue] = useState('1');
    const [menus,setMenus] = useState([]);
    const [reviews,setReviews] = useState([]);
    const [storeInf,setStoreInf] = useState({});
    useEffect(()=>{
      if(window.sessionStorage.getItem("cid")===null) {
        alert("로그인을 해주세요.");
        props.history.push("/customer/login");
      }else{
        fetchMenuList(props.match.params.su_id);
        fetchReviewList(props.match.params.su_id);
        fetchStoreInfo(props.match.params.su_id);
      }
      console.log(props.match.params.su_id);
    },[])
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
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
      })
      .catch(err=>{
        console.log("fetchStoreInfo ERR.",err);
      })
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
        return <StoreInf su_id={data.su_id} storeName={data.storeName} storeExplain={data.storeExplain} deliverPosible={data.deliverPosible} storeAddr1={data.storeAddr1} storeAddr2={data.storeAddr2} storePhone={data.storePhone} abledeliverS={data.abledeliverS} abledeliverE={data.abledeliverE} />;
    }
    return (
        <>
        <Appbar>
        <Container maxWidth="sm">
          <Paper>
          <TabContext value={value}>
          <AppBar position="static" style={{backgroundColor:'#ffffff'}} className={classes.appbar}>
            <TabList onChange={handleChange} TabIndicatorProps={{style: {backgroundColor:'#F57C00'}}} centered>
              <Tab label="메뉴" value="1" style={{color:'#000000'}}/>
              <Tab label="정보" value="2" style={{color:'#000000'}}/>
              <Tab label="리뷰" value="3" style={{color:'#000000'}}/>
            </TabList>
          </AppBar>
          <TabPanel value="1">{returnMenuList(menus)}</TabPanel>
          <TabPanel value="2">{returnStoreInf(storeInf)}</TabPanel>
          <TabPanel value="3">{returnReviewList(reviews)}</TabPanel>
          </TabContext>
          </Paper>
        </Container>
        </Appbar>
        <BottomNav/>
        </>
    );
}