import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const { isAuthorized }  = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(()=>{
    try{
      axios.get("http://localhost:5000/api/v1/job/getall", {withCredentials:true})
      .then(response=>{
        setJobs(response.data);
      });
    }
    catch(error)
    {
      console.log(error);
    }

  },[]);

  if(!isAuthorized){
    navigateTo("/");
  }

  return (
    <>
      <section className='jobs page'>
        <div className='container'>
          <h1><span className='text-primary'>A</span>ll Available Jobs</h1>
          <div className='banner'>
            {
              jobs.jobs && jobs.jobs.map((element)=> {
                return (
                  <div className='card' key={element._id}>
                    <p>{element.title}</p>
                    <p>{element.category}</p>
                    <p>{element.country}</p>
                    <Link to={`/job/${element._id}`}>Job details</Link>
                  </div>
                );
              })
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Jobs
