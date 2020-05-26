import React, {useState, useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import StockMod from './StockMod';
import StockDelete from './StockDelete';
import { Button } from '@material-ui/core';
import ApiService from '../ApiService';

export default function OpenInfo(props) {
        const stateChk =(st)=>{
            if(st) {
                return "영업 중";
            }else{
                return "영업 종료";
            }
        }
        return (
                <TableRow>
                    <TableCell>
                        {props.num} 
                        {/* 번호 */}
                    </TableCell>
                    <TableCell>
                        {new Date(props.regDate).toLocaleString("ko-KR")}
                        {/* 일자 */}
                    </TableCell>
                    <TableCell>
                        {new Date(props.start).toLocaleString("ko-KR")}
                        {/* 시작 */}
                    </TableCell>
                    <TableCell>
                        {new Date(props.end).toLocaleString("ko-KR")}
                        {/* 종료 */}
                    </TableCell>
                    <TableCell>
                        {stateChk(props.state)}
                        {/* 상태 */}
                    </TableCell>
                </TableRow>
                
    );
}