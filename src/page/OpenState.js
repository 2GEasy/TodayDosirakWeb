import React,{ useState } from 'react';
import { Button } from '@material-ui/core';

export default function OpenState(props) {
    const [opened, setOpened] = useState(0);
    function openedButton(prop) {
        if(prop === 0) {
            return <Button variant="contained" color="primary" onClick={changeState}>영업 시작</Button>
        }else if(prop === 1) {
            return <Button variant="contained" color="secondary" onClick={changeState}>영업 종료</Button>
        }
    }
    const changeState=(e)=>{
        if(opened===0){
            setOpened(1);//영업 시작으로 변경
        }else{
            setOpened(0);//영업 종료로 변경
        }
    }
    return (
        <div style={{margin: '0 auto'}}>
            {openedButton(opened)}
        </div>
    );
}