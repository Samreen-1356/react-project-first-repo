import { Link } from "react-router-dom";

function Home() {
    return (
        <div
            style={{
                textAlign: "center",
                padding: "50px",
            }}
        >
            <h1>Welcome to User Management System</h1>

            <p>
                Manage Users, Posts, Charts and Settings
            </p>

            {/* Dashboard Cards */}

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "20px",
                    marginTop: "40px",
                    flexWrap: "wrap",
                }}
            >
                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        width: "200px",
                        borderRadius: "10px",
                    }}
                >
                    <h2>👥 Users</h2>
                    <p>Manage all users</p>
                </div>

                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        width: "200px",
                        borderRadius: "10px",
                    }}
                >
                    <h2>📝 Posts</h2>
                    <p>View all posts</p>
                </div>

                <div
                    style={{
                        border: "1px solid #ccc",
                        padding: "20px",
                        width: "200px",
                        borderRadius: "10px",
                    }}
                >
                    <h2>📊 Charts</h2>
                    <p>Analytics Dashboard</p>
                </div>
            </div>

            {/* Navigation Buttons */}

            <div style={{ marginTop: "40px" }}>
                <Link to="/users">
                    <button>Users</button>
                </Link>

                <Link to="/adduser">
                    <button>Add User</button>
                </Link>

                <Link to="/posts">
                    <button>Posts</button>
                </Link>


            </div>
        </div>
    );
}

export default Home;