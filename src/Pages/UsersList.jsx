import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function UsersList() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        api.get("/users?limit=50").then((res) => {
            setUsers(res.data.users);
        });
    }, []);

    const [search, setSearch] = useState("");
    const [gender, setGender] = useState("all");
    const [sortAge, setSortAge] = useState("");


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
                        <th>Delete</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>
                                {user.firstName} {user.lastName}
                            </td>

                            <td>{user.email}</td>

                            <td>{user.age}</td>

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
                                    onClick={() => {
                                        alert(
                                            `Delete functionality for user ${user.firstName}`
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersList;




// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import api from "../services/api";
// import ReactPaginate from "react-paginate";

// function UsersList() {
//     const [users, setUsers] = useState([]);
//     const [search, setSearch] = useState("");
//     const [gender, setGender] = useState("all");
//     const [sortAge, setSortAge] = useState("");
//     const [currentPage, setCurrentPage] = useState(0);

//     const usersPerPage = 10;

//     useEffect(() => {
//         api.get("/users?limit=50").then((res) => {
//             setUsers(res.data.users);
//         });
//     }, []);

//     let filteredUsers = users.filter((user) => {
//         const fullName =
//             `${user.firstName} ${user.lastName}`.toLowerCase();

//         const searchMatch =
//             fullName.includes(search.toLowerCase()) ||
//             user.email.toLowerCase().includes(search.toLowerCase());

//         const genderMatch =
//             gender === "all" ||
//             user.gender === gender;

//         return searchMatch && genderMatch;
//     });

//     if (sortAge === "asc") {
//         filteredUsers.sort((a, b) => a.age - b.age);
//     }

//     if (sortAge === "desc") {
//         filteredUsers.sort((a, b) => b.age - a.age);
//     }


//     const offset = currentPage * usersPerPage;

//     const currentUsers =
//         filteredUsers.slice(
//             offset,
//             offset + usersPerPage
//         );

//     const pageCount =
//         Math.ceil(
//             filteredUsers.length /
//             usersPerPage
//         );

//     const handlePageClick = ({
//         selected,
//     }) => {
//         setCurrentPage(selected);
//     };


//     return (
//         <div style={{ padding: "20px" }}>
//             <h1>Users List</h1>

//             <input
//                 type="text"
//                 placeholder="Search Name or Email"
//                 value={search}
//                 onChange={(e) =>
//                     setSearch(e.target.value)
//                 }
//             />

//             <br />
//             <br />

//             <select
//                 value={gender}
//                 onChange={(e) =>
//                     setGender(e.target.value)
//                 }
//             >
//                 <option value="all">
//                     All Genders
//                 </option>

//                 <option value="male">
//                     Male
//                 </option>

//                 <option value="female">
//                     Female
//                 </option>
//             </select>

//             <br />
//             <br />

//             <select
//                 value={sortAge}
//                 onChange={(e) =>
//                     setSortAge(e.target.value)
//                 }
//             >
//                 <option value="">
//                     Sort Age
//                 </option>

//                 <option value="asc">
//                     Age Low to High
//                 </option>

//                 <option value="desc">
//                     Age High to Low
//                 </option>
//             </select>

//             <br />
//             <br />

//             <table border="1" cellPadding="10">
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Age</th>
//                         <th>Gender</th>
//                         <th>Details</th>
//                         <th>Posts</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {currentUsers.map((user) => (
//                         <tr key={user.id}>
//                             <td>
//                                 {user.firstName}
//                                 {" "}
//                                 {user.lastName}
//                             </td>

//                             <td>{user.email}</td>

//                             <td>{user.age}</td>

//                             <td>{user.gender}</td>

//                             <td>
//                                 <Link
//                                     to={`/user/${user.id}`}
//                                 >
//                                     View
//                                 </Link>
//                             </td>

//                             <td>
//                                 <Link
//                                     to={`/posts-user/${user.id}`}
//                                 >
//                                     Posts
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default UsersList;