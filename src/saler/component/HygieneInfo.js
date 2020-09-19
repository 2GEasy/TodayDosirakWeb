import React, {Component, useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import HygieneInfoMod from './HygieneInfoMod';
import HygieneInfoDelete from './HygieneInfoDelete';
import { Button } from '@material-ui/core';
import ApiService from '../ApiService';

export default function HygieneInfo(props) {
        const [img,setImg] = useState({
            img_id:'',
            hgn_id:'',
            su_id:'',
            fileName:'',
            path:''
        });
        const imgPath = "http://todaydsr.kro.kr:7979/upload/hygiene/"+img.fileName;
        useEffect(()=>{
            inputImage(props.image);
        },[1])
        const inputImage=(bl)=>{
            if(bl) {
                ApiService.fetchHygieneImgPreview(window.localStorage.getItem("userID"), props.hgn_id)
                .then(res=>{
                    setImg(res.data);
                })
                .catch(err=>{
                    console.log("hgnInfo attach Error!", err);
                })
            }else{
                return '';
            }
        }
        return (
                <TableRow>
                    <TableCell>
                        <input type="hidden" value={props.hgn_id}/>
                        {props.num} 
                        {/* 번호 */}
                    </TableCell>
                    <TableCell>
                        <img src={imgPath} alt="HygieneImage" width={100} height={100}/>
                        {/* 이미지 */}
                    </TableCell>
                    <TableCell>
                        {props.title}
                        {/* 제목 */}
                    </TableCell>
                    <TableCell>
                        {props.explain}
                        {/* 설명 */}
                    </TableCell>
                    <TableCell>
                        <HygieneInfoMod stateRefresh={props.stateRefresh} hgn_id={props.hgn_id}/>
                        {/* 옵션 */}
                    </TableCell>
                    <TableCell>
                        <HygieneInfoDelete stateRefresh={props.stateRefresh} hgn_id={props.hgn_id} />
                    </TableCell>
                </TableRow>
                
    );
}