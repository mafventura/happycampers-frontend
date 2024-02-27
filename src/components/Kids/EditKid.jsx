import { Button, Form, InputGroup, Container } from 'react-bootstrap'
import { useRef, useEffect } from 'react'
import { redirect } from 'react-router-dom';
import { useKids } from '../../context/KidContext'
import { useUser } from '../../context/UserContext'

export default function EditKid() {
    const { kids, selectedKid, editKid } = useKids();
    const { userId } = useUser();

    console.log(userId)

    const nameRef = useRef()
    const dobRef = useRef()
    const schoolRef = useRef()
    const allergiesRef = useRef()
    const leavingRef = useRef()
    const contactRef = useRef()

    console.log(selectedKid);

    async function populateFormFields() {
        try {
            const kidToEdit = kids.find((element) => element.id === selectedKid);

            if (kidToEdit) {
                nameRef.current.value = kidToEdit.name;
                dobRef.current.value = kidToEdit.dob;
                schoolRef.current.value = kidToEdit.school;
                allergiesRef.current.value = kidToEdit.allergies;
                leavingRef.current.value = kidToEdit.leaving_permissions;
                contactRef.current.value = kidToEdit.emergency_contact;
                
            }
        } catch (error) {
            console.error(error);
        }
    }


    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await editKid( selectedKid, {
                name: nameRef.current.value,
                dob: dobRef.current.value,
                school: schoolRef.current.value,
                allergies: allergiesRef.current.value,
                leaving_permissions: leavingRef.current.value,
                emergency_contact: contactRef.current.value,
                user: userId
            });

            return redirect('/kids')

        } catch (error) {
            console.error('Error editing kid:', error);
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
                                Save Edit
                            </Button>
                        </div>
                    </div>
                </Form>
        </Container>
    )
}
