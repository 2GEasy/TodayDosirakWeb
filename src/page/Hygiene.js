import React,{useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import HygieneInfo from '../component/HygieneInfo';
import HygieneInfoAdd from '../component/HygieneInfoAdd';

import {fade} from '@material-ui/core/styles/colorManipulator';
import ApiService from '../ApiService';

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

  
  export default function Hygiene(props) {
    const [hygiene,setHygiene] = useState([]);
    const cellList = ["번호","이미지","이름","설명","수정","삭제"];
    const classes = styles;
    useEffect(()=>{
      if(window.sessionStorage.getItem("userID")===null){
        alert("로그인을 해주세요.");
        props.history.push('login');
      }else{
        loadHygieneInfo(window.sessionStorage.getItem("userID"))
      }
    },[])
    const loadHygieneInfo=(su_id)=> {
      ApiService.fetchHygiene(su_id)
      .then(res=> {
        console.log("위생정보 로드 성공 ");
        setHygiene(res.data);
        console.log("res.data: ",res.data)
        console.log("hygiene:", hygiene);
      })
      .catch(err=> {
        console.log("loadHygiene Error!", err);
      })
    }
    const listAttach=(data)=>{
      return data.map((c,index)=>{
        
        return <HygieneInfo key={index} hgn_id={c.hgn_id} num={index} image={c.hgnFileChk} title={c.hgnTitle} explain={c.hgnExpln} />;
        
      })
    }
    return (
      <>
        <div className={classes.menu}>
            <HygieneInfoAdd />
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
                {listAttach(hygiene)}
            </TableBody>
            </Table>
        </Paper>
        </>
    );
}