import React from 'react';
import { FaReact } from 'react-icons/fa';
import { GiArtificialIntelligence } from 'react-icons/gi';
import { MdAccountBalance, MdOutlineAnimation, MdOutlineDesignServices, MdOutlineWebhook } from 'react-icons/md';
import { TbAppsFilled } from 'react-icons/tb';
import { IoGameController } from 'react-icons/io5';

const PopularCategories = () => {
  const categories = [
    {
      id:1,
      title: "Graphics & Design",
      subTitle: "200 Open Positions",
      icon: <MdOutlineDesignServices />
    },
    {
      id:2,
      title: "Mobile App Development",
      subTitle: "340 Open Positions",
      icon: <TbAppsFilled />
    },
    {
      id:3,
      title: "Frontend Web Development",
      subTitle: "305 Open Positions",
      icon: <MdOutlineWebhook />
    },
    {
      id: 4,
      title: "MERN Stack Development",
      subTitle: "1000+ Open Positions",
      icon : <FaReact />
    },
    {
      id:5,
      title: "Account and Finance",
      subTitle: "200+ Open Positions",
      icon: <MdAccountBalance />
    },
    {
      id:6,
      title: "Artificial Intelligence",
      subTitle: "765 Open Positions",
      icon: <GiArtificialIntelligence />
    },
    {
      id:7,
      title: "Video Animation",
      subTitle: "50 Open Positions",
      icon: <MdOutlineAnimation/>
    },
    {
      id:8,
      title: "Game Development",
      subTitle: "80+ Open Positions",
      icon: <IoGameController />
    },
  ]

  return (
    <div className='categories'>
      <h3><span className='text-primary'>P</span>opular Categories</h3>
        <div className='banner'>
          {
              categories.map(element=>{
                return (
                  <div className='card' key={element.id}>
                        <div className='icon'>{element.icon}</div>
                        <div className='text'>
                          <p className='text-center'>{element.title}</p>
                          <p className='text-center'>{element.subTitle}</p>
                        </div>
                  </div>
                );
              })
          }
        </div>
    </div>
  )
}

export default PopularCategories