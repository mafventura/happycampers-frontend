import {Routes, Route} from 'react-router-dom'
import './App.css'

import Home from "./components/Home";
import NavBar from "./components/NavBar";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Logout from "./components/Auth/Logout";

import Camps from "./components/Camps/Camps";
import AddCamp from './components/Camps/AddCamp';
import EditCamp from "./components/Camps/EditCamp";
import CampDetail from './components/Camps/CampDetail';
import UpcomingCamps from "./components/Camps/UpcomingCamps";

import Kids from "./components/Kids/Kids";
import AddKid from './components/Kids/AddKid';
import AllKids from './components/Kids/AllKids';
import EditKid from './components/Kids/EditKid';
import KidDetail from './components/Kids/KidDetail';

import RegisterToACamp from './components/Kids/RegisterToACamp';

import AddWeek from './components/Weeks/AddWeek';

import Staff from './components/Staff/Staff';
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
          <Route path="/kids/list_all" element={<AllKids/>}/>
          <Route path="/kids/add" element={<AddKid/>}/>
          <Route path="/kids/:id" element={<KidDetail/>}/>
          <Route path="/kids/:id/edit" element={<EditKid/>}/>
          <Route path="/camps" element={<Camps/>}/>
          <Route path="/camps/add" element={<AddCamp/>}/>
          <Route path="/camps/:id" element={<CampDetail/>}/>
          <Route path="/camps/:id/edit" element={<EditCamp/>}/>
          <Route path="/camps/upcoming_camps" element={<UpcomingCamps/>}/>
          <Route path="/staff" element={<Staff/>}/>
          <Route path="/staff/add" element={<AddStaff/>}/>
          <Route path="/register_to_camp" element={<RegisterToACamp/>}/>
          <Route path="/weeks/add" element={<AddWeek/>}/>
        </Routes>
    </div>
  );
}

export default App;
