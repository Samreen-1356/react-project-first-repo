import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function PostPerUser() {
    const { id } = useParams();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api
            .get(`/posts/user/${id}`)
            .then((res) => {
                setPosts(res.data.posts);
            });
    }, [id]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>User Posts</h1>

            {posts.map((post) => (
                <div key={post.id}>
                    <h3>{post.title}</h3>

                    <p>{post.body}</p>

                    <p>
                        Views:
                        {" "}
                        {post.views}
                    </p>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default PostPerUser;