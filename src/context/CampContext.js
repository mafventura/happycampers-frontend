import { useContext, createContext, useState } from "react";
import axios from 'axios'

const CampContext = createContext()

export function useCamps() {
    return useContext(CampContext)
}

export const CampsProvider = ({children}) => {
    const [camps, setCamps] = useState()
    const [selectedCamp, setSelectedCamp] = useState()

    function getCamps() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/camps`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        }
        )
        .then((response) => {
            setCamps(response.data)
        })
        .catch(error => console.error("Error fetching camps", error))
    }

    function getUpcomingCamps() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/camps/upcoming_camps`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setCamps(response.data)
        })
        .catch(error => console.error("Error fetching camps", error))
    }

    function filterCamp(selectedCamp) {
        const camp = camps?.filter((camp) => camp.id === selectedCamp);
        return camp;
    }
    
    function filterCampByName(selectedCamp) {
        const filteredCamps = camps?.filter((camp) => camp.name.includes(selectedCamp));
        return filteredCamps;
    }

    async function deleteCamp(camp_id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/camps/${camp_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
            getCamps()
        } catch (error) {
            console.log("Error deleting camp", error);
        }
    }

    async function editCamp(camp_id, updatedCamp) {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/camps/${camp_id}/`, 
            updatedCamp, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log("Error editing camp", error);
        }
    }

    return (
        <CampContext.Provider value={{
            camps,
            getCamps,
            getUpcomingCamps,
            selectedCamp,
            setSelectedCamp,
            deleteCamp,
            editCamp,
            filterCamp,
            filterCampByName
        }}>
            {children}
        </CampContext.Provider>
    )
}