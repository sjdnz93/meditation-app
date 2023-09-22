import { useState } from 'react'



function AddVideo(): JSX.Element {

  const [urlField, setURLField] = useState('')


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value)
    setURLField(e.target.value)
  }

  const processLink = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('input form state', urlField)
  
  }

  return (
    <main>
      <h1>ADD VIDEO</h1>
      <form onSubmit={processLink}>
        <input type="text" placeholder="Insert video URL here" onChange={handleChange}></input>
        <button type="submit">Process video</button>
      </form>
    </main>

  )
}

export default AddVideo