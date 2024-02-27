import { useContext, createContext, useState } from "react";
import axios from 'axios'

const UserContext = createContext()

export function useUser() {
    return useContext(UserContext)
}

export const UserProvider = ({children}) => {

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)

    function getUsers() {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/users`)
        .then((response) => {
            setUser(response.data)
            console.log('User Response.Data: ', response.data)
        })
        .catch(error => console.error("Error fetching camps", error))
    }

    return (
        <UserContext.Provider value={{
            user,
            getUsers,
            userId,
            setUserId
        }}>
            {children}
        </UserContext.Provider>
    )
}