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
import EditKid from './components/Kids/EditKid';
import AddStaff from './components/Staff/AddStaff';


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
          <Route path="/kids/:id/edit" element={<EditKid/>}/>
          <Route path="/camps" element={<Camps/>}/>
          <Route path="/staff/add" element={<AddStaff/>}/>
        </Routes>
    </div>
  );
}

export default App;
