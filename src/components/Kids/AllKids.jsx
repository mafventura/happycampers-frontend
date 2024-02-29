import { useEffect, useState } from "react";
import { useKids } from "../../context/KidContext";
import { useUser } from "../../context/UserContext";
import { Table, Container, Button, Form } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

export default function AllKids() {
    const { kids, getAllKids, setSelectedKid } = useKids();
    const { getUsers, user } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getAllKids();
        getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [searchQuery, setSearchQuery] = useState("");

    function matchUserIdtoKidUser(kidUser) {
        const findUser = user?.find((u) => u.id === kidUser);
        return findUser?.username;
    }

    const filteredKids = kids?.filter((kid) =>
        kid.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <Container className="mt-5 text-center shadow-sm p-4">
            <h1 className="mb-5 text-secondary">All Kids</h1>
            <Form.Group className="mb-3 shadow-sm">
                <Form.Control
                    type="text"
                    placeholder="Search by name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Table striped className="shadow-sm">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>School</th>
                        <th>Allergies</th>
                        <th>Emergency Contacts</th>
                        <th>Authorizations</th>
                        <th>User</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredKids?.map((kid) => (
                        <tr key={kid.id}>
                            <td>
                                <Button
                                    className="hide_button"
                                    onClick={() => {
                                        setSelectedKid(kid.id);
                                    }}
                                >
                                    <Link to={`/kids/${kid.id}/`}>{kid.name}</Link>
                                </Button>
                            </td>
                            <td>{kid.dob}</td>
                            <td>{kid.school}</td>
                            <td>{kid.allergies}</td>
                            <td>{kid.emergency_contact}</td>
                            <td>{kid.leaving_permissions}</td>
                            <td>{matchUserIdtoKidUser(kid.user)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}
