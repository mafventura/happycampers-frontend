import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../context/UserContext";


import Login from "./Auth/Login";
import UpcomingCamps from "./Camps/UpcomingCamps"
import Kids from "./Kids/Kids"

export default function Home() {
    const [isAuth] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false);
    const { setUserId } = useUser();
    const [username, setUsername] = useState('')
    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            fetchUserData();
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUserData = () => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                const token = localStorage.getItem("access_token");
                const decoded = jwtDecode(token);
                const user = response.data.find((user) => user.id === decoded.user_id);
                setUserId(decoded.user_id);
                setUsername(user.username);
                setIsStaff(user.is_staff);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    return (
        <div className="form-signin mt-5 text-center">
            {isAuth ?
                <>
                    <Container>
                        <h1>Welcome, {username}</h1>
                    </Container>
                    { isStaff ?
                        <Container>
                            <UpcomingCamps />
                        </Container>
                        :
                        <Container className='mt-5'>
                            <Kids />
                            <UpcomingCamps />
                        </Container>
                    }
                </>
                :
                <Login />
            }
        </div>
    )
}
