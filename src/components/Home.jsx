import React, { useState} from 'react';

import Login from "./Auth/Login";

export default function Home() {
    const [isAuth] = useState(localStorage.getItem('access_token')? localStorage.getItem('access_token') : false);

    return (
        <div className="form-signin mt-5 text-center">
            {isAuth ?
            <h3>Welcome</h3>
            :
            <Login />
            }
        </div>
    )
}
