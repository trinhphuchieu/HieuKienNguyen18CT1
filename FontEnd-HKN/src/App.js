
import './App.css';
import 'antd/dist/antd.css';
import axios from "axios";


import {
  BrowserRouter as Router,
  Switch,
  useHistory,

  Route
} from "react-router-dom"
import TrangChu from './pages/TrangChu';
import TrangTheSV from './pages/TrangTheSV';
function App() {
  
  return (
    <div>
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
