
import './App.css';
import 'antd/dist/antd.css'; 
import axios from "axios";
import{
  BrowserRouter as Router,
  Switch,

  Route 
} from "react-router-dom"
import TrangChu from './pages/TrangChu';

function App() {

  return (
   <Router>
     <Switch>
      
       <Route path = "/trangchu">
       <TrangChu/>
       </Route>
     </Switch>
   </Router>
    
  );
}

export default App;
