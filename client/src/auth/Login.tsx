import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

// INTERFACES

interface FormInfo {
  email: string,
  password: string,
}

function Login(): JSX.Element {

  //? STATE

  const [formFields, setFormFields] = useState<FormInfo>({
    email: '',
    password: ''
  })


  // EXECUTIONS

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({...formFields, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      
    await axios.post('/api/auth/register/', formFields)
    
    navigate('/')

    } catch (err) {

      console.log(err)

      // if (axios.isAxiosError(err)) {
      //   let errorMessages: requestError = err.response?.data.detail
      //   let obj: string[][] = Object.entries(errorMessages)
      //   let errArray = []
      //   for (const [key, value] of obj) {
      //     errArray.push(`${key.toUpperCase().replaceAll('_', ' ')}: ${value}`)
      //   }
      //   setError(errArray)
      // }
        
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
    </main>
  )
}

export default Login