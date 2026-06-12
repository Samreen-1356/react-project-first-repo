import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

function UserDetail() {
    const { id } = useParams();

    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        const localUsers =
            JSON.parse(localStorage.getItem("users")) || [];

        const localUser = localUsers.find(
            (u) => String(u.id) === String(id)
        );

        if (localUser) {
            setUser(localUser);
            return;
        }

        api.get(`/users/${id}`)
            .then((res) => {
                setUser(res.data);
            })
            .catch(() => {
                setError(true);
            });
    }, [id]);

    if (error) {
        return <h2>User not found</h2>;
    }
    if (!user) return <Loader />;

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Details</h1>

            <table border="1" cellPadding="10">
                <tbody>
                    <tr>
                        <td>Name</td>
                        <td>{user.firstName} {user.lastName}</td>
                    </tr>

                    <tr>
                        <td>Email</td>
                        <td>{user.email}</td>
                    </tr>

                    <tr>
                        <td>Age</td>
                        <td>{user.age}</td>
                    </tr>

                    <tr>
                        <td>Gender</td>
                        <td>{user.gender}</td>
                    </tr>

                    <tr>
                        <td>Blood Group</td>
                        <td>{user.bloodGroup || "N/A"}</td>
                    </tr>

                    <tr>
                        <td>Phone</td>
                        <td>{user.phone || "N/A"}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default UserDetail;