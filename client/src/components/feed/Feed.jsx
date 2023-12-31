import { useContext, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { LinearProgress } from "@mui/material"; // Import LinearProgress

export default function Feed({ username }) {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get("http://localhost:8800/api/posts/profile/" + username)
          : await axios.get("http://localhost:8800/api/posts/timeline/" + user._id);

        setPosts(
          res.data.sort((p1, p2) => {
            return new Date(p2.createdAt) - new Date(p1.createdAt);
          })
        );
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        
        {(!username || username === user.username) && <Share />}
        {loading && <LinearProgress />} {/* Display LinearProgress while loading */}
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
