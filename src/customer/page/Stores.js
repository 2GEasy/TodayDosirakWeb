import React,{useState,useEffect} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Store from '../component/Store';
import Appbar from '../component/Appbar';
import ApiService from '../ApiService';
import { Container,Paper } from '@material-ui/core';
import BottomNav from '../component/BottomNav';
import axios from 'axios';
const {kakao} = window;

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
  },[]);
  useEffect(()=>{
    console.log(stores);
  },[stores])
  const fetchStoreList=(category)=>{
    console.log("category:",category);
    ApiService.fetchStoreList(category)
    .then(res=>{
        var tempStores = res.data;
        tempStores.map(async (c)=>{
          const distance = await addr2geo(c.storeAddr1);
          console.log("distance:"+distance);
          if(distance<1000) {
            c.distance=distance;
            setStores(stores.concat(c));
            console.log("true:",c);
          }
        });
        console.log(stores);
        
      })
    .catch(err=>{
        console.log("fetchStores ERR",err);
    })
  }
  var tempChk = false;
  const addr2geo=(addr)=>new Promise(function (resolve,reject) {
    
    var tempDistance;
    var geocoder = new kakao.maps.services.Geocoder();
    geocoder.addressSearch(addr,async function (result,status) {
      if(status===kakao.maps.services.Status.OK) {
        console.log("storeGeo:",result[0].x,result[0].y);
        
        const res = await fetchDistance(result[0].x, result[0].y);
        var resTemp = res.data.features[0].properties;
        console.log(resTemp);
        tempDistance = resTemp.totalDistance;
        resolve(tempDistance);
      }else{
        reject();
      }
    });
  });
  const fetchDistance=async (sx,sy,cb)=>{
    console.log("customerGeo:",window.sessionStorage.getItem('cgeox'),window.sessionStorage.getItem('cgeoy'));
    let data = {
      "appKey": "l7xx56452204358449a5b2870d785ce145da",
      "startX": sx,
      "startY": sy,
      "endX": window.sessionStorage.getItem('cgeox'),
      "endY": window.sessionStorage.getItem('cgeoy'),
      "reqCoordType": "WGS84GEO",
      "resCoordType": "EPSG3857",
      "startName": "출발지",
      "endName": "도착지"
    };
    const config = {
      headers: {
         'Content-Type': 'application/x-www-form-urlencoded'
      }
   }
   function objectToQuerystring(obj) {
      return Object.keys(obj).reduce(function (str, key, i) {
         var delimiter, val;
         delimiter = (i === 0) ? '' : '&';
         key = encodeURIComponent(key);
         val = encodeURIComponent(obj[key]);
         return [str, delimiter, key, '=', val].join('');
      }, '');
   }
  

  //  await axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",

  //     objectToQuerystring(data), config

  //     // { withCredentials: true }
  //  );
   const res = await axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",

   objectToQuerystring(data), config);
  //  console.log(res);
   return res;
      // .then(res => {
      //    // console.log(res.data.features[0]);
      //     var resultData = res.data.features;
      //     //결과 출력
      //     // var tDistance = "총 거리 : "
      //     //         + ((resultData[0].properties.totalDistance) / 1000)
      //     //                 .toFixed(1) + "km,";
      //     // var tTime = " 총 시간 : "
      //     //         + ((resultData[0].properties.totalTime) / 60)
      //     //                 .toFixed(0) + "분";
      //     setDistance(resultData[0].properties.totalDistance);
          
          
      //     cb(resultData[0].properties.totalDistance);
      // })
      // .catch(err => {
      //    console.log(err);
      // })
      
  };
  
  //props.match.params.cate
  const returnStoreList=(data)=>{
    return data.map((c,index)=>{
      return <Store key={index} su_id={c.su_id} storeImgChk={c.storeImgChk} storeName={c.storeName} storeExplain={c.storeExplain} deliverPosible={c.deliverPosible} abledeliverS={c.abledeliverS} abledeliverE={c.abledeliverE} distance={c.distance} count={c.count} favorite={c.favorite} />;
    })
  };   
  
  return (
    <>
    <Appbar>
        <Container>
            <Paper>
                {stores?returnStoreList(stores):null}
            </Paper>
        </Container>
    </Appbar>
        <BottomNav/>
    </>
  );
}