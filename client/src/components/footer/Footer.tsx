import { isAuthenticated } from "../helpers/Auth"





const Footer = (): JSX.Element => {

  return (
    <footer>
    { isAuthenticated() ? 
      <button>Sign out</button>
      :
      <p>hello</p>
    }
    </footer>
  )
}

export default Footer