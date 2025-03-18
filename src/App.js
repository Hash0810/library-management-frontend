import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OTPVerification from "./pages/OTPVerification";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard";
import AdminSignup from "./pages/AdminSignup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Homepage from "./pages/HomePage";
import PublicHomePage from "./pages/PublicHome";
import ProfilePage from "./pages/ProfilePage";
import IssueBook from "./pages/IssueBook";
import AddBook from "./pages/AddBook";
import UpdateBookStatus from "./pages/UpdateBookStatus";
import BookInventory from "./pages/BookInventory";
import AddUser from "./pages/AddUser";
import AddAdmin from "./pages/AddAdmin";
import LibrarianInfo from "./pages/LibrarianInfo";
import BorrowBook from "./pages/BorrowBook";
import ReturnBook from "./pages/ReturnBook";
import BookHistory from "./pages/BookHistory";

function App() {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(localStorage.getItem("role")?.toUpperCase() || null);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    const storedRole = localStorage.getItem("role");
    const otpStatus = localStorage.getItem("isOtpVerified") === "true";

    if (authStatus && storedRole) {
      setRole(storedRole.toUpperCase());
      setIsOtpVerified(otpStatus);
    } else {
      localStorage.clear();
    }

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOtpVerified ? (
              role === "ADMIN" ? <Navigate to="/admin-dash" /> : <Navigate to="/homepage" />
            ) : (
              <PublicHomePage />
            )
          }
        />
        <Route path="/login" element={isAuthenticated && isOtpVerified ? <Navigate to="/" /> : <Login setIsOtpVerified={setIsOtpVerified} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin-signup" element={<AdminSignup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/otp-verification" element={isAuthenticated ? <OTPVerification onSuccess={() => setIsOtpVerified(true)} /> : <Navigate to="/login" />} />

        <Route path="/homepage" element={isAuthenticated && isOtpVerified ? <Homepage /> : <Navigate to="/" />} />
        <Route path="/add-book" element={isAuthenticated ? <AddBook /> : <Navigate to="/" />} />
        <Route path="/update-book-status" element={isAuthenticated ? <UpdateBookStatus /> : <Navigate to="/" />} />
        <Route path="/issue-books" element={isAuthenticated ? <IssueBook /> : <Navigate to="/" />} />
        <Route path="/add-user" element={isAuthenticated ? <AddUser /> : <Navigate to="/" />} />
        <Route path="/add-admin" element={isAuthenticated ? <AddAdmin /> : <Navigate to="/" />} />
        <Route path="/librarian-info" element={isAuthenticated ? <LibrarianInfo /> : <Navigate to="/" />} />
        <Route path="/book-inventory" element={isAuthenticated ? <BookInventory /> : <Navigate to="/" />} />
        <Route path="/book-history" element={isAuthenticated ? <BookHistory /> : <Navigate to="/" />} />
        <Route path="/profile" element={isAuthenticated && isOtpVerified ? <ProfilePage /> : <Navigate to="/" />} />
        <Route path="/borrow-books" element={isAuthenticated ? <BorrowBook /> : <Navigate to="/" />} />
        <Route path="/return-books" element={isAuthenticated ? <ReturnBook /> : <Navigate to="/" />} />
        <Route path="/admin-dash" element={isAuthenticated && role === "ADMIN" && isOtpVerified ? <AdminDashboard /> : <Navigate to="/" />} />
        <Route path="/user" element={isAuthenticated && ["STUDENT", "TEACHER", "LIBRARIAN"].includes(role) && isOtpVerified ? <UserDashboard /> : <Navigate to="/" />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;