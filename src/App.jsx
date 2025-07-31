import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import StudentList from "./components/Students/StudentList";
import ClassList from "./components/Classes/ClassList";
import TeacherList from "./components/Teachers/TeacherList";
import SubjectList from "./components/Subjects/SubjectList";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect từ đường dẫn gốc (/) đến /login */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/students" element={<StudentList />} />
        <Route path="/classes" element={<ClassList />} />
        <Route path="/teachers" element={<TeacherList />} />
        <Route path="/subjects" element={<SubjectList />} />
      </Routes>
    </Router>
  );
}

export default App;
