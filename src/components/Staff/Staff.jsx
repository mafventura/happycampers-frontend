import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import { Container } from "react-bootstrap";

export default function Staff() {
    const navigate = useNavigate()
    const { getUsers, user } = useUser()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        getUsers()
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const staffUsers = user?.filter(user => user.is_staff);
    console.log(staffUsers);
    
    return (
        <Container>
            <h1>Staff</h1>
            {staffUsers?.map(user => (
                <>
                <p key={user.id}>{user.username}</p>
                <p>{user.email}</p>
                </>
            ))}
        </Container>
    )
}
