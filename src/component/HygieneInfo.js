import React, {Component} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import HygieneInfoMod from './HygieneInfoMod';
import HygieneInfoDelete from './HygieneInfoDelete';
import { Button } from '@material-ui/core';
import ApiService from '../ApiService';

export default function HygieneInfo(props) {
        const inputImage=(bl)=>{
            if(bl) {
                ApiService.fetchHygieneImgPreview(window.sessionStorage.getItem("userID"), props.hgn_id)
                .then(res=>{
                    return res.data;
                })
                .catch(err=>{
                    console.log("hgnInfo inputImg Error!", err);
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
                        <img src='' alt="HygieneImage" />
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
                        <HygieneInfoMod hgn_id={props.hgn_id}/>
                        {/* 옵션 */}
                    </TableCell>
                    <TableCell>
                        <HygieneInfoDelete hgn_id={props.hgn_id} />
                    </TableCell>
                </TableRow>
                
    );
}