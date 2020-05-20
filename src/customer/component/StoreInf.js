import React,{useState,useEffect} from 'react';
import { Container, Typography, Divider } from '@material-ui/core';
import HygieneImg from './HygieneImg';
import ApiService from '../ApiService';

export default function StoreInf(props) {
    const [hy,setHy] = useState([]);
    useEffect(()=>{
        console.log(props.su_id);
        fetchHygiene(props.su_id);
    },[])
    const fetchHygiene=(su_id)=>{
        ApiService.fetchHygiene(su_id)
        .then(res=>{
            console.log("fetchHygiene." ,res.data);
            setHy(res.data);
        })
        .catch(err=>{
            console.log("fetchHygiene ERR!",err);
        })
    }
    const returnHygiene=(data)=>{
        return data.map((c,index)=>{
            return (
                <>
                <Typography variant="subtitle2" color="textSecondary" key={index}>이름</Typography><br/>   
                <Typography>{c.hgnTitle}</Typography><br/>
                <Typography variant="subtitle2" color="textSecondary">설명</Typography><br/>   
                <Typography>{c.hgnExpln}</Typography><br/>
                <HygieneImg su_id={c.su_id} hgn_id={c.hgn_id} /><br/>
                <Divider/><br/>
                </>
            );
        })
    }
    return(
        <Container>
            <Typography variant="subtitle2" color="textSecondary">스토어 이름</Typography><br/>
            <Typography>{props.storeName}</Typography><br/>
            <Typography variant="subtitle2" color="textSecondary">스토어 설명</Typography><br/>
            <Typography>{props.storeExplain}</Typography><br/>
            <Typography variant="subtitle2" color="textSecondary">배달 가능 지역</Typography><br/>
            <Typography>{props.deliverPosible}</Typography><br/>
            <Typography variant="subtitle2" color="textSecondary">스토어 주소</Typography><br/>   
            <Typography>{props.storeAddr1} {props.storeAddr2}</Typography><br/>
            <Typography variant="subtitle2" color="textSecondary">스토어 연략처</Typography><br/>   
            <Typography>{props.storePhone}</Typography><br/>
            <Typography variant="subtitle2" color="textSecondary">배달 가능 시간</Typography><br/>   
            <Typography>{props.abledeliverS}~</Typography><Typography>{props.abledeliverE}</Typography><br/>
            <Divider/><br/>
            <Typography>위생정보</Typography><br/>   
            {returnHygiene(hy)}
        </Container>
    );
}