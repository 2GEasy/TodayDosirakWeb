import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../img/logo.png';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import {Link} from 'react-router-dom';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  
  title: {
    flexGrow: 1,
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
function ElevationScroll(props) {
  
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default function Appbar(props) {
    const classes = useStyles;
    const [auth,setAuth] = useState(false);
    const [addr, setAddr] = useState('현재 주소');
    const styles={
      appbar: {
        backgroundColor: '#FDC06D',
        width: '100%',
        height: '7%',
      },
      addr: {
        color: '#ffffff',
        flexGrow: 1,
        textAlign:'center',
        fontSize: '1.2rem'
      }
    }
    useEffect(()=>{
      if(window.sessionStorage.getItem("cid")!==null){
        setAuth(true);
      }else{
        setAuth(false);
      }
    },[])
    const setLogin=(authChk)=>{
      if(authChk) {
        return <Link to="login" style={{textDecoration:'none',color:'#ffffff'}}><Button color="inherit" align="right" onClick={()=>{window.sessionStorage.clear();}}><b>Logout</b></Button></Link>;
      }else {
        return <Link to="login" style={{textDecoration:'none',color:'#ffffff'}}><Button color="inherit" align="right"><b>Login</b></Button></Link>;
      }
    }
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={styles.appbar}>
          <Toolbar>
          <Link to="/customer/"><img src={logo} alt="logo" width="50" height="50"/></Link>
            <Button style={styles.addr}><b>{addr}</b><ArrowDropDownIcon/></Button>
            {setLogin(auth)}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <div id="content" style={{marginTop: '100px'}}>
            {React.cloneElement(props.children)}
        </div>
      </main>
    </React.Fragment>
  );
}

