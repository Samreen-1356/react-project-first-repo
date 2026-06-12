import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader";


function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");
    const [sortAge, setSortAge] = useState("");


    // const [isEditOpen, setIsEditOpen] = useState(false);
    // const [editUser, setEditUser] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                const res = await axios.get(
                    "https://dummyjson.com/users?limit=15"
                );

                if (res && res.data && res.data.users) {
                    const localUsers =
                        JSON.parse(localStorage.getItem("users")) || [];

                    setUsers([
                        ...localUsers,
                        ...res.data.users,
                    ]);
                } else {
                    throw new Error("Invalid API response");
                }

                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch users");
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [search, gender, sortAge]);

    const handleUpdateUser = (e) => {
        e.preventDefault();

        const updatedList = users.map((u) =>
            u.id === editUser.id ? editUser : u
        );

        setUsers(updatedList);

        setIsEditOpen(false);
        setEditUser(null);
    };


    let filteredUsers = (users || []).filter((user) => {
        const fullName =
            `${user.firstName} ${user.lastName}`.toLowerCase();

        return (
            fullName.includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (gender !== "all") {
        filteredUsers = filteredUsers.filter(
            (user) => user.gender === gender
        );
    }

    if (sortAge === "asc") {
        filteredUsers.sort((a, b) => a.age - b.age);
    }

    if (sortAge === "desc") {
        filteredUsers.sort((a, b) => b.age - a.age);
    }
    const indexOfLastUser =
        currentPage * usersPerPage;

    const indexOfFirstUser =
        indexOfLastUser - usersPerPage;

    const currentUsers =
        filteredUsers.slice(
            indexOfFirstUser,
            indexOfLastUser
        );

    const totalPages = Math.ceil(
        filteredUsers.length / usersPerPage
    );

    if (loading) return <Loader />
    if (error) return <h2>{error}</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Users List</h1>

            <input
                type="text"
                placeholder="Search Name or Email"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <br />
            <br />

            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
            >
                <option value="all">All Genders</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <br />
            <br />

            <select
                value={sortAge}
                onChange={(e) => setSortAge(e.target.value)}
            >
                <option value="">Sort Age</option>
                <option value="asc">Age Low to High</option>
                <option value="desc">Age High to Low</option>
            </select>

            <br />
            <br />

            <table border="1" cellPadding="10">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th>User Details</th>
                        <th>User Posts</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {currentUsers.map((user) => (
                        <tr key={user.id || user.email}>
                            <td>
                                <Link to={`/user/${user.id}`}>
                                    {user.firstName} {user.lastName}
                                </Link>
                            </td>

                            <td>{user.email}</td>

                            <td style={{ color: user.age < 50 ? "red" : "green", fontWeight: "bold" }}>{user.age}</td>

                            <td>{user.gender}</td>

                            <td>
                                <Link to={`/user/${user.id}`}>
                                    View Details
                                </Link>
                            </td>

                            <td>
                                <Link to={`/posts-user/${user.id}`}>
                                    View Posts
                                </Link>
                            </td>

                            <td>
                                <button
                                    style={{
                                        backgroundColor: "#4CAF50",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 14px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        const newName = prompt("Enter first name", user.firstName);
                                        const newEmail = prompt("Enter email", user.email);
                                        const newAge = prompt("Enter age", user.age);

                                        if (newName && newEmail && newAge) {
                                            setUsers(
                                                users.map((u) =>
                                                    u.id === user.id
                                                        ? {
                                                            ...u,
                                                            firstName: newName,
                                                            email: newEmail,
                                                            age: Number(newAge),
                                                        }
                                                        : u
                                                )
                                            );
                                        }
                                    }}
                                >
                                    ✏️ Edit
                                </button>
                            </td>

                            <td>
                                <button
                                    style={{
                                        backgroundColor: "#f44336",
                                        color: "white",
                                        border: "none",
                                        padding: "8px 14px",
                                        borderRadius: "6px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => {
                                        if (window.confirm(`Delete ${user.firstName}?`)) {
                                            const updatedUsers = users.filter(
                                                (u) => u.id !== user.id
                                            );

                                            setUsers(updatedUsers);
                                        }
                                    }}
                                >
                                    🗑 Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table >
            <div style={{ marginTop: "20px" }}>
                <button
                    disabled={currentPage === 1}
                    onClick={() =>
                        setCurrentPage(currentPage - 1)
                    }
                >
                    Previous
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {currentPage} of {totalPages}
                </span>

                <button
                    disabled={
                        currentPage === totalPages
                    }
                    onClick={() =>
                        setCurrentPage(currentPage + 1)
                    }
                >
                    Next
                </button>
            </div>
        </div >
    );
}

export default UsersList;
