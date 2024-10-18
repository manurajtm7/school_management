import React from 'react'
import { Authenticate } from '../../components'

function AccountScreen() {

  const auth_token = true || localStorage.getItem("MERN_SCHL_AUTH_TOKEN");


  return (
    <div className='w-full h-screen '>
      {
        !auth_token ?
          (
            <div className='w-full h-full grid place-items-center'>
              <Authenticate />
            </div>
          )
          : "logged!"
      }
    </div>
  )
}

export default AccountScreen