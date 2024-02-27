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
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/kids`)
        .then((response) => {
            setKids(response.data)
            console.log('Response.Data: ', response.data)
        })
        .catch(error => console.error("Error fetching kids", error))
    }

    async function addKid(addKid) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/kids/add`, addKid)
            setKids([...kids, response.data])
        } catch (error) {
            console.error("Error adding kid", error)
        }

    }

    async function deleteKid(kid_id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/kids/${kid_id}`)
            getKids()
        } catch (error) {
            console.log("Error deleting kid", error);
        }
    }

    async function editKid(kid_id, updatedKid) {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/kids/${kid_id}/`, 
            updatedKid)
        } catch (error) {
            console.log("Error editing kid", error);
        }
    }

    return (
        <KidContext.Provider value={{
            kids,
            getKids,
            addKid,
            deleteKid,
            editKid,
            selectedKid,
            setSelectedKid
        }}>
            {children}
        </KidContext.Provider>
    )
}