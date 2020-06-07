import React,{useState, useEffect} from 'react';
import {Button, Dialog, DialogTitle, DialogContent} from '@material-ui/core';
import DaumPostcode from 'react-daum-postcode';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import axios from 'axios';
const {kakao} = window;

const Postcode = (props) => {
  const [open,setOpen] = useState(false);
  // const [lngX,setLngX] = useState('');
  // const [latY,setLatY] = useState('');

  // useEffect(()=>{
  //   if(lngX!=='' && latY!==''){
  //     fetchDistance(lngX,latY);
  //   }
  // },[latY]);

  const handleComplete = (data) => {
    console.log(data);
    let fullAddress = data.address;
    let extraAddress = ''; 
    
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }

    console.log(fullAddress);  // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
    props.setAddr(data.address);
    window.sessionStorage.setItem("addr",data.address);
    addr2geo(data.address);
    handleClose();
  }
  const handleClickOpen = () => {
      setOpen(true);
  }
  const handleClose = () => {
      setOpen(false);
  }
  const addr2geo=(addr)=>{
    var geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(addr,function(result,status) {
            if(status===kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                // console.log("좌표:",coords);
                // console.log("X:",coords.getLng(),"Y:",coords.getLat());
                window.sessionStorage.setItem("cgeox",coords.getLng());
                window.sessionStorage.setItem("cgeoy",coords.getLat());
                // setLngX(coords.getLng());
                // setLatY(coords.getLat());
            }
        })
  }
  // const fetchDistance=(x,y)=>{
  //   let data = {
  //     "appKey": "l7xx56452204358449a5b2870d785ce145da",
  //     "startX": x,
  //     "startY": y,
  //     "endX": "128.535891098454",
  //     "endY": "35.8054390756019",
  //     "reqCoordType": "WGS84GEO",
  //     "resCoordType": "EPSG3857",
  //     "startName": "출발지",
  //     "endName": "도착지"
  //  };
  //  const config = {
  //     headers: {
  //        'Content-Type': 'application/x-www-form-urlencoded'
  //     }
  //  }
  //  function objectToQuerystring(obj) {
  //     return Object.keys(obj).reduce(function (str, key, i) {
  //        var delimiter, val;
  //        delimiter = (i === 0) ? '' : '&';
  //        key = encodeURIComponent(key);
  //        val = encodeURIComponent(obj[key]);
  //        return [str, delimiter, key, '=', val].join('');
  //     }, '');
  //  }


  //  axios.post("https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1&format=json&callback=result",

  //     objectToQuerystring(data), config

  //     // { withCredentials: true }
  //  )
  //     .then(res => {
  //        // console.log(res.data.features[0]);
  //         var resultData = res.data.features;
  //         //결과 출력
  //         var tDistance = "총 거리 : "
  //                 + ((resultData[0].properties.totalDistance) / 1000)
  //                         .toFixed(1) + "km,";
  //         var tTime = " 총 시간 : "
  //                 + ((resultData[0].properties.totalTime) / 60)
  //                         .toFixed(0) + "분";

          
  //         console.log((tTime+"\n"+tDistance));
  //     })
  //     .catch(err => {
  //        console.log(err);
  //        //  console.log("error:",err);
  //     })
  // }
  return (
    <>
                <Button onClick={handleClickOpen} style={{color: '#ffffff',flexGrow: 1,textAlign:'center',fontSize: '1rem',width:'90%'}}>{(window.sessionStorage.getItem('addr')?window.sessionStorage.getItem('addr'):props.title)}<ArrowDropDownIcon/></Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>주소 검색</DialogTitle>
                    <DialogContent>
                    <DaumPostcode
                      onComplete={handleComplete}
                      { ...props }
                    />
                    </DialogContent>
                    {/* <DialogActions>
                        <Button variant="contained" color="primary" onClick={onSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions> */}
                </Dialog>
    </>
  );
}
export default Postcode;