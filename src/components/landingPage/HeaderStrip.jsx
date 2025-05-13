import React from 'react'
import { useNavigate } from 'react-router-dom';
import { MdLogout } from "react-icons/md";
function HeaderStrip({ companyData, student, logout }) {
  const navigate = useNavigate();
  return (
    <>
      {/* header-strip */}
      <section className='herder-strip'>
        <div className="container-fluid px-3">
          <div className="d-flex  justify-content-between align-items-center">
            <div>

              {/* <p className='mb-0 fs-14 fw-600 ' onClick={()=>navigate('/')}> Home</p> */}

            </div>

            {
              !student ? 
              <div className='d-flex ga-2'>
                <div className="btn btm-primary border-left rounded-0 fs-14 auth-btn text-white fw-600" onClick={() => navigate('/student-login')}>Login</div>
                <div className="btn btm-primary border-left rounded-0 border-right fs-14 auth-btn text-white fw-600" onClick={() => navigate('/student-register')}>Register</div>
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