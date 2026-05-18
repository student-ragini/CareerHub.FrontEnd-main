import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from 'react-icons/ri';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);

  const handleLogin = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(
        "https://careerhub-backend-main.onrender.com/api/v1/user/login",
        { email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      toast.success(data.message);

      setUser(data.user);
      setIsAuthorized(true);

      setEmail("");
      setRole("");
      setPassword("");
      setIsAuthorized(true);
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  };

 if(isAuthorized)
{
  return <Navigate to={"/"}/>
}

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo2.png" alt="logo" />
            <p>Login to your account</p>
          </div>
          <form>
              <div className='inputTag'>
                <div>
                  <select className="form-select" value={role} onChange={(e)=> setRole(e.target.value)}>
                    <option value="">Select Role</option>
                    <option value="Employer">Employer</option>
                    <option value="Job Seeker">Job Seeker</option>
                  </select>
                  <FaRegUser />
                </div>
              </div>               
              <div className='inputTag'>
                <div>
                  <input type="email" className='form-control' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter Email" />
                  <MdOutlineMailOutline />
                </div>
              </div>
              <div className='inputTag'>
                <div>
                  <input type="password" className='form-control' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" />
                  <RiLock2Fill />
                </div>
              </div>
              <button onClick={handleLogin} type="submit">Login</button>
              <Link to={'/register'}>Register Now</Link>
          </form>
        </div>
        <div className="banner">
            <img src="/login.png" alt="login" />
        </div>
      </div>
    </>
  )
}

export default Login;
