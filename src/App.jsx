import {Routes, Route} from 'react-router-dom'
import './App.css'

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";
import Kids from "./components/Kids/Kids";
import Camps from "./components/Camps/Camps";
import AddKid from './components/Kids/AddKid';


function App() {

  return (
    <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/kids" element={<Kids/>}/>
          <Route path="/kids/add" element={<AddKid/>}/>
          <Route path="/camps" element={<Camps/>}/>
        </Routes>
    </div>
  );
}

export default App;
