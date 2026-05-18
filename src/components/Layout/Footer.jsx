import React, { useContext } from 'react'
import { Context } from '../../main'
import { Link } from 'react-router-dom'
import { FaTelegramPlane, FaLinkedin} from 'react-icons/fa'
import {RiInstagramFill} from 'react-icons/ri'

const Footer = () => {
  const {isAuthorized} = useContext(Context);
  return (
    <footer className={isAuthorized ? "footerShow" : "footerHide"}>
      <div><span className='text-primary'>&copy;</span>All Rights Reserved By Ragini Kumari. </div>
      <div>
        <a href="http://www.linkedin.com/in/ragini-kumari-326b072a5" target="_blank"><FaLinkedin/></a>
        <a href="https://www.instagram.com/rag_ini2728" target='_blank'><RiInstagramFill/></a>
        <a href="https://t.me/ragini_2728" target="_blank"><FaTelegramPlane/></a>
      </div>
    </footer>
  )
}

export default Footer