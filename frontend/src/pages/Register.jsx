import { Link, useNavigate } from "react-router-dom"
import Footer from "../components/Footer"
import { useState } from "react"
import axios from 'axios'
import { URL } from '../url'

const Register = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const res = await axios.post(URL + "/api/auth/register", { username, email, password })
      setUsername(res.data.username)
      setEmail(res.data.email)
      setPassword(res.data.password)
      setError(false)
      navigate("/login")
    }
    catch (err) {
      setError(true)
      console.log(err)
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row bg-[#57A6A1] items-center justify-between px-6 md:px-[200px] py-4 space-y-4 md:space-y-0">
        <h1 className="text-2xl font-mono md:text-3xl font-extrabold"><Link to="/">BLOGIFY</Link></h1>
        <button className="px-4 py-2 bg-[#344C64] hover:bg-[#240750] text-white rounded-md">
          <Link to="/login">Login</Link>
        </button>
      </div>
      <div className="w-full bg-[#edece6] flex justify-center items-center h-[80vh] ">
        <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
          <h1 className="text-xl font-bold text-left">Create an account</h1>
          <input onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-2 rounded-md border-2 border-black outline-0" type="text" placeholder="Enter your username" />
          <input onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-md border-2 border-black outline-0" type="text" placeholder="Enter your email" />
          <input onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-2 rounded-md border-2 border-black outline-0" type="password" placeholder="Enter your password" />
          <div className="flex justify-center items-center space-x-3">
            <p>Already have an account?</p>
            <p className="text-gray-500 hover:text-black"><Link to="/login">Login</Link></p>
          </div>
          <button onClick={handleRegister} className="w-full px-3 py-3 text-lg font-bold rounded-lg text-white bg-[#344C64] hover:bg-[#240750] ">Register</button>
          {error && <h3 className="text-red-500 text-sm ">Something went wrong</h3>}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Register;