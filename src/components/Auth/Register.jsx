import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import { MdOutlineMailOutline } from 'react-icons/md';
import { FaPhoneFlip } from "react-icons/fa6";
import { RiLock2Fill } from 'react-icons/ri';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone,setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const {isAuthorized, setIsAuthorized, user, setUser} = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        { name, email, password, phone, role},
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
      
      setName("");
      setEmail("");
      setPhone("");
      setRole("");
      setPassword("");
      setIsAuthorized(true);
    }
    catch(error){
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  if(isAuthorized)
  {
    return <Navigate to={"/"} />
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo2.png" alt="logo" />
            <p>Create a new account</p>
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
                  <input type="text" className='form-control' value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" />
                  <FaPencilAlt />
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
                  <input type="number" className='form-control' value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder="Enter Mobile Number" />
                  <FaPhoneFlip/>
                </div>
              </div>
              <div className='inputTag'>
                <div>
                  <input type="password" className='form-control' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter Password" />
                  <RiLock2Fill />
                </div>
              </div>
              <button onClick={handleRegister} type="submit">Register</button>
              <Link to={'/login'}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
            <img src="/register.png" alt="register" />
        </div>
      </div>
    </>
  )
}

export default Register;
