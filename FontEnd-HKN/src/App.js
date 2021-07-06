import React, { useContext, createContext, useState } from "react";
import './App.css';
import 'antd/dist/antd.css';
import axios from "axios";
import { Button } from 'antd';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom"
import TrangChu from './pages/TrangChu';


function App() {
  
  return (

      <div >
       <Router>
          <Switch>      
            <Route path="/trangchu">
            <TrangChu />
            </Route>     
          </Switch>
        </Router>

      </div>
  
  );
}




export default App;
