import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav
            style={{
                display: "flex",
                gap: "20px",
                padding: "20px",
                background: "#222",
            }}
        >
            <Link to="/" style={{ color: "white" }}>
                Users
            </Link>

            <Link to="/adduser" style={{ color: "white" }}>
                Add User
            </Link>

            <Link to="/posts" style={{ color: "white" }}>
                Posts
            </Link>

            <Link to="/posts-user/1" style={{ color: "white" }}>Post Per Per User</Link>

            <Link to="/chart" style={{ color: "white" }}>
                Charts
            </Link>

            <Link to="/settings" style={{ color: "white" }}>
                Settings
            </Link>
        </nav>
    );
}

export default Navbar;