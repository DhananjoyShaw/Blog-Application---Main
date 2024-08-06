import { useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import axios from "axios";
import { URL, IF } from "../url";
import { useContext, useEffect, useState, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import Loader from "../components/Loader";
import PropTypes from 'prop-types';

const PostDetails = ({ postId: propPostId }) => {
  const { id } = useParams();
  const postId = propPostId || id;
  const [post, setPost] = useState({});
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const fetchPost = useCallback(async () => {
    try {
      const res = await axios.get(`${URL}/api/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [postId]);

  const handleDeletePost = async () => {
    try {
      const res = await axios.delete(`${URL}/api/posts/${postId}`, { withCredentials: true });
      console.log(res.data);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const fetchPostComments = useCallback(async () => {
    setLoader(true);
    try {
      const res = await axios.get(`${URL}/api/comments/post/${postId}`);
      setComments(res.data);
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  }, [postId]);

  useEffect(() => {
    fetchPostComments();
  }, [fetchPostComments]);

  const postComment = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${URL}/api/comments/create`,
        { comment: comment, author: user.username, postId: postId, userId: user._id },
        { withCredentials: true });
      setComments([...comments, res.data]);
      setComment("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar />
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[140px] mt-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">{post.title}</h1>
            {user?._id === post?.userId && (
              <div className="flex items-center justify-center space-x-2">
                <p className="cursor-pointer" onClick={() => navigate(`/edit/${postId}`)}>
                  <BiEdit />
                </p>
                <p className="cursor-pointer" onClick={handleDeletePost}>
                  <MdDelete />
                </p>
              </div>
            )}
          </div>
          <div className="flex items-center text-gray-900 font-semibold justify-between mt-2 md:mt-4">
            <p>@{post.username}</p>
            <div className="flex space-x-2">
              <p>{new Date(post.updatedAt).toString().slice(0, 15)}</p>
              <p>{new Date(post.updatedAt).toString().slice(16, 24)}</p>
            </div>
          </div>
          {post.photo && <img src={`${IF}${post.photo}`} className="w-[58%] mx-auto mt-8 object-scale-down rounded-md" alt="" />}
          <div
            className="text-lg mx-auto mt-8"
            dangerouslySetInnerHTML={{ __html: post.desc }}
          ></div>
          <div className="flex items-center mt-8 space-x-4 font-semibold">
            <p>Categories:</p>
            <div className="flex justify-center items-center space-x-2">
              {post.categories?.map((c, i) => (
                <div key={i} className="bg-[#95B1AE] rounded-lg px-3 py-1">{c}</div>
              ))}
            </div>
          </div>
          <div className="flex flex-col mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {comments?.map((c) => (<Comment key={c._id} c={c} post={post} />))}
          </div>

          {/* write a comment */}
          <div className="w-full flex flex-col mt-4 md:flex-row">
            <input
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              type="text" placeholder="Write a comment ..."
              className="bg-[#95B1AE] placeholder-black md:w-[80%] outline-none py-2 px-4 mt-4 md:mt-0"
            />
            <button
              onClick={postComment}
              className="bg-[#344C64] hover:bg-[#240750] text-sm text-white rounded-sm px-2 py-2 md:w-[20%] mt-4 md:mt-0"
            >Add Comment</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}

PostDetails.propTypes = {
  postId: PropTypes.string,
};

export default PostDetails;
