import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { Navigate, Link } from "react-router-dom";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaPhoneFlip } from "react-icons/fa6";
import { RiEyeFill, RiEyeOffFill, RiLock2Fill } from "react-icons/ri";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    isAuthorized,
    setIsAuthorized,
    setUser,
  } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!role || !name || !email || !phone || !password) {
      return toast.error("Please fill all fields");
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return toast.error(
        "Enter a valid 10-digit Indian mobile number"
      );
    }

    if (password.length < 8) {
      return toast.error(
        "Password must be at least 8 characters"
      );
    }

    try {
      const { data } = await axios.post(
        "https://careerhub-backend-main.onrender.com/api/v1/user/register",
        {
          name,
          email,
          password,
          phone,
          role,
        },
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
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Registration Failed"
      );
    }
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="authPage">
        <div className="container">
          <div className="header">
            <img src="/JobZeelogo2.png" alt="logo" />
            <p>Create a new account</p>
          </div>

          <form onSubmit={handleRegister}>
            {/* Role */}
            <div className="inputTag">
              <div>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>

            {/* Name */}
            <div className="inputTag">
              <div>
                <input
                  type="text"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                />
                <FaPencilAlt />
              </div>
            </div>

            {/* Email */}
            <div className="inputTag">
              <div>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email"
                />
                <MdOutlineMailOutline />
              </div>
            </div>

            {/* Phone */}
            <div className="inputTag">
              <div>
                <input
                  type="tel"
                  className="form-control"
                  value={phone}
                  placeholder="Enter Mobile Number"
                  maxLength={10}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");
                    if (value.length <= 10) {
                      setPhone(value);
                    }
                  }}
                />
                <FaPhoneFlip />
              </div>
            </div>

            {/* Password */}
            <div className="inputTag">
              <div className="passwordField">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Password"
                />

                <span
                  className="eyeIcon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <RiEyeFill />
                  ) : (
                    <RiEyeOffFill />
                  )}
                </span>

                <RiLock2Fill className="lockIcon" />
              </div>
            </div>

            <button type="submit">
              Register
            </button>

            <Link to="/login">
              Login Now
            </Link>
          </form>
        </div>

        <div className="banner">
          <img
            src="/register.png"
            alt="register"
          />
        </div>
      </div>
    </>
  );
};

export default Register;