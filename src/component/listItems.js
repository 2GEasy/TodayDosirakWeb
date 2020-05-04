import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { Link as RouterLink } from 'react-router-dom';

export const mainListItems = (
  <div>
    <ListSubheader inset>메인</ListSubheader>
    <RouterLink to="/">
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="대쉬보드" />
    </ListItem>
    </RouterLink>
    <RouterLink to="order">
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="주문내역" />
    </ListItem>
    </RouterLink>
    {/* <RouterLink to="review"> */}
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="리뷰내역" />
    </ListItem>
    {/* </RouterLink> */}
    
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="메뉴" />
    </ListItem>
    <RouterLink to="menuchart">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="식단표" />
    </ListItem>
    </RouterLink>
    <RouterLink to="stock">
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="재고" />
    </ListItem>
    </RouterLink>
    <RouterLink to="open">
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="영업상태" />
    </ListItem>
    </RouterLink>
  </div>
);
export const salesList = (
  <div>
    <ListSubheader inset>매출</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="매출" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="이번달 매출" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="일일 매출" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="올해 매출" />
    </ListItem>
  </div>
);
export const userInfo = (
  <div>
    <ListSubheader inset>회원정보</ListSubheader>
    <RouterLink to="userMod">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="회원정보 수정" />
    </ListItem>
    </RouterLink>
    <RouterLink to="salerInfo">
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="판매자정보 수정" />
    </ListItem>
    </RouterLink>
    <RouterLink to="hygiene">
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="위생정보 수정" />
    </ListItem>
    </RouterLink>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon color="secondary" />
      </ListItemIcon>
      <ListItemText primary="회원탈퇴" />
    </ListItem>
  </div>
);