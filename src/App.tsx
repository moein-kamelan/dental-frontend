import { RouterProvider } from "react-router-dom"
import routes from "./routes"

function App() {


  return (
    <div className="font-estedad-medium text-dark scroll-smooth ">


    <RouterProvider router={routes}/>
    
  
    </div>
  )
}

export default App
