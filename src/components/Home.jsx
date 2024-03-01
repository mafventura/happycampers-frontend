import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import { useCamps } from "../context/CampContext";
// import { useWeeks } from "../context/WeekContext";
// import { useKids } from "../context/KidContext";

import Login from "./Auth/Login";

export default function Home() {
    const [isAuth] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false);

    return (
        <div className="form-signin mt-5 text-center">
            {isAuth ?
                <>
                    <Container>
                        <h1>Welcome to</h1>
                        <img src="https://i.imgur.com/C2bwsVM.png" alt="" />
                        <h1>HAPPY CAMPERS</h1>
                    </Container>
                    <hr />
                    <Container>
                        
                    </Container>
                </>
                :
                <Login />
            }
        </div>
    )
}
