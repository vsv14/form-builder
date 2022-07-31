import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import FormAwnser from "./pages/FormAwnser";
import FormView from "./pages/FormView";
import Search from "./pages/Search";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/form/:formUUID" element={<FormView />}/>
          <Route path="/form/:formUUID/:userUUID" element={<FormAwnser />}/>

          
          <Route path="*" element={<Navigate replace to="/search"/>}/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
          position="top-right"
          theme="dark"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          dark
        />
    </div>
  );
}

export default App;
