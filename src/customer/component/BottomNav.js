import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link , withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    position:'fixed',
    width: '100%',
    backgroundColor: '#FDC06D',
    float:'bottom',
    bottom:0,
    left:0,
  },
});

export default function BottomNav(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  
  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction component={Link} to="/customer/orderHistory" label="주문 내역" icon={<AssignmentIcon />} style={{color:'#ffffff'}}/>
      <BottomNavigationAction label="찜스토어" icon={<FavoriteIcon />} style={{color:'#ffffff'}}/>
      <BottomNavigationAction label="마이페이지" icon={<AccountCircleIcon />} style={{color:'#ffffff'}}/>
    </BottomNavigation>
  );
}