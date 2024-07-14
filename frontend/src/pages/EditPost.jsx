import { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ImCross } from 'react-icons/im';
import axios from 'axios';
import { URL } from '../url';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import ReactQuill from 'react-quill';

// Import Quill styles
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const postId = useParams().id;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState('');
  const [cats, setCats] = useState([]);

  // Define modules and formats for React Quill
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  const fetchPost = async () => {
    try {
      const res = await axios.get(URL + '/api/posts/' + postId);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setFile(res.data.photo);
      setCats(res.data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };

    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append('img', filename);
      data.append('file', file);
      post.photo = filename;

      try {
        await axios.post(URL + '/api/upload', data);
      } catch (err) {
        console.log(err);
      }
    }

    try {
      const res = await axios.put(URL + '/api/posts/' + postId, post, { withCredentials: true });
      navigate('/posts/post/' + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const deleteCategory = (i) => {
    let updatedCats = [...cats];
    updatedCats.splice(i, 1);
    setCats(updatedCats);
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCat('');
    setCats(updatedCats);
  };

  return (
    <div>
      <Navbar />
      <div className="px-6 bg-[#edece3] md:px-[140px] mt-8">
        <h1 className="text-xl font-semibold md:text-3xl">Update a post</h1>
        <form className="w-full flex flex-col space-y-4 md:space-y-8 mt-4">
          <input onChange={(e) => setTitle(e.target.value)} value={title} type="text" placeholder="Enter post title ..." className="px-4 py-2 rounded-md outline-none placeholder-black text-black bg-[#95B1AE]" />
          <input onChange={(e) => setFile(e.target.files[0])} type="file" className="px-4" />
          <div className="flex flex-col">
            <div className="flex items-center space-x-4 md:space-x-8">
              <input value={cat} onChange={(e) => setCat(e.target.value)} className="px-4 py-2 rounded-md outline-none placeholder-black text-black bg-[#95B1AE]" placeholder="Enter post category ..." type="text" />
              <div onClick={addCategory} className="bg-[#344C64] hover:bg-[#240750] rounded-md text-white px-4 py-2 font-semibold cursor-pointer">
                Add
              </div>
            </div>

            {/* categories */}
            <div className="flex px-4 mt-3">
              {cats?.map((c, i) => (
                <div key={i} className="flex justify-center items-center space-x-2 mr-4 bg-[#DEEFE8] px-2 py-1 ">
                  <p>{c}</p>
                  <p onClick={() => deleteCategory(i)} className="text-white bg-black rounded-full cursor-pointer p-1 text-sm">
                    <ImCross />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* React Quill editor */}
          <ReactQuill
            value={desc}
            onChange={setDesc}
            placeholder="Enter post description"
            modules={modules}
            formats={formats}
            className="quill-editor border-black border-2 bg-[#DEEFE8] "
          />

          <button onClick={handleUpdate} className="bg-[#344C64] hover:bg-[#240750] rounded-md w-full md:w-[20%] mx-auto text-white font-semibold px-4 py-2 md:text-xl text-lg">
            Update
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default EditPost;
