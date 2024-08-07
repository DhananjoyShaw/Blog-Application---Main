import { useContext, useEffect, useState, useCallback } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProfilePosts from "../components/ProfilePosts";
import axios from "axios";
import { URL } from "../url";
import { UserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [updated, setUpdated] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/users/${id}`);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  const fetchUserPosts = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/user/${user._id}`);
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [user._id]);

  useEffect(() => {
    if (id) {
      fetchProfile();
      fetchUserPosts();
    }
  }, [id, fetchProfile, fetchUserPosts]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      await axios.put(`${URL}/api/users/${user._id}`, { username, email, password }, { withCredentials: true });
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      await axios.delete(`${URL}/api/users/${user._id}`, { withCredentials: true });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bg-[#edece3] min-h-[80vh] px-8 md:px-[140px] mt-8 flex md:flex-row flex-col-reverse md:items-start items-start">
        <div className="flex flex-col md:w-[70%] w-full mt-8 md:mt-0">
          <h1 className="text-xl font-mono font-semibold md:text-3xl mb-4">Your Posts...</h1>
          {posts?.map((p) => (
            <ProfilePosts key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end ">
          <div className="flex flex-col space-y-4 items-start">
            <h1 className="text-xl font-semibold font-mono md:text-3xl mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              className="outline-none rounded-md px-4 py-2 bg-[#95B1AE] text-black"
              placeholder="Your username"
              type="text"
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="outline-none rounded-md px-4 py-2 bg-[#95B1AE] text-black"
              placeholder="Your email"
              type="email"
            />
            <div className="flex items-center space-x-4 mt-8">
              <button
                onClick={handleUserUpdate}
                className="text-white rounded-md font-semibold  px-4 py-2 bg-[#344C64] hover:bg-[#240750] "
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white rounded-md font-semibold bg-[#344C64] hover:bg-[#240750] px-4 py-2"
              >
                Delete
              </button>
            </div>
            {updated && (
              <h3 className="text-[#240750] text-lg text-center font-semibold mt-4">
                User updated successfully !!!
              </h3>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Profile;
