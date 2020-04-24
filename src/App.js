import React from 'react';
import Login from './page/Login';
import Signup from './page/Signup';
import Datef from './component/Datef';
import Dashbrd from './component/Dashbrd';
import Dash from './page/Dash';
import Appbar from './component/Appbar';
import SalerInfo from './page/SalerInfo';
import HygieneInfo from './page/HygieneInfo';

function App() {
  return (
    <>
      <Appbar>
      <HygieneInfo />
      </Appbar>
    </>
  );
}

export default App;
