import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

import { LoginFormInfo, LoginRequestError } from "../interfaces/Interfaces"


function Login(): JSX.Element {

  //? STATE

  const [formFields, setFormFields] = useState<LoginFormInfo>({
    email: '',
    password: ''
  })

  const [error, setError] = useState<string[] | string>([])


  // EXECUTIONS

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      
    await axios.post('/api/auth/login/', formFields)
    
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
      <h1>Login</h1>
      <form className='infoForm' onSubmit={handleSubmit}>
        <input type='email' name='email' placeholder='Email' value={formFields.email} onChange={handleChange}></input> 
        <input type='password' name='password' placeholder='Password' value={formFields.password} onChange={handleChange}></input> 
        <button type='submit'>Login</button>   
      </form>
      {error.length > 0 && <h3>Login attempt failed</h3>}
      {error && <p>{error}</p>}
    </main>
  )
}

export default Login