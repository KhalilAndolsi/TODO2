import React, { useState } from 'react'
import "./register.css"
import eyeOpen from "../../assets/icons/eyeOpen.svg"
import eyeClose from "../../assets/icons/eyeClose.svg"
import { Link } from 'react-router-dom'

function Register() {
  const [hidePassword, setHidePassword] = useState(false)
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 8 && username.length >= 12) {
      const data = {
        username: username,
        password: password
      }
    
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}register.php`, {
          method: 'POST',
          body: JSON.stringify(data),
        });
    
        const statusCode = response.status;
    
        if (statusCode === 200) {
          window.alert("Account successfully registered")
          window.location.href = "/login"
        } else if (statusCode === 404) {
          alert('this username already exists');
        } else {
          console.error(`Unexpected status code: ${statusCode}`);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  
  return (
    <div className="container h-screen flex justify-center items-center mx-auto">
      <div className="box p-2 h-min rounded-lg border-2 border-zinc-900 w-[95%] md:w-96">
        <h2 className='font-semibold text-2xl uppercase text-center mb-6 p-3'>Register</h2>
        <form className='flex flex-col gap-3' onSubmit={handleRegisterSubmit}>
          <input type="text" id='username' placeholder='Username' autoFocus required defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
          {(username.length >= 12 || username.length === 0) || <span className='block text-red-600 text-sm ml-3'>At least 12 characters</span>}
          {/* password input */}
          <div className='relative'>
            <input type={hidePassword ? "text" : "password"} id='password' placeholder='Password' required defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="showPassword" className='hidepsw' onClick={() => setHidePassword(!hidePassword)}>
              {
                !hidePassword ? <img src={eyeClose} alt="eyeclose" /> : <img src={eyeOpen} alt="eyeopen" />
              }
            </label> 
          </div>
          {(password.length >= 8 || password.length === 0) || <span className='block text-red-600 text-sm ml-3'>At least 8 characters</span>}
          {/* password input */}
          <input type="submit" value="Register" disabled={!(password.length >= 8 && username.length >= 12)} />
          <Link to="/login" className='p-2 text-center'>Already i have account <span className='font-semibold'>Login</span></Link>
        </form>
      </div>
    </div>
  )
}

export default Register