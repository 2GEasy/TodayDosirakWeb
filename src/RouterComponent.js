import React, { useEffect,useState } from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashbrd from './saler/page/Dashbrd';
import Login from './saler/page/Login';
import Signup from './saler/page/Signup';
import MonthMenu from './saler/page/MonthMenu';
import OpenState from './saler/page/OpenState';
import SalerInfo from './saler/page/SalerInfo';
import Stock from './saler/page/Stock';
import UserMod from './saler/page/UserMod';
import OrderList from './saler/page/OrderList';
import Hygiene from './saler/page/Hygiene';
import PWChk from './saler/page/PwChk';
import StoreMod from './saler/page/SalerInfoMod';
import StoreAdd from './saler/page/SalerInfoAdd';
import Menu from './saler/page/Menu';
import Review from './saler/page/Review';

import MonthChart from './saler/component/MonthChart';
import DayChart from './saler/component/DayChart';
import YearChart from './saler/component/YearChart';
import Cart from './customer/page/Cart';
import Favorite from './customer/page/Favorite';
import Test from './customer/page/TEST';
import CustomerMain from './customer/page/Main';
import CustomerLogin from './customer/page/Login';
import CustomerSignup from './customer/page/Signup';
import Stores from './customer/page/Stores';
import StoreView from './customer/page/StoreView';
import MenuView from './customer/page/MenuView';
import OrderForm from './customer/page/OrderForm';
import OrderHistory from './customer/page/OrderHistory';
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
                    <Route path="/monthSales" component={MonthChart} />
                    <Route path="/daySales" component={DayChart} />
                    <Route path="/yearSales" component={YearChart} />
                   
                    <Route exact path="/customer/" component={CustomerMain} />
                    <Route path="/customer/main" component={CustomerMain} />
                    <Route path="/customer/login" component={CustomerLogin} />
                    <Route path="/customer/signup" component={CustomerSignup} />
                    <Route path="/customer/store/:su_id" component={StoreView} />
                    <Route path="/customer/menu/:su_id/:mn_id" component={MenuView} />
                
                    <Route path="/customer/category/:cate" component={Stores} />
                    <Route path="/customer/order" component={OrderForm} />
                    <Route path="/customer/orderHistory" component={OrderHistory} />
                    <Route path="/customer/cart" component={Cart} />
                    <Route path="/customer/favorite" component={Favorite} />
                    <Route path="/customer/test" component={Test} />
                
               
                
                
            </Switch>
        </BrowserRouter>

    </>
);
}

export default AppRouter;