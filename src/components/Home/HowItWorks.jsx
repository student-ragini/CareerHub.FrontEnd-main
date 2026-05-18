import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend} from 'react-icons/io'

const HowItWorks = () => {
  return (
    <div className="howitworks">
      <div className='container'>
        <h3><span className='text-primary'>H</span>ow CarrerHub Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus />
            <p>Create Account</p>
            <p>You can use this app by creating your account.
              Once you create your account then you can login with your email address.
            </p>
          </div>
          <div className='card'>
            <MdFindInPage />
            <p>Find a Job/Post</p>
            <p>If you are a Job Seeker then you can use this 
              app to find the job for you and if you are an Employer
              then you can post the job on this application.
            </p>
          </div>
          <div className='card'>
            <IoMdSend />
            <p>Create Account</p>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing 
              elit. Animi commodi adipisci reiciendis provident blanditiis 
              harum, ratione quod laboriosam eum officiis.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowItWorks