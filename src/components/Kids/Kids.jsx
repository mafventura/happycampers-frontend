import { useEffect } from "react";
import { useKids } from "../../context/KidContext";

export default function Kids() {
    const { kids, getKids } = useKids();

    useEffect(() => {
        if (!localStorage.getItem('access_token')) {
            window.location.href = '/login';
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        getKids()
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="mt-5 text-center">
            <h1>My Kids</h1>
            {kids && kids.map((kid) => (
                <div key={kid.id}>
                    <p>{kid.name}</p>
                    <p>{kid.dob}</p>
                </div>
            ))}
        </div>
    );
}
