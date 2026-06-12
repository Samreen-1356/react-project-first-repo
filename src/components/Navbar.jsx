import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
    const [open, setOpen] =
        useState(false);

    return (
        <nav
            style={{
                background: "#222",
                padding: "15px",
            }}
        >
            <button
                onClick={() => setOpen(!open)}
                style={{
                    fontSize: "24px",
                    background: "none",
                    border: "none",
                    color: "white",
                    cursor: "pointer",
                }}
            >
                ☰
            </button>

            {open && (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        marginTop: "15px",
                    }}
                >
                    <Link
                        to="/"
                        style={{ color: "white" }}
                    >
                        Home
                    </Link>

                    <Link
                        to="/users"
                        style={{ color: "white" }}
                    >
                        Users
                    </Link>

                    <Link
                        to="/adduser"
                        style={{ color: "white" }}
                    >
                        Add User
                    </Link>

                    <Link
                        to="/posts"
                        style={{ color: "white" }}
                    >
                        Posts
                    </Link>

                    <Link
                        to="/post-search"
                        style={{ color: "white" }}
                    >
                        Post Per User
                    </Link>

                    <Link
                        to="/chart"
                        style={{ color: "white" }}
                    >
                        Charts
                    </Link>

                    <Link
                        to="/settings"
                        style={{ color: "white" }}
                    >
                        Settings
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;