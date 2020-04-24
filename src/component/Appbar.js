import React,{useState} from 'react';
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

function AuthChk(props) {
    const authChk = props.auth;
    if(authChk===0) {
      return <Button color="inherit" align="right"><b>Login</b></Button>;
    }else {
      return <Button color="inherit" align="right"><b>Logout</b></Button>;
    }
}

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

export default function Main(props) {
    const [auth,setAuth] = useState(0);
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
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar style={styles.appbar}>
          <Toolbar>
          <img src={logo} alt="logo" width="50" height="50"/>
            <Button style={styles.addr}><b>{addr}</b><ArrowDropDownIcon/></Button>
            
            <AuthChk auth={auth}/>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
    </React.Fragment>
  );
}

