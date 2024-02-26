import { useEffect } from "react";
import { useCamps } from "../../context/CampContext";

export default function Kids() {
    const { camps, getCamps } = useCamps();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getCamps()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mt-5 text-center">
            <h1>Camps</h1>
            {camps && camps.map((camp) => (
                <div key={camp.id}>
                    <p>{camp.name}</p>
                    <p>{camp.start_date} - {camp.end_date}</p>
                </div>
            ))}
        </div>
    );
}
