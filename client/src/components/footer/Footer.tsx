import { isAuthenticated, removeToken } from "../helpers/Auth"
import { useNavigate } from "react-router-dom"


const Footer = (): JSX.Element => {

  const navigate = useNavigate()


  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    console.log('Button clicked')
    removeToken()
    navigate('/')
  }

  return (
    <footer>
    { isAuthenticated() ? 
      <button onClick={handleLogout}>Sign out</button>
      :
      <p>Welcome to the Meditation App</p>
    }
    </footer>
  )
}

export default Footer