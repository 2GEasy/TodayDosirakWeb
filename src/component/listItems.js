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

const style = {
  link: {
    textDecoration:'none',
    color:'#000000'
  }
}
export const mainListItems = (
  <div>
    <ListSubheader inset>메인</ListSubheader>
    <RouterLink to="/saler" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="대쉬보드" />
    </ListItem>
    </RouterLink>
    <RouterLink to="order" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="주문내역" />
    </ListItem>
    </RouterLink>
    <RouterLink to="review" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="리뷰내역" />
    </ListItem>
    </RouterLink>
    
    <RouterLink to="menu" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="메뉴" />
    </ListItem>
    </RouterLink>

    <RouterLink to="stock" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="재고" />
    </ListItem>
    </RouterLink>
    <RouterLink to="open" style={style.link}>
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
    
    <RouterLink to="monthSales" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="이번달 매출" />
    </ListItem>
    </RouterLink>
    <RouterLink to="daySales" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="일일 매출" />
    </ListItem>
    </RouterLink>
    <RouterLink to="yearSales" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="올해 매출" />
    </ListItem>
    </RouterLink>
  </div>
);
export const userInfo = (
  <div>
    <ListSubheader inset>회원정보</ListSubheader>
    <RouterLink to="pwchk" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="회원정보 수정" />
    </ListItem>
    </RouterLink>
    <RouterLink to="salerInfo" style={style.link}>
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="판매자정보 수정" />
    </ListItem>
    </RouterLink>
    <RouterLink to="hygiene" style={style.link}>
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