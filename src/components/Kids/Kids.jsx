import { useEffect } from "react";
import { useKids } from "../../context/KidContext";
import { Container, Card, Button } from "react-bootstrap"
import { Link } from 'react-router-dom';

export default function Kids() {
    const { kids, getKids, deleteKid, setSelectedKid } = useKids();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getKids()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    

    return (
        <div className="mt-5 text-center">
            <h1>My Kids</h1>
            <Container className="d-flex flex-wrap justify-content-center">
            {kids && kids.map((kid) => (
                    <Card key={kid.id} className="m-2" style={{ width: '22rem' }}>
                        <Container>
                            <Button onClick={() => {
                                setSelectedKid(kid.id)
                            }}><Link to={`/kids/${kid.id}/edit`}>Edit</Link></Button>
                            <Button onClick={() => deleteKid(kid.id)}>Delete</Button>
                        </Container>
                        <Card.Body>
                            <Card.Title className="mb-4 mt-2">{kid.name}</Card.Title>
                            <Card.Text><strong>DOB:</strong> {kid.dob}</Card.Text>
                            <Card.Text><strong>School:</strong> {kid.school}</Card.Text>
                            <Card.Text><strong>Allergies:</strong> {kid.allergies}</Card.Text>
                            <Card.Text><strong>Emergency Contacts:</strong> {kid.emergency_contact}</Card.Text>
                            <Card.Text><strong>Leaving Authorizations:</strong> {kid.leaving_permissions}</Card.Text>
                        </Card.Body>
                    </Card>
            ))}
            </Container>
        </div>
    );
}
