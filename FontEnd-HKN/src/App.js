
import './App.css';
import 'antd/dist/antd.css'; 

import{
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
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
