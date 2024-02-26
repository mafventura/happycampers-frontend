import {Container, Nav, NavDropdown, Navbar} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './NavBar.css'
import React, { useState, useEffect} from 'react';
import { jwtDecode } from "jwt-decode";

export default function NavBar() {

    const [isAuth, setIsAuth] = useState(false);
    const [isStaff, setIsStaff] = useState(false);
    
    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
            setIsAuth(true);
            fetchUserData();
        }
    }, [isAuth]);

    const fetchUserData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            const token = localStorage.getItem('access_token')
            const decoded = jwtDecode(token);
            console.log("RESPONSE:", response.data);
            const user = response.data.find(user => user.id === decoded.user_id)
            console.log("USER: ", user);
            setIsStaff(user.is_staff);
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
    };

    useEffect(() => {
        console.log(isStaff)
    }, []);
    

    return (
        <Navbar expand="lg" className="text-white">
            
                { isAuth?
                <>
                <Container className='navbar-container'>
                    <Navbar.Brand><Link to='/' className='link'> HC <img src="https://i.imgur.com/C2bwsVM.png" alt="" className='navbar-logo'/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <NavDropdown title="Kids">
                                    <NavDropdown.Item className='drop-item'><Link to="/kids"className='link'>My Kids</Link></NavDropdown.Item>
                                    <NavDropdown.Item className='drop-item'><Link to="/kids/add"className='link'>Add Kid</Link></NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link><Link to="/camps" className='link'>Camps</Link></Nav.Link>
                                { isStaff ? 
                                <Nav.Link><Link to="/camps/add" className='link'>Add Camp</Link></Nav.Link>
                                :
                                null
                                }
                                <Nav.Link><Link to="/logout" className='link'>Log Out</Link></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
                </>
                : 
                <Container className='d-flex justify-content-center'>
                    <Navbar.Brand ><Link to='/' className='link'> Happy Campers <img src="https://i.imgur.com/C2bwsVM.png" alt="" className='navbar-logo'/></Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                </Container>
                }

        </Navbar>
            
    )
}
