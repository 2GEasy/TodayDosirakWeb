import React, {useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockMod from './StockMod';
import ApiService from '../ApiService';

export default function StockInfo(props) {
        const [img,setImg] = useState({
            img_id:'',
            mn_id:'',
            su_id:'',
            fileName:'',
            path:''
        });
        // https://todaydsr.kro.kr/upload/stock/
        const imgPath = "http://todaydsr.kro.kr:7979/upload/menu/"+img.fileName;
        
        useEffect(()=>{
            inputImage(props.image);
        },[1])
        const inputImage=(bl)=>{
            if(bl) {
                ApiService.fetchMenuImgPreview(window.sessionStorage.getItem("userID"), props.mn_id)
                .then(res=>{
                    setImg(res.data);
                    console.log("fetchStockImg",res.data);
                })
                .catch(err=>{
                    console.log("StockImgPreview Error!", err);
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
                        <img src={imgPath} alt="StockImage" width={100} height={100}/>
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
                        <StockMod stateRefresh={props.stateRefresh} mn_id={props.mn_id}/>
                        {/* 수정 */}
                    </TableCell>
                </TableRow>
                
    );
}