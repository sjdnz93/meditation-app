import { removeToken } from "../helpers/Auth"
import { useNavigate } from "react-router-dom"


const Logout = (): JSX.Element => {

  const navigate = useNavigate()


  const handleLogout = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault()
    let answer = window.confirm('Are you sure you want to sign out?')
    if (answer) {
      removeToken()
      navigate('/')
    }
  }

  return (
    <div className='logout' onClick={handleLogout}>Sign out</div>
  )
}

export default Logout