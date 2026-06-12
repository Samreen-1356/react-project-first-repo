import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";

function PostPerUser() {
    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUserPosts = async () => {
    //         try {
    //             setLoading(true);
    //             setError(null);

    //             const res = await api.get(`/posts/user/${id}`);

    //             setPosts(res.data.posts);

    //             setLoading(false);
    //         } catch (err) {
    //             console.log(err);
    //             setError("Failed to fetch user posts");
    //             setLoading(false);
    //         }
    //     };

    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                setLoading(true);
                setError(null);

                const postsRes = await api.get(
                    `/posts/user/${id}`
                );

                setPosts(postsRes.data.posts);

                const userRes = await api.get(
                    `/users/${id}`
                );

                setUser(userRes.data);

                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch user posts");
                setLoading(false);
            }
        };

        fetchUserPosts();
    }, [id]);


    if (loading) return <Loader />

    if (error) return <h2>{error}</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>
                Posts by{" "}
                {user
                    ? `${user.firstName} ${user.lastName}`
                    : "User"}
            </h1>

            <p>Total Posts: {posts.length}</p>
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