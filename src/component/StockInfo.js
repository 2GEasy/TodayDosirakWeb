import React, {useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockMod from './StockMod';
import StockDelete from './StockDelete';
import { Button } from '@material-ui/core';
import ApiService from '../ApiService';

export default function StockInfo(props) {
        const [img,setImg] = useState({
            img_id:'',
            stck_id:'',
            su_id:'',
            fileName:'',
            path:''
        });
        const imgPath = img.path+img.fileName;
        useEffect(()=>{
            inputImage(props.image);
        },[1])
        const inputImage=(bl)=>{
            if(bl) {
                ApiService.fetchStockImgPreview(window.sessionStorage.getItem("userID"), props.stck_id)
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
                        {props.amount}
                        {/* 수량 */}
                    </TableCell>
                    <TableCell>
                        {props.minAmount}
                        {/* 최소 수량 */}
                    </TableCell>
                    <TableCell>
                        <StockMod stateRefresh={props.stateRefresh} stck_id={props.stck_id}/>
                        {/* 수정 */}
                    </TableCell>
                    <TableCell>
                        <StockDelete stateRefresh={props.stateRefresh} stck_id={props.stck_id} />
                        {/* 삭제 */}
                    </TableCell>
                </TableRow>
                
    );
}