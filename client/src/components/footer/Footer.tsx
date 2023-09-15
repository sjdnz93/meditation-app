import { isAuthenticated } from "../helpers/Auth"





const Footer = (): JSX.Element => {


  const handleLogout = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    console.log('Button clicked')

  }

  return (
    <footer>
    { isAuthenticated() ? 
      <button onClick={handleLogout}>Sign out</button>
      :
      <p>hello</p>
    }
    </footer>
  )
}

export default Footer