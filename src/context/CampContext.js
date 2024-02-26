import { useContext, createContext, useState } from "react";
import axios from 'axios'

const CampContext = createContext()

export function useCamps() {
    return useContext(CampContext)
}

export const CampsProvider = ({children}) => {

    const [camps, setCamps] = useState()
    const [weeks, setWeeks] = useState()

    function getCamps() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/camps`)
        .then((response) => {
            setCamps(response.data)
            console.log('Response.Data: ', response.data)
            console.log('Camps: ', camps)
        })
        .catch(error => console.error("Error fetching camps", error))
    }

    return (
        <CampContext.Provider value={{
            camps,
            weeks,
            getCamps
        }}>
            {children}
        </CampContext.Provider>
    )
}