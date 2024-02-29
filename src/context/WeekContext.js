import { useContext, createContext, useState } from "react";
import axios from 'axios'

const WeekContext = createContext()

export function useWeeks() {
    return useContext(WeekContext)
}

export const WeeksProvider = ({children}) => {
    const [weeks, setWeeks] = useState()

    function getWeeks() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/weeks`, 
        {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            setWeeks(response.data)
        })
        .catch(error => console.error("Error fetching weeks", error))
    }

    function filterWeeks(selectedCamp) {
        const campWeeks = weeks?.filter((week) => week.camp === selectedCamp);
        return campWeeks;
    }
    async function deleteWeek(week_id) {
        try {
            await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/weeks/${week_id}`, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
            getWeeks()
        } catch (error) {
            console.log("Error deleting week", error);
        }
    }

    async function editWeek(week_id, updatedWeek) {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/weeks/${week_id}/`, 
            updatedWeek, 
            {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                    'Content-Type': 'application/json'
                }
            })
        } catch (error) {
            console.log("Error editing week", error);
        }
    }

    return (
        <WeekContext.Provider value={{
            weeks,
            setWeeks,
            getWeeks,
            deleteWeek,
            editWeek,
            filterWeeks
        }}>
            {children}
        </WeekContext.Provider>
    )
}