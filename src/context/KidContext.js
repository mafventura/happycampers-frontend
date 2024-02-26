import { useContext, createContext, useState } from "react";
import axios from 'axios'

const KidContext = createContext()

export function useKids() {
    return useContext(KidContext)
}

export const KidsProvider = ({children}) => {

    const [kids, setKids] = useState()

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

    return (
        <KidContext.Provider value={{
            kids,
            getKids,
            addKid
        }}>
            {children}
        </KidContext.Provider>
    )
}