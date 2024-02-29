import { useEffect } from "react";
import { useKids } from "../../context/KidContext";
import { Container, Card, Button, Breadcrumb } from "react-bootstrap"
import { Link, useNavigate } from 'react-router-dom';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

export default function Kids() {
    const navigate = useNavigate();

    const { kids, getKids, deleteKid, setSelectedKid } = useKids();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getKids()
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
            <Container className="text-center">
                <h1 className="text-secondary">My Kids</h1>
                <Container className="d-flex flex-wrap justify-content-center">
                {kids && kids.map((kid) => (
                        <Card key={kid.id} className="m-2 border-primary shadow-sm" style={{ width: '22rem' }}>
                            <Card.Body>
                                <h2 className="mb-3 mt-2">{kid.name}</h2>
                                <Card.Text>{kid.dob}</Card.Text>
                            </Card.Body>
                            <Container className="p-2 d-flex justify-content-center ">
                                <Button onClick={() => {setSelectedKid(kid.id)}} className="me-2">
                                    <Link to={`/kids/${kid.id}/`}><CgDetailsMore style={{ color: 'white' }}/></Link>
                                </Button>
                                <Button onClick={() => {setSelectedKid(kid.id)}} className="me-2">
                                    <Link to={`/kids/${kid.id}/edit`}><MdModeEdit style={{ color: 'white' }}/></Link>
                                </Button>
                                <Button onClick={() => deleteKid(kid.id)} className="me-2 btn-warning"><MdDelete style={{ color: 'white' }}/></Button>
                            </Container>
                        </Card>
                ))}
                </Container>
            </Container>
        </>
    );
}
