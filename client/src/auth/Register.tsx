import React, { useState } from "react"
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"

import { RegisterFormInfo, RegisterRequestError } from './Interfaces'


function Register(): JSX.Element {


  //? STATE

  const [formFields, setFormFields] = useState<RegisterFormInfo>({
    username: '',
    email: '',
    first_name: '',
    password: '',
    password_confirmation: '',
    videos: []
  })

  const [error, setError] = useState<string[]>([])


  // EXECUTIONS

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({ ...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      await axios.post('/api/auth/register/', formFields)

      navigate('/')

    } catch (err) {

      if (axios.isAxiosError(err)) {
        let errorMessages: RegisterRequestError = err.response?.data.detail
        let obj: string[][] = Object.entries(errorMessages)
        let errArray: string[] = []

        for (const [key, value] of obj) {
          errArray.push(`${key.toUpperCase().replaceAll('_', ' ')}: ${value}`)
        }
        console.log(errArray)
        errArray.forEach(item => {
          if (item.includes('EMAIL: user with this email already exists.')) {
            errArray = []
            errArray.push('Unauthorized')
            setError(errArray)
          } else {
            setError(errArray)
          }
        })

      }

    }

  }


  return (
    <main>
      <div className='login-register-content-container'>
        <div className='login-register-content-box'>

          <form className='login-register-form' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input type='text' name='username' placeholder='Username' value={formFields.username} onChange={handleChange}></input>
            <input type='email' name='email' placeholder='Email' value={formFields.email} onChange={handleChange}></input>
            <input type='text' name='first_name' placeholder='First name' value={formFields.first_name} onChange={handleChange}></input>
            <input type='password' name='password' placeholder='Password' value={formFields.password} onChange={handleChange}></input>
            <input type='password' name='password_confirmation' placeholder='Confirm password' value={formFields.password_confirmation} onChange={handleChange}></input>
            <button className='submit-auth-button' type='submit'>Register</button>
          </form>
          <Link className='swap-auth-screen' to='/'>Already have an account? Click here to login</Link>
          {error.length > 0 && <h3>Register attempt failed</h3>}
          {error && error.map((item, index) => (
            <p key={index}>{item}</p>
          ))}
        </div>
      </div>
    </main>
  )
}

export default Register