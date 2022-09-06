import {BrowserRouter as Router,Route,Routes,Link} from "react-router-dom";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { useState } from "react";
import Login from "./Login";
import { useStateValue } from './StateProvider';

function App() {
const [{user},dispatch]=useStateValue();

  return (

<div className="app">
{ !user?(
  <><Login/></>
):(
  

 <div className="app-container">
 <h3 className="title">
 <WhatsAppIcon/>
  WhatsApp</h3> 
 
 <div className="app-body">
  <Router>
  
    <Sidebar/>
    <Routes>
      
      <Route path="/rooms/:roomId" element={<><Chat /></>} />

      <Route path="/" element={<><h3>Home</h3></>} />
          
    
    </Routes>
    
  </Router>
    
</div>
 
 </div>
  

)

}



 
      
</div>
  );
}

export default App;
