import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Store from '../component/Store';
import Appbar from '../component/Appbar';
import ApiService from '../ApiService';
import { Container,Paper } from '@material-ui/core';
import BottomNav from '../component/BottomNav';
import FavoriteStore from '../component/FavoriteStore';

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
  const [favorites,setFavorites] = useState([]);
  const classes = useStyles();
  const theme = useTheme;
  
  useEffect(()=>{
    fetchFavorite(window.sessionStorage.getItem('cid'));
  },[]);
  const fetchFavorite=(pu_id)=>{
    
    ApiService.fetchFavorite(pu_id)
    .then(res=>{
        setFavorites(res.data);
    })
    .catch(err=>{
        console.log("fetchFavorite ERR",err);
    })
  }
  
  //props.match.params.cate
  const returnFavoriteList=(data)=>{
    return data.map((c,index)=>{
      return <FavoriteStore key={index} su_id={c.su_id} storeImgChk={c.storeImgChk} storeName={c.storeName} storeExplain={c.storeExplain} deliverPosible={c.deliverPosible} abledeliverS={c.abledeliverS} abledeliverE={c.abledeliverE} distance={c.distance} count={c.count} favorite={c.favorite}/>;
    })
  };   
  
  return (
    <>
    <Appbar>
        <Container>
            <Paper>
                {favorites?returnFavoriteList(favorites):null}
            </Paper>
        </Container>
    </Appbar>
        <BottomNav/>
    </>
  );
}