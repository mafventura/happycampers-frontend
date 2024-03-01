import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import { Container, Card, Breadcrumb, Button } from "react-bootstrap";
import { useKids } from "../../context/KidContext";
import { useUser } from "../../context/UserContext";
import { useCamps } from "../../context/CampContext";
import { useWeeks } from "../../context/WeekContext";
import { MdDelete, MdModeEdit } from "react-icons/md";

export default function KidDetail() {
    const navigate = useNavigate();
    const { setUserId } = useUser();
    const [isStaff, setIsStaff] = useState(false);
    const { selectedKid, kids, getAllKids, deleteKid, setSelectedKid } = useKids();
    const { getCamps, filterCamp } = useCamps();
    const { getWeeks, weeks } = useWeeks();
    const [infoPerKid, setInfoPerKid] = useState([]);
    const [pastInfo, setPastInfo] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
        }

        if (localStorage.getItem("access_token") !== null) {
            fetchUserData();
        }

        getAllKids();
        getWeeks();
        getCamps();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (selectedKid) {
            getRegisteredInfo(selectedKid);
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedKid]);

    const fetchUserData = () => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
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
                setIsStaff(user.is_staff);
            })
            .catch((error) => {
                console.error("Error fetching user data:", error);
            });
    };

    function getSelectedKid(selectedKid) {
        const kid = kids?.find((k) => k.id === selectedKid);
        return kid;
    }

    const kid = getSelectedKid(selectedKid);

    function getRegisteredInfo(kid_id) {
        const info = [];
        const past = [];
        const today = new Date();
        const weeksWithKid = weeks?.filter((week) => week.kids.includes(kid_id));
        weeksWithKid?.forEach((el) => {
            const camp = filterCamp(el.camp);
            const endDate = new Date(camp[0].end_date);

            // Compare the end date of the camp to today's date
            if (endDate > today) {
                const campName = camp[0].name;
                const week = el.week_number;
                info.push({ week, campName });
            } else {
                const campName = camp[0].name;
                const week = el.week_number;
                past.push({ week, campName });
            }
        });
        info.sort((a, b) => a.campName.localeCompare(b.campName));
        past.sort((a, b) => a.campName.localeCompare(b.campName));

        setInfoPerKid(info);
        setPastInfo(past);
    }

    return (
        <>
            {isStaff ? (
                <>
                    <Breadcrumb className="mt-2 ms-3">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/kids/list_all">All Kids</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Container className="d-flex flex-column justify-content-center">
                        <Container className="m-3 d-flex justify-content-center">
                            <Card className="d-flex flex-row p-3 border-secondary" style={{ width: "500px" }}>
                                <Card.Body>
                                    <h1>{kid.name}</h1>
                                    <Card.Text>{kid.dob}</Card.Text>
                                </Card.Body>
                                <Card.Body className="ms-3">
                                    <Card.Text>
                                        <strong>Allergies:</strong> {kid.allergies}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Emergency Contacts:</strong> {kid.emergency_contact}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Leaving Authorizations:</strong> {kid.leaving_permissions}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                        <hr />
                        <Container>
                            <Container>
                                <h3>Current/Upcoming Camps:</h3>
                                {infoPerKid?.map((el) => (
                                    <>
                                        <p>
                                            Week {el.week} of {el.campName}
                                        </p>
                                    </>
                                ))}
                            </Container>
                            <hr />
                            <Container>
                                <h3>Past Camps:</h3>
                                {pastInfo?.map((el) => (
                                    <>
                                        <p>
                                            Week {el.week} of {el.campName}
                                        </p>
                                    </>
                                ))}
                            </Container>
                        </Container>
                    </Container>
                </>
            ) : (
                <>
                    <Breadcrumb className="mt-2 ms-3">
                        <Breadcrumb.Item>
                            <Link to="/">Home</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link to="/kids">My Kids</Link>
                        </Breadcrumb.Item>
                    </Breadcrumb>
                    <Container className="d-flex flex-column justify-content-center">
                        <Container className="m-3 d-flex justify-content-center">
                            <Card className="d-flex flex-row p-3 border-primary" style={{ width: "550px" }}>
                                <Card.Body>
                                    <h1>{kid?.name}</h1>
                                    <Card.Text>{kid?.dob}</Card.Text>
                                    <Button
                                        onClick={() => {
                                            setSelectedKid(kid?.id);
                                        }}
                                        className="me-2"
                                    >
                                        <Link to={`/kids/${kid?.id}/edit`}>
                                            <MdModeEdit style={{ color: "white" }} />
                                        </Link>
                                    </Button>
                                    <Button onClick={() => deleteKid(kid?.id)} className="me-2 btn-warning">
                                        <MdDelete style={{ color: "white" }} />
                                    </Button>
                                </Card.Body>
                                <Card.Body className="ms-3">
                                    <Card.Text>
                                        <strong>Allergies:</strong> {kid?.allergies}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Emergency Contacts:</strong> {kid?.emergency_contact}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Leaving Authorizations:</strong> {kid?.leaving_permissions}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Container>
                        <hr style={{ borderColor: "blue" }} />
                        <Container>
                            <Container>
                                <h3>Upcoming Registered Camps:</h3>
                                {infoPerKid?.map((el) => (
                                    <>
                                        <p>
                                            Week {el.week} of {el.campName}
                                        </p>
                                    </>
                                ))}
                            </Container>
                        </Container>
                    </Container>
                </>
            )}
        </>
    );
}
