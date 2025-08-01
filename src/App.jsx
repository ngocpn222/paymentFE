import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentList from "./components/Students/StudentList";
import ClassList from "./components/Classes/ClassList";
import TeacherList from "./components/Teachers/TeacherList";
import SubjectList from "./components/Subjects/SubjectList";
import RegisteredSubjectPage from "./components/RegisteredSubjects/RegisteredSubjectPage";
import TuitionList from "./components/Tuition/TuitionList";
import './App.css';

function App() {
  return (
    <Router>
      {/* Header cố định */}
      <Header />
      <div className="pt-20">
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
          <Route path="/registered-subjects" element={<RegisteredSubjectPage />} />
          <Route path="/tuitions" element={<TuitionList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
