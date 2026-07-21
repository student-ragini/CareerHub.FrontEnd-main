import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";

const Application = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [resume, setResume] = useState(null);

  const { isAuthorized, user } = useContext(Context);

  const navigateTo = useNavigate();
  const { id } = useParams();

  const handleFileChange = (e) => {
    const resume = e.target.files[0];
    setResume(resume);
  };

  const handleApplication = async (e) => {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(phone)) {
      return toast.error("Please enter a valid 10-digit mobile number");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    formData.append("resume", resume);
    formData.append("jobId", id);

    try {
      const { data } = await axios.post(
        "https://careerhub-backend-main.onrender.com/api/v1/application/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setName("");
      setEmail("");
      setCoverLetter("");
      setPhone("");
      setAddress("");
      setResume(null);

      toast.success(data.message);
      navigateTo("/job/getall");
    } catch (error) {
      toast.error(error.response?.data?.message || "Application Failed");
    }
  };

  if (!isAuthorized || (user && user.role === "Employer")) {
    navigateTo("/");
  }

  return (
    <>
      <section className="application">
        <div className="container">
          <h2>Application Form</h2>

          <form onSubmit={handleApplication}>
            <input
              type="text"
              placeholder="Your Name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="email"
              placeholder="Your Email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Your Phone No."
              className="form-control"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");
                if (value.length <= 10) {
                  setPhone(value);
                }
              }}
            />

            <input
              type="text"
              placeholder="Your Address"
              className="form-control"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <textarea
              className="form-control"
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              placeholder="Cover Letter"
            ></textarea>

            <div>
              <label
                style={{
                  textAlign: "start",
                  color: "white",
                  display: "block",
                  fontSize: "20px",
                }}
              >
                Select Resume
              </label>

              <input
                type="file"
                className="form-control"
                accept=".jpg, .png, .webp, .pdf"
                onChange={handleFileChange}
                style={{ width: "100%" }}
              />

              <button className="mt-3 rounded-2" type="submit">
                Send Application
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Application;