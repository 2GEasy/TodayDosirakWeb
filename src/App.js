import React from 'react';
import Login from './page/Login';
import Signup from './page/Signup';
import Datef from './component/Datef';
import Dashbrd from './component/Dashbrd';
import Dash from './page/Dash';
import Appbar from './component/Appbar';
import SalerInfo from './page/SalerInfo';
import HygieneInfo from './page/HygieneInfo';
import MonthMenu from './page/MonthMenu';
import OpenState from './page/OpenState';

function App() {
  return (
    <>
      <Appbar>
      <OpenState />
      </Appbar>
    </>
  );
}

export default App;
