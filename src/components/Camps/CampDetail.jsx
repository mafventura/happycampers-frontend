import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCamps } from "../../context/CampContext";
import { useWeeks } from "../../context/WeekContext";
import { Container, Card, Breadcrumb, Button } from "react-bootstrap";
import { useKids } from "../../context/KidContext";

export default function CampDetail() {
    const navigate = useNavigate()
    const { selectedCamp, camps, getCamps } = useCamps();
    const { getWeeks, filterWeeks } = useWeeks();
    const { filterKidsById, getAllKids, kids, setSelectedKid } = useKids();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        getCamps()
        getWeeks()
        getAllKids()
        filterWeeks(selectedCamp)
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        console.log(kids);
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getSelectedCamp(selectedCamp) {
        const camp = camps?.find((c) => c.id === selectedCamp)
        return camp
    }

    const camp = getSelectedCamp(selectedCamp)
    const campWeeks = filterWeeks(selectedCamp)
    const kidsEnrolled = []

    campWeeks?.forEach((el) => {
        const ids = el.kids
        ids?.forEach((id) => {
            console.log(kids);
            const kid = filterKidsById(id)
            kidsEnrolled.push(kid)
            console.log(kidsEnrolled);
        })
    })


    return (
        <>
            <Breadcrumb className="mt-2 ms-3">
                <Breadcrumb.Item>
                    <Link to='/'>
                        Home
                    </Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to='/camps/'>
                        All Camps
                    </Link>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Container className="m-3 d-flex justify-content-center">
                <Card className="d-flex flex-row p-4" style={{ width: '570px' }}>
                    <Card.Body>
                        <h1>{camp.name}</h1>
                    </Card.Body>
                    <Card.Body className="ms-3">
                        <Card.Text><strong>Start Date:</strong> {camp.start_date}</Card.Text>
                        <Card.Text><strong>End Date:</strong> {camp.end_date}</Card.Text>
                    </Card.Body>
                </Card>
            </Container>
            <hr />
            <Container>
                <Container className="d-flex justify-content-between">
                    <h3>Current Weeks:</h3>
                    <Button><Link className='link' to='/weeks/add'>Add Week</Link></Button>
                </Container>
                <Container className="mt-3">
                    {campWeeks?.map((week) => (
                        <>
                        <p className="mt-4">Week {week.week_number} from {week.start_date} to {week.end_date}</p>         
                        </>
                    ))}
                </Container>
            </Container>
            <hr />
            <Container>
                <Container className="d-flex justify-content-between">
                    <h3>Registered Kids:</h3>
                </Container>
                <Container className="mt-3">
                    {kidsEnrolled?.map((kid) => (
                        kid.map((el) => (
                            <>
                            <Button
                                    className="hide_button"
                                    onClick={() => {
                                        setSelectedKid(el.id);
                                    }}
                                >
                                    <Link to={`/kids/${el.id}/`}>{el.name}</Link>
                                </Button>        
                            </>
                        ))
                    ))}
                </Container>
            </Container>
        </>
    )
}
