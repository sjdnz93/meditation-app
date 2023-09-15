import { Link } from 'react-router-dom'

const Error = (props: { error: string }): JSX.Element => {

  return (

    <div>
    <h1>Uh-oh, something went wrong!</h1>
    <p>{props.error}</p>
    <p>Click <Link to='/'>here</Link> to return to the login page</p>
  </div>
  )
}

export default Error