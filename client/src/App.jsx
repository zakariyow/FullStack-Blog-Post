import { Outlet } from "react-router-dom";
import Header from "./Components/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import useAuthCheck from "./Hook/useAuthCheck";

function App() {
  // useAuthCheck();
  return (
    <>
    <ToastContainer autoClose={3000}/>
      <Header/>
      <Outlet />
    </>
  )
}

export default App
