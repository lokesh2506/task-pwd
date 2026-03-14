import { useNavigate } from "react-router-dom"
import not_found from "../assets/images/not_found.png"
import {useAuth} from "../hooks/useAuth"

const NotFound = () => {
  const {user} = useAuth()
  const navigate = useNavigate()

  const handleRedirectDashboard = (e) =>{
    navigate("/dashboard")
  }
  const handleRedirectLogin = (e) =>{
    navigate("/")
  }


  return (
    <div className="w-full h-screen flex justify-center items-center flex-col gap-2">
      <img src={not_found} alt="Not Found" srcset=""  className=" w-full md:max-w-[40%] md:max-h-[70%]"/>
      {
        user ? <button className="px-6 py-3 text-white rounded-md bg-blue-600" type="button" onClick={handleRedirectDashboard}>Go to Dashboard</button>
                :
               <button  type="button"  className="px-6 py-3 text-white rounded-md bg-blue-600" onClick={handleRedirectLogin}>Sign In</button>
      }
    </div>
  )
}

export default NotFound