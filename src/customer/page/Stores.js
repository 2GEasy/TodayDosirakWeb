import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Store from '../component/Store';
import Appbar from '../component/Appbar';
import ApiService from '../ApiService';
import { Container,Paper } from '@material-ui/core';
import BottomNav from '../component/BottomNav';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function Stores(props) {
  const [stores,setStores] = useState([]);
  const classes = useStyles;
  const theme = useTheme;
  useEffect(()=>{
    console.log(props.match.params.cate);
    fetchStoreList(props.match.params.cate);
  },[])
  const fetchStoreList=(category)=>{
      ApiService.fetchStoreList(category)
      .then(res=>{
        setStores(res.data);
        console.log("fetchStoreList", res.data);
      })
      .catch(err=>{
          console.log("fetchStores ERR",err);
      })
  }
  //props.match.params.cate
  const returnStoreList=(data)=>{
    return data.map((c,index)=>{
      return <Store key={index} su_id={c.su_id} storeImgChk={c.storeImgChk} storeName={c.storeName} storeExplain={c.storeExplain} deliverPosible={c.deliverPosible} abledeliverS={c.abledeliverS} abledeliverS={c.abledeliverE} />;
    })
  }    
  
  return (
    <>
    <Appbar>
        <Container>
            <Paper>
                {returnStoreList(stores)}
            </Paper>
        </Container>
    </Appbar>
        <BottomNav/>
    </>
  );
}