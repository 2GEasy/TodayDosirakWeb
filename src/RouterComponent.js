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

const AppRouter = () => {
return(
    <>
        <BrowserRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/storeadd/:su_id" component={StoreAdd} />
                
            <Appbar>    
                <div>
                <Route exact path="/" component={Dashbrd} />
                <Route path="/menuchart" component={MonthMenu} /> 
                <Route path="/open" component={OpenState} />
                <Route path="/salerInfo" component={SalerInfo} />
                <Route path="/stock" component={Stock} />
                <Route path="/usermod" component={UserMod} />
                <Route path="/pwchk" component={PWChk} />
                <Route path="/order" component={OrderList} />
                <Route path="/hygiene" component={Hygiene} />
                <Route path="/storeMod" component={StoreMod} />
                </div>
            </Appbar>
            {/* <Route path="/hygieneview" component={HygieneInfo} /> */}
                {/* <Route path="/noticeview/:ntcb_id" component={NoticeView} /> */}
            </Switch>
        </BrowserRouter>
    </>
);
}

export default AppRouter;