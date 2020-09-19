import React, { useState,useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import {Link} from 'react-router-dom';
import Chart from '../component/Chart';
import Deposits from '../component/Deposits';

import DashOrder from '../component/DashOrder';
import ApiService from '../ApiService';
import Appbar from '../component/Appbar';
import { TableFooter, Button, TableRow } from '@material-ui/core';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          오늘도시락
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const drawerWidth = 240;
  
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
      display:'grid',
      gridTemplateAreas: `
        "chart deposit"
        "orderlist orderlist"
        `
    },
    item1: {
      gridArea: 'chart'
    },
    item2: {
      gridArea:'deposit'
    },
    item3: {
      gridArea:'orderlist',
      paddingTop: 20,
      overflow:'hidden',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 240,
    },
  }));

export default function Dashbrd(props) {
    
        const classes = useStyles();
        
        const [orderList,setOrderList] = useState([]);
        useEffect(()=>{
          if(window.sessionStorage.getItem("userID")===null){
            alert("로그인을 해주세요.");
            props.history.push('login');
          }else{
            loadSalerLastOrderList(window.sessionStorage.getItem("userID"));
          }
        },[]);
        const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
        const loadSalerLastOrderList=(su_id)=> {
          ApiService.loadSalerLastOrderList(su_id)
          .then(res=>{
            setOrderList(res.data);
            console.log(res.data);
          })
          .catch(err=>{
            console.log("loadSalerLastOrderList Error!",err);
          })
        }
        const returnOrderList=(data)=>{
          return data.map((c,index)=>{
            return <DashOrder key={index,c.ord_id} ord={c.ord_id} su_id={c.su_id} pu_id={c.pu_id} num={index+1} addr1={c.addr1} addr2={c.addr2} dreqstart={c.dreqstart} dreqend={c.dreqend} ordDate={c.ordDate} />;
          })
        }
        const cellList = ["배송지","요청시간(부터)","요청시간(까지)","메뉴","총 금액","주문일시"];
        return (
            <Appbar> 
          <div className={classes.root}>
            <main className={classes.content}>
        
            <Container maxWidth="lg" className={classes.container}>
              
                <div className={classes.item1}>
                {/* Chart */}
                
                  <Paper className={fixedHeightPaper} style={{width:'900px'}}>
                    <Chart />
                  </Paper>
                </div>
                <div className={classes.item2}>
                {/* Recent Deposits */}
                
                  <Paper className={fixedHeightPaper} style={{width:'300px'}}>
                    <Deposits />
                  </Paper>
                </div>
                
                {/* Recent Orders */}
                <div className={classes.item3}>
                  <Paper className={classes.paper}>
                  <Typography component="h2" variant="h6" color="primary" gutterBottom>
                    주문내역
                  </Typography>
                  <Table size="small">
                    <TableHead>
                      {cellList.map((c,index)=>{
                        return <TableCell key={index}>{c}</TableCell>
                      })}
                    </TableHead>
                    <TableBody>
                    {returnOrderList(orderList)}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TableCell colspan={6}>
                        <center><Link to="/order" style={{textDecoration:'none', fontWeight:'bold',fontSize:'1rem'}}><b>더보기</b></Link></center>
                        </TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                  </Paper>
                  <Box pt={4}>
                    <Copyright />
                  </Box>
                </div>
              
            </Container>
          </main>
        </div>
        </Appbar>
        );
    }
