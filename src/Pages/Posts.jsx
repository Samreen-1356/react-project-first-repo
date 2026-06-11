import { useEffect, useState } from "react";
import api from "../services/api";

function Posts() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/posts").then((res) => {
            setPosts(res.data.posts);
        });
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Posts</h1>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Posts;