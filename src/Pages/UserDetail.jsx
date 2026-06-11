import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function UserDetail() {
    const { id } = useParams();

    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get(`/users/${id}`).then((res) => {
            setUser(res.data);
        });
    }, [id]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Details</h1>

            <p>Name: {user.firstName}</p>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Blood Group: {user.bloodGroup}</p>
            <p>Phone: {user.phone}</p>
        </div>
    );
}

export default UserDetail;