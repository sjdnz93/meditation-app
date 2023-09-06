import React, { useState } from "react"



// INTERFACES

interface FormInfo {
  username: string,
  email: string,
  first_name: string,
  password: string,
  password_confirmation: string,
  videos: []
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

  // EXECUTIONS

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormFields({...formFields, [e.target.name]: e.target.value })
  }




  return (
    <main>
      <h1>Register</h1>
      <form className='infoForm'>
        <input type='text' name='username' placeholder='Username' value={formFields.username} onChange={handleChange}></input> 
        <input type='text' name='email' placeholder='Email' value={formFields.email} onChange={handleChange}></input> 
        <input type='text' name='first_name' placeholder='First name' value={formFields.first_name} onChange={handleChange}></input> 
        <input type='text' name='password' placeholder='Password' value={formFields.password} onChange={handleChange}></input> 
        <input type='text' name='password_confirmation' placeholder='Confirm password' value={formFields.password_confirmation} onChange={handleChange}></input>   
      </form>
    </main>
  )
}

export default Register