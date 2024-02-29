import { useEffect } from "react";
import { useCamps } from "../../context/CampContext";
import { useNavigate, Link } from 'react-router-dom'
import { Button, Breadcrumb, Card, Container } from "react-bootstrap";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { IoMdAdd } from "react-icons/io";


export default function Kids() {
    const { camps, getCamps, setSelectedCamp, deleteCamp } = useCamps();

    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCamps()
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
        <Container className="mt-5 text-center shadow-sm p-3">
            <Container className="d-flex justify-content-between">
                <Button className="hide_button"></Button>
                <h1>Camps</h1>
                <Button className="btn-secondary text-white" style={{ height: '40px'}}><Link to='/camps/add' className="link"><IoMdAdd /></Link></Button>
            </Container>
            <Container className="d-flex flex-wrap justify-content-center">
            {camps && camps.map((camp) => (
                <Card key={camp.id} className="m-2 border-primary shadow-sm" style={{ width: '22rem' }}>
                    <Card.Body>
                        <h2 className="mb-3 mt-2">{camp.name}</h2>
                        <Card.Text>{camp.start_date} - {camp.end_date}</Card.Text>
                    </Card.Body>
                    <Container className="p-2 d-flex justify-content-center">
                        <Button className="me-2" onClick={() => {
                                setSelectedCamp(camp.id)
                                }}>
                            <Link to={`/camps/${camp.id}`}><CgDetailsMore style={{ color: 'white' }}/></Link>
                        </Button>
                        <Button className="me-2" onClick={() => {
                                setSelectedCamp(camp.id)
                                }}>
                            <Link to={`/camps/${camp.id}/edit`}><MdModeEdit style={{ color: 'white' }}/></Link>
                        </Button>
                        <Button className="me-2 btn-warning" onClick={() => deleteCamp(camp.id)}><MdDelete style={{ color: 'white' }}/></Button>
                    </Container>
                </Card>
            ))}
            </Container>
        </Container>
        </>
    );
}
