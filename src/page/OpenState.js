import React,{ useState,useEffect } from 'react';
import { Button, Container } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import Typography from '@material-ui/core/Typography';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import ApiService from '../ApiService';
import OpenInfo from '../component/OpenInfo';
import Appbar from '../component/Appbar';

const styles = theme => ({
    root: {
      width: '100%',
      minWidth: 1080
    },
    paper: {
      maringLeft: 18,
      marginRight: 18
    },
    tableHead: {
      fontSize: '1rem',
    },
    menu: {
      marginTop:15,
      marginBottom:15,
      display: 'flex',
      justifyContent: 'center'
    },
    progress : {
      margin : theme.spacing(2)
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    
  })

export default function OpenState(props) {
    const classes = styles;
    const [openState,setOpenState] = useState('');
    const [opened, setOpened] = useState(false);
    const [openList, setOpenList] = useState([]);
    const cellList = ['번호','일자','시작','종료','상태']
    const openedButton=(prop)=> {
        if(prop) {
            return <Button variant="contained" color="secondary" onClick={changeState}>영업 종료</Button>
        }else {
            return <Button variant="contained" color="primary" onClick={changeState}>영업 시작</Button>
        }
    }
    const changeState=()=>{
        if(openState.state) {
            ApiService.updateOpenState(openState.open_id,openState.su_id)
            .then(res=>{
                stateRefresh();
            })
            .catch(err=>{
                console.log("updateOpenState Error!", err);
            })
        }else{
            ApiService.insertOpenState(window.sessionStorage.getItem("userID"))
            .then(res=>{
                stateRefresh();
            })
            .catch(err=>{
                console.log("updateOpenState Error!", err);
            })
        }
    }
    useEffect(()=>{
      if(window.sessionStorage.getItem("userID")===null){
        alert("로그인을 해주세요.");
        props.history.push('login');
      }else{
        loadOpenList(window.sessionStorage.getItem("userID"));
        loadOpenState(window.sessionStorage.getItem("userID"));
      }
    },[])
    const loadOpenList=(su_id)=> {
      ApiService.fetchOpenList(su_id)
      .then(res=> {
        console.log("오픈리스트 로드 성공 ");
        setOpenList(res.data);
        console.log("res.data: ",res.data);
        console.log("openList: ",openList);
      })
      .catch(err=> {
        console.log("fetchOpenList Error!", err);
      })
    }
    const loadOpenState=(su_id)=> {
        ApiService.fetchOpenState(su_id)
        .then(res=> {
          console.log("마지막 영업정보 로드 성공 ");
          setOpenState(res.data);
          console.log("res.data: ",res.data);
          
        })
        .catch(err=> {
          console.log("fetchOpenState Error!", err);
        })
      }
    const stateRefresh =()=>{
      setOpenList([]);
      setOpenState('');
      loadOpenList(window.sessionStorage.getItem("userID"));
      loadOpenState(window.sessionStorage.getItem("userID"));
    }
    const listAttach=(data)=>{
        return data.map((c,index)=>{
          
          return <OpenInfo key={index} num={index+1} regDate={c.regDate} start={c.start} end={c.end} state={c.state} />;
          
        })
    }
    const stateReturn=(isOpen)=>{
        if(isOpen) {
            return "영업 중";
        }else{
            return "영업 종료";
        }
    }
    return (
        <>
        <Appbar>
        <Container component="main" maxWidth="xl" style={{padding: '20px'}}>
            <Typography style={{fontSize:'1.8rem'}}>영업 상태</Typography>
            <Paper className={classes.paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow style={{backgroundColor:'#f3f3f3'}}>
                    {cellList.map((c,index) => {
                        return <TableCell className={classes.tableHead} key={index}>{c}</TableCell>
                    })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {openList ?
                    listAttach(openList)
                    :
                    <>
                    <TableRow>
                        <TableCell colSpan={5}> </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={5}> </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={5}> </TableCell>
                    </TableRow>
                    <TableRow>
                    <TableCell colSpan={5}> </TableCell>
                    </TableRow>
                    </>
                    }
                </TableBody>
            </Table>
                    </Paper>
            <br/> <br/> <br/>
                    <Paper>
            <Table className={classes.table}>
            <TableHead>
                <TableRow style={{backgroundColor:'#f3f3f3'}}>
                    <TableCell className={classes.tableHead}>
                        영업 상태
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                        시작시간
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                        종료시간
                    </TableCell>
                    <TableCell className={classes.tableHead}>
                        상태 변경
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            
                <TableRow>
                    <TableCell>
                        {stateReturn(openState.state)}
                    </TableCell>
                    <TableCell>
                        {openState.start}
                        {/* 시작 */}
                    </TableCell>
                    <TableCell>
                        {openState.end}
                        {/* 종료 */}
                    </TableCell>
                    <TableCell>
                        {openedButton(openState.state)}
                    </TableCell>
                </TableRow>
            
            </TableBody>
        </Table>
        </Paper>
        </Container>
        </Appbar>
        </>
    );
}