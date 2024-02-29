import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useCamps } from '../../context/CampContext'

export default function EditKid() {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            navigate('/login');
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const { camps, selectedCamp, editCamp } = useCamps();

    const nameRef = useRef()
    const startRef = useRef()
    const endRef = useRef()


    async function populateFormFields() {
        try {
            const campToEdit = camps.find((element) => element.id === selectedCamp);

            if (campToEdit) {
                nameRef.current.value = campToEdit.name;
                startRef.current.value = campToEdit.start_date;
                endRef.current.value = campToEdit.end_date;
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await editCamp( selectedCamp, {
                name: nameRef.current.value,
                start_date: startRef.current.value,
                end_date: endRef.current.value,
            });

            navigate('/camps')

        } catch (error) {
            console.error('Error editing camp:', error);
        }
    }

    useEffect(() => {
        populateFormFields();
//eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                        <div className="d-grid gap-2 mt-3">
                            <Button 
                                type="submit"
                                className="btn btn-primary text-white">
                                Save Edit
                            </Button>
                        </div>
                    </div>
                </Form>
        </Container>
    )
}
