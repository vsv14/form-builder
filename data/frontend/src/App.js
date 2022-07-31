import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import FormBuilder from "./pages/FormBuilder";
import FormView from "./pages/FormView";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/builder" element={<FormBuilder />} />
          <Route path="/builder/:formUUID" element={<FormView />}/>
          <Route path="*" element={<Navigate replace to="/builder"/>}/>
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
