import React, { useContext, useState } from 'react';
import { Context } from "../../main";
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const PostJob = () => {
  const [ title, setTitle ] = useState("");
  const [ description, setDescription ] = useState("");
  const [ category, setCategory ] = useState("");
  const [ country, setCountry] = useState("");
  const [ city, setCity ] = useState("");
  const [ location, setLocation] = useState("");
  const [ salaryFrom, setSalaryFrom] = useState("");
  const [ salaryTo, setSalaryTo] = useState("");
  const [ fixedSalary, setFixedSalary] = useState("");
  const [ salaryType, setSalaryType ] = useState("default");

  const { isAuthorized, user} = useContext(Context);

  const handleJobPost = async(e)=>{
    e.preventDefault();
    if(salaryType === "Fixed Salary")
    {
      setSalaryFrom("");
      setSalaryTo("");
    }
    else if(salaryType === "Ranged Salary")
    {
      setFixedSalary("");
    }
    else
    {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }
    await axios.post("http://localhost:5000/api/v1/job/post", fixedSalary.length >=4 ? 
      { title, category, country, city, location, fixedSalary, description }:
      { title, category, country, city, location, salaryFrom, salaryTo, description },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
      )
      .then(res=>
        {
          toast.success(res.data.message)
          setTitle("");
          setDescription("");
          setCategory("");
          setCountry("");
          setCity("");
          setLocation("");
          setSalaryFrom("");
          setSalaryTo("");
          setFixedSalary("");
          setSalaryType("");
        }
      )
      .catch((error)=>{
        toast.error(error.response.data.message);
      });
  };

  const navigateTo = useNavigate();
  if(!isAuthorized || user && user.role !== "Employer"){
    navigateTo("/");
  }

  return (
    <>
      <div className="job_post page">
        <div className='container'>
          <h3>Post New Job</h3>
          <form onSubmit={handleJobPost}>
            <div className='wrapper'>
              <input type="text" value={title} onChange={(e)=> setTitle(e.target.value)} placeholder='Job Title' className='form-control' />
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className='form-select'>
                <option value="">Select Category</option>
                <option value="Graphics & Design">Graphics & Design</option>
                <option value="DevOps">DevOps</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="Frontend Web Development">Frontend Web Development</option>
                <option value="MERN Stack Development">MERN Stack Development</option>
                <option value="Account & Finance">Account & Finance</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Video Animation">Video Animation</option>
                <option value="MEAN Stack Development">MEAN Stack Development</option>
                <option value="MEVN Stack Development">MEVN Stack Development</option>
                <option value="Data Entry Operator">Data Entry Operator</option>
              </select>
            </div>
            <div className="wrapper">
              <input type="text" 
                value={country} 
                onChange={(e)=> setCountry(e.target.value)} 
                placeholder="Country"
                className='form-control' />

              <input type="text" 
                value={city} 
                onChange={(e)=> setCity(e.target.value)} 
                placeholder="City"
                className='form-control' />
            </div>
            <div className='location'>
              <input type="text" value={location}
                onChange={(e)=>setLocation(e.target.value)}
                placeholder='Location'
                className='form-control'
              />
            </div>
            <div className="salary_wrapper mt-3">
              <select value={salaryType} onChange={(e)=> setSalaryType(e.target.value)} className='form-select'>
                <option value="default">Select Salary Type</option>
                <option value="Fixed Salary">Fixed Salary</option>
                <option value="Ranged Salary">Ranged Salary</option>
              </select>
              <div>
                {
                  salaryType === "default" 
                  ? (<p>Please provide Salary Type *</p>)
                  : (
                    salaryType === "Fixed Salary" 
                    ? (
                        <div className='fixed_salary'>
                          <input type="number" placeholder='Enter Fixed Salary' 
                          value={fixedSalary} 
                          onChange={(e)=>setFixedSalary(e.target.value)} 
                          className='form-control' />
                        </div>
                      )
                    :(
                        <div className='ranged_salary'>
                          <input type="number"  placeholder='Salary From'
                            value={salaryFrom}
                            onChange={(e)=> setSalaryFrom(e.target.value)} 
                            className='form-control'
                          />
                          <input type="number"  placeholder='Salary To'
                            value={salaryTo}
                            onChange={(e)=> setSalaryTo(e.target.value)} 
                            className='form-control'
                          />
                        </div>
                      )
                  )
                }
              </div>
            </div>
            <textarea 
              rows="6" 
              value={description} 
              onChange={(e)=> setDescription(e.target.value)} 
              placeholder='Description'
              className='form-control'
              />
              <button type='submit'>Create Job</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostJob
