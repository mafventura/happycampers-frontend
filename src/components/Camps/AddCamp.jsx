import axios from 'axios';
import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';

export default function AddCamp() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const nameRef = useRef()
    const startRef = useRef()
    const endRef = useRef()


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/camps/add/`, {
                name: nameRef.current.value,
                start_date: startRef.current.value,
                end_date: endRef.current.value,
            });
            if (response.status === 201) {
                console.log('Camp added successfully');
                navigate("/camps")

            } else {
                console.error('Failed to add camp:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding camp:', error);
        }
    }

    

    return (
        <Container className='text-center d-flex flex-column align-items-center m-2'>
            <h1>Add New Camp</h1>
            <Form onSubmit={handleSubmit} className="p-4" style={{width: '500px'}}>
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
                            <InputGroup.Text id="inputGroup-sizing-sm">Start Date:</InputGroup.Text>
                            <Form.Control
                                name='start_date'
                                type='date'
                                ref={startRef}
                                required
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">End Date:</InputGroup.Text>
                            <Form.Control
                                name='end_date'
                                type='date'
                                ref={endRef}
                                required
                            />
                        </InputGroup>
                        <div className="d-grid gap-2 mt-3 d-flex justify-content-center">
                            <Button 
                                type="submit"
                                className="btn btn-primary text-white">
                                Add
                            </Button>
                            <Button 
                                className="btn btn-warning text-white">
                                <Link className='link' to='/camps'>Cancel</Link>
                            </Button>
                        </div>
                    </div>
                </Form>
        </Container>
    )
}
