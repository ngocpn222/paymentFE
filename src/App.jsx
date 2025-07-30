import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import StudentList from "./components/Students/StudentList";
import StudentDetails from "./components/Students/StudentDetails";
import StudentAdd from "./components/Students/StudentAdd";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/students/:id" element={<StudentDetails />} />
        <Route path="/students/add" element={<StudentAdd />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
