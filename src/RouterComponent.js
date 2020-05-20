import React, { useEffect,useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Appbar from './component/Appbar';
import Dashbrd from './page/Dashbrd';
import Login from './page/Login';
import Signup from './page/Signup';
import MonthMenu from './page/MonthMenu';
import OpenState from './page/OpenState';
import SalerInfo from './page/SalerInfo';
import Stock from './page/Stock';
import UserMod from './page/UserMod';
import OrderList from './page/OrderList';
import Hygiene from './page/Hygiene';
import PWChk from './page/PwChk';
import StoreMod from './page/SalerInfoMod';
import StoreAdd from './page/SalerInfoAdd';
import Menu from './page/Menu';
import Review from './page/Review';


import Main from "./produce/page/Main";
import Produce from "./produce/page/Produce";
import Notice from "./produce/page/NoticeBoard";
import BestSaler from './produce/page/BestSaler';
import Inquire from './produce/page/Inquire';
import Master from './produce/page/Master';
import Nav from './produce/component/Nav';
import NoticeView from './produce/page/NoticeView';

import CustomerMain from './customer/page/Main';
import CustomerLogin from './customer/page/Login';
import CustomerSignup from './customer/page/Signup';
import Stores from './customer/page/Stores';
import CustomerAppbar from './customer/component/Appbar';
import BottomNav from './customer/component/BottomNav';
import StoreView from './customer/page/StoreView';
import MenuView from './customer/page/MenuView';


const AppRouter = () => {
return(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/storeadd/:su_id" component={StoreAdd} />
                {/* <Nav>
                    <div>
                    <Route path="/produce/" component={Main} />
                    <Route path="/produce/notice" component={Notice} />
                    <Route path="/produce/produce" component={Produce} />
                    <Route path="/produce/bsaler" component={BestSaler} />
                    <Route path="/produce/inquire" component={Inquire} />
                    <Route path="/produce/master" component={Master} />
                    <Route path="/produce/noticeview/:ntcb_id" component={NoticeView} />
                    </div>
                </Nav> */}
                    <Route exact path="/" component={Dashbrd} />
                    <Route path="/saler" component={Dashbrd} />
                    <Route path="/menuchart" component={MonthMenu} /> 
                    <Route path="/open" component={OpenState} />
                    <Route path="/salerInfo" component={SalerInfo} />
                    <Route path="/stock" component={Stock} />
                    <Route path="/usermod" component={UserMod} />
                    <Route path="/pwchk" component={PWChk} />
                    <Route path="/order" component={OrderList} />
                    <Route path="/hygiene" component={Hygiene} />
                    <Route path="/storeMod" component={StoreMod} />
                    <Route path="/menu" component={Menu} />
                    <Route path="/review" component={Review} />
                   
                <Route exact path="/customer/" component={CustomerMain} />
                <Route path="/customer/login" component={CustomerLogin} />
                <Route path="/customer/signup" component={CustomerSignup} />
                <Route path="/customer/store/:su_id" component={StoreView} />
                <Route path="/customer/menu/:su_id/:mn_id" component={MenuView} />
            
                <Route path="/customer/main" component={CustomerMain} />
                <Route path="/customer/category/:cate" component={Stores} />
                
               
                
                
            </Switch>
        </BrowserRouter>

    </>
);
}

export default AppRouter;