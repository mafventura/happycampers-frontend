import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useCamps } from "../context/CampContext";
import { useWeeks } from "../context/WeekContext";
import { useKids } from "../context/KidContext";

import Login from "./Auth/Login";

export default function Home() {
    const [isAuth] = useState(localStorage.getItem('access_token') ? localStorage.getItem('access_token') : false);
    const { getCamps, filterCamp } = useCamps();
    const { getWeeks, weeks } = useWeeks();
    const { getKids, kids } = useKids();
    const [infoPerKid, setInfoPerKid] = useState([])

    useEffect(() => {
        getCamps();
        getWeeks();
        getKids();
        kids?.forEach(kid => {
            getRegisteredInfo(kid.id);
        });
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getRegisteredInfo(kid_id) {
        const info = []
        const weeksWithKid = weeks?.filter((week) => week.kids.includes(kid_id))
        weeksWithKid?.forEach((el) => {
            const camp = filterCamp(el.camp)
            const campName = camp[0].name
            const week = el.week_number
            info.push({ week, campName })
        })
        setInfoPerKid(prevState => [...prevState, { kid_id, info }]);
    }

    return (
        <div className="form-signin mt-5 text-center">
            {isAuth ?
                <Container>
                    <h1>Welcome to Happy Campers!</h1>
                    {/* <h3>Upcoming Camps:</h3>
                    <Container className='d-flex'>
                    {kids?.map((kid) => (
                            <Container key={kid.id}>
                                <p>{kid.name}</p>
                                {infoPerKid
                                    .filter(info => info.kid_id === kid.id)
                                    .map((info, index) => (
                                        <React.Fragment key={index}>
                                            {info.info.map((weekInfo, idx) => (
                                                <p key={idx}>Week {weekInfo.week} of {weekInfo.campName}</p>
                                            ))}
                                        </React.Fragment>
                                    ))}
                            </Container>
                        ))}
                    </Container> */}
                </Container>
                :
                <Login />
            }
        </div>
    )
}
