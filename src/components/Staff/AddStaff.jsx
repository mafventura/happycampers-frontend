import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Card, Container, Form, InputGroup, Button } from "react-bootstrap";

export default function AddStaff() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    async function handleSubmit(e) {
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            email: email,
            staff: true
        }
        try {
            await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/staff/add`,
                user,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            )
            window.location.href = '/'
            // }
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Card className='mt-5 d-flex flex-column align-items-center bg-secondary' style={{ width: '25rem'}}>
                <Form onSubmit={handleSubmit} className="p-4">
                    <div>
                        <InputGroup size="sm" className="mb-3" style={{ width: '20rem' }}>
                            <InputGroup.Text id="inputGroup-sizing-sm">Username</InputGroup.Text>
                            <Form.Control
                                name='username'
                                type='text'
                                value={username}
                                required
                                aria-label="Small"
                                aria-describedby="inputGroup-sizing-sm"
                                onChange={e => setUsername(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3" style={{ width: '20rem' }}>
                            <InputGroup.Text id="inputGroup-sizing-sm">Email</InputGroup.Text>
                            <Form.Control
                                name='email'
                                type="text"
                                value={email}
                                required
                                onChange={e => setEmail(e.target.value)}
                            />
                        </InputGroup>
                        <InputGroup size="sm" className="mb-3" style={{ width: '20rem' }}>
                            <InputGroup.Text id="inputGroup-sizing-sm">Password</InputGroup.Text>
                            <Form.Control
                                name='password'
                                type="password"
                                value={password}
                                required
                                onChange={e => setPassword(e.target.value)}
                            />
                        </InputGroup>
                        <div className="d-grid gap-2 mt-3">
                            <button 
                                type="submit"
                                className="btn btn-primary text-white"
                                style={{ width: '20rem' }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}
