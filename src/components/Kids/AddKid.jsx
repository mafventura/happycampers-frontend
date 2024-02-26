import axios from 'axios';
import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { useRef } from 'react'
import { redirect } from 'react-router-dom';
// import { useKids } from '../context/KidContext'

export default function AddKid() {


    const nameRef = useRef()
    const dobRef = useRef()
    const schoolRef = useRef()
    const allergiesRef = useRef()
    const leavingRef = useRef()
    const contactRef = useRef()


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/kids/add/`, {
                name: nameRef.current.value,
                dob: dobRef.current.value,
                school: schoolRef.current.value,
                allergies: allergiesRef.current.value,
                leaving_permissions: leavingRef.current.value,
                emergency_contact: contactRef.current.value,
            });
            if (response.status === 201) {
                console.log('Kid added successfully');
                return redirect("/home")

            } else {
                console.error('Failed to add kid:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding kid:', error);
        }
    }

    

    return (
        <Container>
            <Form onSubmit={handleSubmit} className="p-4">
                    <div>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Name</InputGroup.Text>
                            <Form.Control
                                name='name'
                                type='text'
                                ref={nameRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Date of Birth</InputGroup.Text>
                            <Form.Control
                                name='dob'
                                type='date'
                                ref={dobRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">School</InputGroup.Text>
                            <Form.Control
                                name='school'
                                type='text'
                                ref={schoolRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Allergies/Restrictions</InputGroup.Text>
                            <Form.Control
                                name='allergies'
                                type='text'
                                ref={allergiesRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Leaving Authorizations</InputGroup.Text>
                            <Form.Control
                                name='leaving_permissions'
                                type='text'
                                ref={leavingRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">Emergency Contact</InputGroup.Text>
                            <Form.Control
                                name='emergency_contact'
                                type='text'
                                ref={contactRef}
                                required
                            />
                        </InputGroup>
                        <div className="d-grid gap-2 mt-3">
                            <Button 
                                type="submit"
                                className="btn btn-primary text-white">
                                Add
                            </Button>
                        </div>
                    </div>
                </Form>
        </Container>
    )
}
