import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Form, Container, InputGroup, Button } from "react-bootstrap";
import { useCamps } from "../../context/CampContext";
import { useWeeks } from "../../context/WeekContext";
import { useKids } from "../../context/KidContext";

export default function RegisterToACamp() {
    const navigate = useNavigate();
    const { getCamps, selectedCamp, filterCamp } = useCamps();
    const { getWeeks, filterWeeks } = useWeeks();
    const { kids, getKids } = useKids();
    const [kidToRegister, setKidToRegister] = useState();
    const [weeksToRegister, setWeeksToRegister] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            navigate("/login");
        }
        getCamps();
        getWeeks();
        getKids();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    let weeks = filterWeeks(selectedCamp);
    let thisCamp = filterCamp(selectedCamp);

    function handleKidChange(e) {
        setKidToRegister(e.target.value);
    }

    function handleCheckboxChange(weekId) {
        // Check if weekId is already in selectedWeeks
        const index = weeksToRegister.indexOf(weekId);

        if (index === -1) {
            // If not in selectedWeeks, add it
            setWeeksToRegister([...weeksToRegister, weekId]);
        } else {
            // If already in selectedWeeks, remove it
            const updatedWeeks = [...weeksToRegister];
            updatedWeeks.splice(index, 1);
            setWeeksToRegister(updatedWeeks);
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (!kidToRegister || weeksToRegister.length === 0) {
            return;
        }

        weeksToRegister.forEach((week) => {
            const data = {
                week_id: week,
                kid_id: parseInt(kidToRegister),
            };

            axios
                .put(`${process.env.REACT_APP_BACKEND_URL}/weeks/register_kid/`, data)
                .then((response) => {
                    console.log("Kid registered successfully:", response.data);
                })
                .then(navigate(`/kids`))
                .catch((error) => {
                    console.error("Error registering kid:", error);
                });
        });
    }

    return (
        <Container className=" d-flex justify-content-center m-5">
        <Container className="text-center d-flex flex-column align-items-center m-2">
            <h1>Register to {thisCamp[0].name}</h1>
            <Form onSubmit={handleSubmit} className="p-4" style={{ width: "500px" }}>
                <InputGroup>
                    <InputGroup.Text id="inputGroup-sizing-sm">Kid</InputGroup.Text>
                    <Form.Select onChange={handleKidChange}>
                        <option>Select kid...</option>
                        {kids?.map((kid) => (
                            <option key={kid.id} value={kid.id}>
                                {kid.name}
                            </option>
                        ))}
                    </Form.Select>
                </InputGroup>
                <Form.Label id="inputGroup-sizing-sm">Weeks:</Form.Label>
                <Container className="d-flex flex-column align-items-center">
                    {weeks?.map((week) => (
                        <Form.Check
                            key={week.id}
                            style={{ width: "200px" }}
                            type={"checkbox"}
                            id={week.id}
                            label={`${week.week_number} of ${thisCamp[0].name}`}
                            onChange={() => handleCheckboxChange(week.id)}
                            checked={weeksToRegister.includes(week.id)}
                        />
                    ))}
                </Container>
                <div className="d-grid gap-2 mt-3 d-flex justify-content-center">
                    <Button type="submit" className="btn btn-primary text-white">
                        Register
                    </Button>
                    <Button className="btn btn-warning text-white">
                        <Link className="link" to="/camps/upcoming_camps">
                            Cancel
                        </Link>
                    </Button>
                </div>
            </Form>
        </Container>
        </Container>
    );
}
