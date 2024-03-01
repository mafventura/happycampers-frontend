import { useEffect, useState } from "react";
import { useCamps } from "../../context/CampContext";
import { useNavigate, Link } from "react-router-dom";
import { Button, Container, Card } from "react-bootstrap";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useUser } from "../../context/UserContext";
import { CgDetailsMore } from "react-icons/cg";
import { MdDelete, MdModeEdit } from "react-icons/md";


export default function Kids() {
    const { camps, getUpcomingCamps, setSelectedCamp, deleteCamp } = useCamps();
    const navigate = useNavigate();
    const { setUserId } = useUser();
    const [isStaff, setIsStaff] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            fetchUserData();
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getUpcomingCamps();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Container className="mt-5 text-center">
                <h1>Upcoming Camps</h1>
                <Container className="d-flex flex-wrap justify-content-center">
                    {camps &&
                        camps.map((camp) => (
                            <Card
                                key={camp.id}
                                className="m-2 border-primary shadow-sm"
                                style={{ width: "22rem" }}
                            >
                                <Card.Body>
                                    <h2>{camp.name}</h2>
                                    <Card.Text>
                                        {camp.start_date} - {camp.end_date}
                                    </Card.Text>
                                </Card.Body>
                                {isStaff ? (
                                    <Container className="p-2 d-flex justify-content-center">
                                        <Button
                                            className="me-2"
                                            onClick={() => {
                                                setSelectedCamp(camp.id);
                                            }}
                                        >
                                            <Link to={`/camps/${camp.id}`}>
                                                <CgDetailsMore style={{ color: "white" }} />
                                            </Link>
                                        </Button>
                                        <Button
                                            className="me-2"
                                            onClick={() => {
                                                setSelectedCamp(camp.id);
                                            }}
                                        >
                                            <Link to={`/camps/${camp.id}/edit`}>
                                                <MdModeEdit style={{ color: "white" }} />
                                            </Link>
                                        </Button>
                                        <Button className="me-2 btn-warning" onClick={() => deleteCamp(camp.id)}>
                                            <MdDelete style={{ color: "white" }} />
                                        </Button>
                                    </Container>
                                ) : (
                                    <Button
                                        onClick={() => {
                                            setSelectedCamp(camp.id);
                                        }}
                                    >
                                        <Link to="/register_to_camp" className="link">
                                            Register
                                        </Link>
                                    </Button>
                                )}
                            </Card>
                        ))}
                </Container>
            </Container>
        </>
    );
}
