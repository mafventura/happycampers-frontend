import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, Container, Form, InputGroup, Button } from "react-bootstrap";

export default function Login() {
    const navigate = useNavigate()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        const user = {
            username: username,
            password: password,
        }

        try {
            const { data } = await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/token/`,
                user,
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
            )

            localStorage.clear()
            localStorage.setItem('access_token', data.access)
            localStorage.setItem('refresh_token', data.refresh)
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`
            axios.defaults.headers.common['Content-Type'] = 'application/json'
            window.location.href = '/'
        } catch (error) {
            console.error('Login failed:', error)
        }
    }

    return (
        <Container className="d-flex flex-column align-items-center mt-5">
            <Button className="btn btn-secondary text-white"><Link to='/signup' className='link'>Sign Up</Link></Button>
            <Card className='mt-5 bg-primary' style={{ width: '20rem' }}>
                <Form onSubmit={handleSubmit} className="p-4">
                    <div>
                        <InputGroup size="sm" className="mb-3">
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
                        <InputGroup size="sm" className="mb-3">
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
                            <Button 
                                type="submit"
                                className="btn btn-secondary text-white">
                                Log In
                            </Button>
                        </div>
                    </div>
                </Form>
            </Card>
        </Container>
    )
}
