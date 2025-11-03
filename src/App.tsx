import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import { useEffect } from "react";


function App() {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  

  return (
    

    <RouterProvider router={routes}/>
    
  
    
  )
}

export default App
