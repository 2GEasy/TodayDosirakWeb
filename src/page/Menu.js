import React,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Paper from '@material-ui/core/Paper';
import MenuInfo from '../component/MenuInfo';
import MenuAdd from '../component/MenuAdd';

import {fade} from '@material-ui/core/styles/colorManipulator';
import ApiService from '../ApiService';
import Appbar from '../component/Appbar';
import { Typography } from '@material-ui/core';

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
      fontSize: '1rem'
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    }
  })

  
  export default function Menu(props) {
    const [menu,setMenu] = useState([]);
    const cellList = ["번호","이미지","이름","설명","가격","수정","삭제"];
    const classes = styles;
    useEffect(()=>{
      if(window.sessionStorage.getItem("userID")===null){
        alert("로그인을 해주세요.");
        props.history.push('login');
      }else{
        loadMenuInfo(window.sessionStorage.getItem("userID"));
      }
    },[])
    const loadMenuInfo=(su_id)=> {
      ApiService.fetchMenuList(su_id)
      .then(res=> {
        console.log("메뉴리스트 로드 성공 ");
        setMenu(res.data);
        console.log("res.data: ",res.data);
        console.log("menu:", menu);
      })
      .catch(err=> {
        console.log("loadMenu Error!", err);
      })
    }
    const stateRefresh =()=>{
      setMenu([]);
      loadMenuInfo(window.sessionStorage.getItem("userID"));
    }
    const listAttach=(data)=>{
      return data.map((c,index)=>{
        
        return <MenuInfo key={index} mn_id={c.mn_id} num={index+1} image={c.fileChk} name={c.name} produce={c.produce} price={c.price} stateRefresh={stateRefresh} />;
        
      })
    }
    return (
      <>
        <Appbar>
        <div style={{margin:'20px'}}>
          <Typography variant="h5" style={{marginTop:'20px',marginBottom:'20px'}}><b>메뉴 관리</b></Typography>
          <div className={classes.menu}>
              <MenuAdd stateRefresh={stateRefresh}/>
          </div>
          <Paper className={classes.paper}>
              <Table className={classes.table}>
              <TableHead>
                  <TableRow>
                  {cellList.map((c,index) => {
                      return <TableCell className={classes.tableHead} key={index}>{c}</TableCell>
                  })}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {listAttach(menu)}
              </TableBody>
              </Table>
          </Paper>
        </div>
        </Appbar>
        </>
    );
}