import React, {Component, useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import MenuMod from './MenuMod';
import MenuDelete from './MenuDelete';
import { Button } from '@material-ui/core';
import ApiService from '../ApiService';

export default function MenuInfo(props) {
        const [img,setImg] = useState({
            img_id:'',
            mn_id:'',
            su_id:'',
            fileName:'',
            path:''
        });
        const imgPath = "http://todaydsr.kro.kr:7979/upload/menu/"+img.fileName;
        useEffect(()=>{
            inputImage(props.image);
        },[1])
        const inputImage=(bl)=>{
            if(bl) {
                ApiService.fetchMenuImgPreview(window.localStorage.getItem("userID"), props.mn_id)
                .then(res=>{
                    setImg(res.data);
                })
                .catch(err=>{
                    console.log("Menu Preview Error!", err);
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
                        <img src={imgPath} alt="MenuImage" width={100} height={100}/>
                        {/* 이미지 */}
                    </TableCell>
                    <TableCell>
                        {props.name}
                        {/* 이름 */}
                    </TableCell>
                    <TableCell>
                        {props.produce}
                        {/* 설명 */}
                    </TableCell>
                    <TableCell>
                        {props.price}
                        {/* 가격 */}
                    </TableCell>
                    <TableCell>
                        <MenuMod stateRefresh={props.stateRefresh} mn_id={props.mn_id}/>
                        {/* 옵션 */}
                    </TableCell>
                    <TableCell>
                        <MenuDelete stateRefresh={props.stateRefresh} mn_id={props.mn_id} />
                    </TableCell>
                </TableRow>
                
    );
}