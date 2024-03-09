import { Route, Routes } from "react-router-dom"
import Login from "./components/login/Login"
import Admin from "./components/admin/Admin";
import Student from "./components/student/Student";
import Instructor from "./components/instructor/Instructor";


function App() {
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/instructor" element={<Instructor />} />
      </Routes>
    </>
  );
}

export default App
