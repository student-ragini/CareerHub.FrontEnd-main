import React from 'react';
import { FaApple, FaGoogle, FaMicrosoft } from 'react-icons/fa';
import { SiTesla } from 'react-icons/si';

const PopularCompanies = () => {
  const companies = [
    {
      id: 1,
      title: "Microsoft",
      location: "Street 10 Bengaluru, Karnataka India",
      openPositions: 10,
      icon: <FaMicrosoft />
    },
    {
      id:2,
      title: "Tesla",
      location: "Cluster 12 High Tech City, Hyderabad, Telangana",
      openPositions: 5,
      icon: <SiTesla/>
    },
    {
      id:4,
      title: "Apple",
      location: "Street 12 Bengaluru, Karnataka",
      openPositions: 4,
      icon: <FaApple/>
    },
  ];
    
  return (
    <>
      <div className='companies'>
        <div className='container'>
          <h3><span className='text-primary'>T</span>op Companies</h3>
          <div className='banner'>
            {
              companies.map(element=>{
                return (
                  <div className='card' key={element.id}>
                      <div className='content'>
                        <div className='icon'>{element.icon}</div>
                        <div className='text'>
                          <p>{element.title}</p>
                          <p>{element.location}</p>
                        </div>
                      </div>
                      <button>Open Positions {element.openPositions}</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default PopularCompanies