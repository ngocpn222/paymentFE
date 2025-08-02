import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import StudentList from "./components/Students/StudentList";
import ClassList from "./components/Classes/ClassList";
import TeacherList from "./components/Teachers/TeacherList";
import SubjectList from "./components/Subjects/SubjectList";
import RegisteredSubjectPage from "./components/RegisteredSubjects/RegisteredSubjectPage";
import TuitionList from "./components/Tuition/TuitionList";
import Footer from "./components/Footer";
import RequireAuth from "./components/RequireAuth";
import './App.css';

function AppContent() {
  const location = useLocation();
  const hideHeader = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeader && <Header />}
      <div className={!hideHeader ? "pt-14 flex-1" : "flex-1"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Các route còn lại đều phải đăng nhập */}
          <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
          <Route
            path="/students"
            element={
              <RequireAuth>
                <StudentList />
              </RequireAuth>
            }
          />
          <Route
            path="/classes"
            element={
              <RequireAuth>
                <ClassList />
              </RequireAuth>
            }
          />
          <Route
            path="/teachers"
            element={
              <RequireAuth>
                <TeacherList />
              </RequireAuth>
            }
          />
          <Route
            path="/subjects"
            element={
              <RequireAuth>
                <SubjectList />
              </RequireAuth>
            }
          />
          <Route
            path="/registered-subjects"
            element={
              <RequireAuth>
                <RegisteredSubjectPage />
              </RequireAuth>
            }
          />
          <Route
            path="/tuitions"
            element={
              <RequireAuth>
                <TuitionList />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
