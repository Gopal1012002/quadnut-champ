import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
import Logo from '../../assets/img/quad-champs/logo.png'
import TopStart from '../../assets/img/quad-champs/top-star.png'


function HeaderStrip({ companyData, student, logout }) {
  const navigate = useNavigate();
  return (
    <>
      {/* header-strip */}
      <section className='herder-strip d-none d-md-block'>
        <div className="container-fluid px-3">
          <div className="d-flex  justify-content-between align-items-center">
            <div>

              <p className='mb-0 fs-14 fw-600 ' onClick={()=>navigate('/')}><span><img src={TopStart} alt="start" className='me-1 rotate-animation' /></span> Welcome to <span  className='header-strip-tittle fw-bold'>Quadnut champs –</span> Unlocking the Power of Education!</p>

            </div>

            {
              !student ? 
              <div className='d-flex ga-2'>
                <div className="btn btm-primary border-left rounded-0 fs-14 auth-btn text-white fw-600" onClick={() => navigate('/student-login')}> <span><i class="fa-solid fa-right-to-bracket me-2"></i></span> Login</div>
                
                <div className="btn btm-primary border-left rounded-0 border-right fs-14 auth-btn text-white fw-600" onClick={() => navigate('/student-register')}><span><i class="fa-solid fa-user-plus me-2"></i></span>Register</div>
              </div> :
              <div className='d-flex ga-2'>
              <div className="btn btm-primary border-left rounded-0 fs-14 auth-btn text-white fw-600" onClick={logout}> <MdLogout size={20} /> Logout</div>
            </div> 
            }


          </div>
        </div>
      </section>




    </>
  )
}

export default HeaderStrip