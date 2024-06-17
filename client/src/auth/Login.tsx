import React, { useEffect, useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

import { LoginFormInfo, LoginRequestError } from './Interfaces'
import { isAuthenticated } from "../components/helpers/Auth"


function Login(): JSX.Element {

  //? STATE

  const [formFields, setFormFields] = useState<LoginFormInfo>({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string[] | string>([])


  // EXECUTIONS

  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) {
      console.log('attempting to navigate')
      navigate('/profile')
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      const { data } = await axios.post('/api/auth/login/', formFields)
      localStorage.setItem('MEDITATION-LOGIN-TOKEN', data.token)
      console.log('TOKEN', data.token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
      navigate('/profile')

    } catch (err) {

      if (axios.isAxiosError(err)) {
        let errorMessages: LoginRequestError = err.response?.data.detail
        setError(errorMessages)
      }

    }

  }

  return (
    <main>
      <div className='login-register-content-container'>
        <div className='login-register-content-box'>
          <h1>Meditation Station</h1>
          <form className='login-register-form' onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input type='email' name='email' placeholder='Email' value={formFields.email} onChange={handleChange}></input>
            <input type='password' name='password' placeholder='Password' value={formFields.password} onChange={handleChange}></input>
            <button className='submit-auth-button' type='submit'>Login</button>
          </form>
          <Link className='swap-auth-screen' to='/register'>Don't have an account? Click here to register</Link>
          {error.length > 0 && <h3>Login attempt failed</h3>}
          {error && <p>{error}</p>}
        </div>
      </div>
    </main>
  )
}

export default Login