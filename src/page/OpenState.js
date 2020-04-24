import React,{useState } from 'react';
import { Button } from '@material-ui/core';

export default function OpenState(props) {
    const [opened, setOpened] = useState(0);
    function openedButton() {
        if(opened === 0) {
            return <Button color="primary">영업 시작</Button>
        }else if(opened === 1) {
            return <Button color="secondary">영업 종료</Button>
        }
    }
    return (
        <div>
            {openedButton}
        </div>
    );
}