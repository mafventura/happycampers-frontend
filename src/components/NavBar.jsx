import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NavBar.css";
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext";

export default function NavBar() {
    const { setUserId } = useUser();

    const [isAuth, setIsAuth] = useState(false);
    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            setIsAuth(true);
            fetchUserData();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);

    const fetchUserData = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            })
            .then((response) => {
                const token = localStorage.getItem("access_token");
                const decoded = jwtDecode(token);
                const user = response.data.find((user) => user.id === decoded.user_id);
                setUserId(decoded.user_id);
                setIsStaff(user.is_staff);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    return (
        <>
            {isAuth ? (
                <>
                    {isStaff ? (
                        <>
                            <Navbar expand="lg" className="text-white shadow-sm staff">
                                <Container className="navbar-container">
                                    <Navbar.Brand className="ms-4">
                                        <Link to="/" className="link">
                                            <img src="https://i.imgur.com/C2bwsVM.png" alt="" className="navbar-logo" />
                                        </Link>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <NavDropdown title="Kids" >
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/kids/list_all" className="link">
                                                        All Kids
                                                    </Link>
                                                </NavDropdown.Item>
                                                {/* <NavDropdown.Item className='drop-item'><Link to="/kids/add"className='link'>Add Kid</Link></NavDropdown.Item> */}
                                            </NavDropdown>
                                            <NavDropdown title="Camps">
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/camps" className="link">
                                                        All Camps
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/camps/add" className="link">
                                                        Add Camp
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="Staff">
                                                {/* <NavDropdown.Item className="drop-item">
                                                    <Link to="/staff" className="link">
                                                        Staff
                                                    </Link>
                                                </NavDropdown.Item> */}
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/staff/add" className="link">
                                                        Add Staff
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                                <Nav.Link className="me-5">
                                    <Link to="/logout" className="link">
                                        Log Out
                                    </Link>
                                </Nav.Link>
                            </Navbar>
                        </>
                    ) : (
                        <>
                            <Navbar expand="lg" className="text-white shadow-sm user">
                                <Container className="navbar-container">
                                    <Navbar.Brand className="ms-4">
                                        <Link to="/" className="link">
                                            <img src="https://i.imgur.com/C2bwsVM.png" alt="" className="navbar-logo" />
                                        </Link>
                                    </Navbar.Brand>
                                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-auto">
                                            <NavDropdown title="Kids">
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/kids" className="link">
                                                        My Kids
                                                    </Link>
                                                </NavDropdown.Item>
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/kids/add" className="link">
                                                        Add Kid
                                                    </Link>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                            <NavDropdown title="Camps">
                                                <NavDropdown.Item className="drop-item">
                                                    <Link to="/camps/upcoming_camps" className="link">
                                                        Upcoming Camps
                                                    </Link>
                                                </NavDropdown.Item>
                                                {/* <NavDropdown.Item className='drop-item'><Link to="/camps/registered_camps" className='link'>My Camps</Link></NavDropdown.Item> */}
                                            </NavDropdown>

                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                                <Nav.Link className="me-5">
                                    <Link to="/logout" className="link">
                                        Log Out
                                    </Link>
                                </Nav.Link>
                            </Navbar>
                        </>
                    )}
                </>
            ) : (
                <Navbar expand="lg" className="text-white shadow-sm user">
                    <Container className="d-flex justify-content-center">
                        <Navbar.Brand>
                            <Link to="/" className="link">
                                {" "}
                                Happy Campers{" "}
                                <img src="https://i.imgur.com/C2bwsVM.png" alt="" className="navbar-logo" />
                            </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Container>
                </Navbar>
            )}
        </>
    );
}
