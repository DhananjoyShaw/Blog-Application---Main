import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { URL } from "../url";
import PostDetails from "../pages/PostDetails";

const SearchResults = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const query = new URLSearchParams(useLocation().search).get("query");

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                console.log(`Fetching posts with query: ${query}`);
                const res = await axios.get(`${URL}/api/posts?search=${encodeURIComponent(query)}`);
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching posts:", err);
                setLoading(false);
            }
        };
        fetchPosts();
    }, [query]);

    return (
        <div>
            {loading ? (
                <div className="h-[80vh] flex justify-center items-center w-full">
                    <p>Loading...</p>
                </div>
            ) : (
                <div>
                    {posts.length > 0 ? (
                        <div>
                            {posts.map((post) => (
                                <PostDetails key={post._id} postId={post._id} />
                            ))}
                        </div>
                    ) : (
                        <p>No posts found for "{query}"</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default SearchResults;
