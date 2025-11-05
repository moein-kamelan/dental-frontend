import { RouterProvider } from "react-router-dom"
import routes from "./routes"
import { useEffect } from "react";
import {ToastContainer} from 'react-toastify';

function App() {

useEffect(() => {
  window.scrollTo(0, 0);
}, []);
  

  return (
    
<>
      <ToastContainer stacked   
       position= "top-left"
    autoClose= {5000}
    
    closeOnClick= {true}
    pauseOnHover= {false}
    draggable= {true}
    closeButton = {false}
    progressClassName={"bg-"}  
    
      />

    <RouterProvider router={routes}/>
    
</>
  
    
  )
}

export default App
