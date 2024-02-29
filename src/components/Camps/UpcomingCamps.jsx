import { useEffect } from "react";
import { useCamps } from "../../context/CampContext";
import { useNavigate, Link } from 'react-router-dom'
import { Button, Breadcrumb, Container, Card } from "react-bootstrap";

export default function Kids() {
    const { camps, getUpcomingCamps, setSelectedCamp } = useCamps();

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getUpcomingCamps()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Breadcrumb className="mt-2 ms-3">
                <Breadcrumb.Item>
                    <Link to='/'>
                        Home
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Container className="mt-5 text-center">
                <h1>Upcoming Camps</h1>
                <Container className="d-flex flex-wrap justify-content-center">
                {camps && camps.map((camp) => (
                    <Card key={camp.id} className="m-2 border-primary shadow-sm" style={{ width: '22rem' }}>
                        <Card.Body>
                        <h2>{camp.name}</h2>
                        <Card.Text>{camp.start_date} - {camp.end_date}</Card.Text>
                        </Card.Body>
                        <Button onClick={() => {
                                setSelectedCamp(camp.id)
                                }}>
                            <Link to='/register_to_camp' className='link'>Register</Link>
                        </Button>
                    </Card>
                ))}
                </Container>
            </Container>
        </>
    );
}
