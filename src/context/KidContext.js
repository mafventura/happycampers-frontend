import { useContext, createContext, useState } from "react";
import axios from 'axios'

const KidContext = createContext()

export function useKids() {
    return useContext(KidContext)
}

export const KidsProvider = ({children}) => {

    const [kids, setKids] = useState()
    const [selectedKid, setSelectedKid] = useState()

    function getKids() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setKids(response.data)
            console.log("RESPONSE.DATA", response.data);
        })
        .catch(error => console.error("Error fetching kids", error))
    }
    
    function getAllKids() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids/list_all`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setKids(response.data)
        })
        .catch(error => console.error("Error fetching kids", error))
    }

    function getOneKid(kid_id) {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids/${kid_id}`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setKids(response.data)
        })
        .catch(error => console.error("Error fetching kids", error))
    }

    async function deleteKid(kid_id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/kids/${kid_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
            getKids()
        } catch (error) {
            console.log("Error deleting kid", error);
        }
    }

    async function editKid(kid_id, updatedKid) {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/kids/${kid_id}/`, 
            updatedKid, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log("Error editing kid", error);
        }
    }

    function filterKidsById(kid_id) {
        const kid = kids?.filter((kid) => kid.id === kid_id);
        return kid;
    }

    return (
        <KidContext.Provider value={{
            kids,
            getKids,
            deleteKid,
            editKid,
            selectedKid,
            setSelectedKid,
            getAllKids,
            getOneKid,
            filterKidsById
        }}>
            {children}
        </KidContext.Provider>
    )
}