import React, { useEffect, useState } from 'react';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ResumeModal from './ResumeModal';
import { useContext } from 'react';
import axios from 'axios';

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { user } = useContext(Context);
  const { isAuthorized } = useContext(Context);

  console.log("user: ", user);

  const navigateTo = useNavigate();

  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get(
          "https://careerhub-backend-main.onrender.com/api/v1/application/employer/getall",
          { withCredentials: true }
        )
        .then((response) => {
          setApplications(response.data.applications);
        });
      }
      else if (user && user.role === "Job Seeker") {
        axios.get(
          "https://careerhub-backend-main.onrender.com/api/v1/application/jobseeker/getall",
          { withCredentials: true }
        )
        .then((response) => {
          setApplications(response.data.applications);
        });
      }
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  }, [isAuthorized]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login");
    }
  }, [isAuthorized]);

  const deleteApplication = (id) => {
    try {
      axios.delete(
        `https://careerhub-backend-main.onrender.com/api/v1/application/delete/${id}`,
        { withCredentials: true }
      )
      .then((response) => {

        toast.success(response.data.message);

        setApplications((prevApplication) =>
          prevApplication.filter(
            (application) => application._id !== id
          )
        );

        navigateTo("/application/me");

      });
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className='my_applications page'>
      {
        user && user.role === "Employer" ? (
          <div className='container'>
            <h1 className='text-center'>Applications From Job Seekers</h1>

            {
              applications.length <= 0 ? (
                <h4 className='text-center'>No Applications Found</h4>
              ) : (
                applications.map((element) => {
                  return (
                    <EmployerCard
                      element={element}
                      key={element._id}
                      openModal={openModal}
                    />
                  );
                })
              )
            }
          </div>
        ) : (
          <div className='container'>
            <h1 className='text-center'>My Applications</h1>

            {
              applications.length <= 0 ? (
                <h3>No Application Found</h3>
              ) : (
                applications.map((element) => {
                  return (
                    user && user.role === "Job Seeker" ? (
                      <JobSeekerCard
                        element={element}
                        key={element._id}
                        deleteApplication={deleteApplication}
                        openModal={openModal}
                      />
                    ) : (
                      <h2>No Applications are found</h2>
                    )
                  );
                })
              )
            }
          </div>
        )
      }

      {
        modalOpen && (
          <ResumeModal
            imageUrl={resumeImageUrl}
            onClose={closeModal}
          />
        )
      }
    </section>
  );
};

export default MyApplications;


const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Phone: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>Cover Letter: </span>
            {element.coverLetter}
          </p>
        </div>

        <div className='resume'>
          {
            element.resume.url.includes(".pdf") ? (
              <a
                href={element.resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume PDF
              </a>
            ) : (
              <img
                src={element.resume.url}
                alt="resume"
                onClick={() => openModal(element.resume.url)}
              />
            )
          }
        </div>

        <div className='btn_area'>
          <button onClick={() => deleteApplication(element._id)}>
            Delete Application
          </button>
        </div>
      </div>
    </>
  );
};

const EmployerCard = ({ element, openModal }) => {
  return (
    <>
      <div className="job_seeker_card">
        <div className="detail">
          <p>
            <span>Name: </span>
            {element.name}
          </p>
          <p>
            <span>Email: </span>
            {element.email}
          </p>
          <p>
            <span>Phone: </span>
            {element.phone}
          </p>
          <p>
            <span>Address: </span>
            {element.address}
          </p>
          <p>
            <span>Cover Letter: </span>
            {element.coverLetter}
          </p>
        </div>

        <div className='resume'>
          {
            element.resume.url.includes(".pdf") ? (
              <a
                href={element.resume.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume PDF
              </a>
            ) : (
              <img
                src={element.resume.url}
                alt="resume"
                onClick={() => openModal(element.resume.url)}
              />
            )
          }
        </div>
      </div>
    </>
  );
};