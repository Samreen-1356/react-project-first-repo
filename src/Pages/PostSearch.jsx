import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function PostSearch() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/users?limit=50").then((res) => {
            setUsers(res.data.users);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedUser) {
            alert("Please select a user");
            return;
        }

        navigate(`/posts-user/${selectedUser}`);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Select User</h1>

            <form onSubmit={handleSubmit}>
                <select
                    value={selectedUser}
                    onChange={(e) =>
                        setSelectedUser(e.target.value)
                    }
                >
                    <option value="">
                        Select User
                    </option>

                    {users.map((user) => (
                        <option
                            key={user.id}
                            value={user.id}
                        >
                            {user.firstName} {user.lastName}
                        </option>
                    ))}
                </select>

                <br />
                <br />

                <button type="submit">
                    View Posts
                </button>
            </form>
        </div>
    );
}

export default PostSearch;