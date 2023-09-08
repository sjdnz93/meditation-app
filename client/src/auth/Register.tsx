import React, { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

// INTERFACES

interface FormInfo {
  username: string,
  email: string,
  first_name: string,
  password: string,
  password_confirmation: string,
  videos: []
}

interface requestError {
  email?: string[],
  first_name?: string[],
  password?: string[],
  password_confirmation?: string[],
  username?: string[]
}


function Register(): JSX.Element {


  //? STATE

  const [formFields, setFormFields] = useState<FormInfo>({
    username: '',
    email: '',
    first_name: '',
    password: '',
    password_confirmation: '',
    videos: []
  })

  const [error, setError] = useState<requestError>({})


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

    } catch (err: unknown) {
      //console.log('ERROR FROM REGISTER COMPONENT SUBMIT', err)
      if (axios.isAxiosError(err)) {
        //console.log(err.response?.data.detail?.non_field_errors)

        let errorMessages: requestError = err.response?.data.detail

        console.log(errorMessages)

        //let errMessageKey = Object.keys(errorMessages)

        //let errMessageString = Object.values(errorMessages)

        

        let obj: string[][] = Object.entries(errorMessages)

        console.log('ERROR OBJECT', obj)

        let errArray = []

        for (const [key, value] of obj) {
          //console.log(`${key.toUpperCase().replaceAll('_', ' ')}: ${value}`)
          errArray.push(`${key.toUpperCase().replaceAll('_', ' ')}: ${value}`)
        }

        console.log(errArray)
        
        //setError(hello)

      }
        
    }

  }


  return (
    <main>
      <h1>Register</h1>
      <form className='infoForm' onSubmit={handleSubmit}>
        <input type='text' name='username' placeholder='Username' value={formFields.username} onChange={handleChange}></input> 
        <input type='email' name='email' placeholder='Email' value={formFields.email} onChange={handleChange}></input> 
        <input type='text' name='first_name' placeholder='First name' value={formFields.first_name} onChange={handleChange}></input> 
        <input type='password' name='password' placeholder='Password' value={formFields.password} onChange={handleChange}></input> 
        <input type='password' name='password_confirmation' placeholder='Confirm password' value={formFields.password_confirmation} onChange={handleChange}></input>
        <button type='submit'>Register</button>   
      </form>
      {/* {error && error.map<string[]>(item => (
        <p>{item}</p>
      ))} */}
      
    </main>
  )
}

export default Register