import { useEffect, useState } from "react";
import api from "../services/api";
import Loader from "../components/Loader";

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState("");


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);

                const res = await api.get("/posts");

                setPosts(res.data.posts);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Failed to fetch posts");
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const filteredPosts = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) return <Loader />
    if (error) return <h2>{error}</h2>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>Posts</h1>

            <input
                type="text"
                placeholder="Search posts..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {filteredPosts.map((post) => (
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