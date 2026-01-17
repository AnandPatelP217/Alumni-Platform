import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";

import HomePage from "./pages/HomePage";
import ContactUsPage from "./pages/ContactUsPage";
import NewsFeedPage from "./pages/NewsFeedPage";
import LogInPage from "./pages/LogInPage";
import NotFound from "./components/Other/NotFound";
import AboutSection from "./pages/About";
import { AuthProvider } from "./store/auth";
import ForgotPasswod from "../src/components/LoginAndRegister/ForgotPassword";
import ResetPassoword from "../src/components/LoginAndRegister/ResetPassoword";


// Alumni
import Dashboard from "./components/Dashboard/Alumni/Dashboard";
import ChangePassword from "./components/Dashboard/Alumni/ChangePassword";
import ProfileSetting from "./components/Dashboard/Alumni/ProfileSetting";
import AddMeeting from "./components/Dashboard/Alumni/AddMeeting";
import AddVacancy from "./components/Dashboard/Alumni/AddVacancy";
import PostedVacancies from "./components/Dashboard/Alumni/PostedVacancies";
import PostedMeetings from "./components/Dashboard/Alumni/PostedMeetings";
// Admin
import AdminDashboard from "./components/Dashboard/Admin/AdminDashboard";
import AddAlumni from "./components/Dashboard/Admin/AddAlumni";
import AddStudent from "./components/Dashboard/Admin/AddStudent";
import ViewVacancies from "./components/Dashboard/Admin/ViewVecancies";
import ViewStudent from "./components/Dashboard/Admin/ViewStudents"
import ViewAlumnis from "./components/Dashboard/Admin/ViewAlumnis";
import ViewMeetings from "./components/Dashboard/Admin/ViewMeeting";

// Student
import StudentDashboard from "./components/Dashboard/Student/StudentDashboard";
import StudentProfileSetting from "./components/Dashboard/Student/ProfileSetting";
import ProtectedRoute from "./components/ProtectedRoute";
import DeleteAlumni from "./components/Dashboard/Admin/DeleteAlumni";
import DeleteStudent from "./components/Dashboard/Admin/DeleteStudent";
import StudentViewMeetings from "./components/Dashboard/Student/ViewMeeting";
function App() {
  return (
    <ErrorBoundary>
    <AuthProvider>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/about" element={<AboutSection />} />
          <Route exact path="/contact-us" element={<ContactUsPage />} />
          <Route exact path="/news-feed" element={<NewsFeedPage />} />
          <Route exact path="/login" element={<LogInPage />} />
        <Route exact path="/forgot-password" element= {<ForgotPasswod/>} />
        <Route exact path="/reset-password/:token" element={<ResetPassoword/>} />
          {/* Dashboard Routs */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                element={Dashboard}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />

          <Route
            path="/dashboard/profile-setting"
            element={
              <ProtectedRoute
                element={ProfileSetting}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />

          <Route
            path="/dashboard/add-meeting"
            element={
              <ProtectedRoute
                element={AddMeeting}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />

          <Route
            path="/dashboard/add-vacancy"
            element={
              <ProtectedRoute
                element={AddVacancy}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />
          <Route
            path="/dashboard/posted-vacancies"
            element={
              <ProtectedRoute
                element={PostedVacancies}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />  <Route
          path="/dashboard/posted-meetings"
          element={
            <ProtectedRoute
              element={PostedMeetings}
              requiredRoles={["admin", "alumni"]}
            />
          }
        />

          <Route
            path="/dashboard/change-password"
            element={
              <ProtectedRoute
                element={ChangePassword}
                requiredRoles={["admin", "alumni"]}
              />
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={AdminDashboard}
                requiredRoles={["admin"]}
              />
            }
          />

          <Route
            path="/admin/add-alumni"
            element={
              <ProtectedRoute element={AddAlumni} requiredRoles={["admin"]} />
            }
          />

          <Route
            path="/admin/add-student"
            element={
              <ProtectedRoute element={AddStudent} requiredRoles={["admin"]} />
            }
          />

          <Route
            path="/admin/vacancies"
            element={
              <ProtectedRoute
                element={ViewVacancies}
                requiredRoles={["admin"]}
              />
            }
          />
          <Route
            path="/admin/meetings"
            element={
              <ProtectedRoute
                element={ViewMeetings}
                requiredRoles={["admin","student"]}
              />
            }
          />
          <Route
            path="/admin/ViewStudents"
            element={
              <ProtectedRoute
                element={ViewStudent}
                requiredRoles={["admin"]}
              />
            }
          />
           <Route
            path="/admin/ViewAlumnis"
            element={
              <ProtectedRoute
                element={ViewAlumnis}
                requiredRoles={["admin"]}
              />
            }
          />
             <Route
            path="/admin/DeleteAlumni"
            element={
              <ProtectedRoute
                element={DeleteAlumni}
                requiredRoles={["admin"]}
              />
            }
          />
           <Route
            path="/admin/DeleteStudent"
            element={
              <ProtectedRoute
                element={DeleteStudent}
                requiredRoles={["admin"]}
              />
            }
          />

          {/* Student Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute
                element={StudentDashboard}
                requiredRoles={["student"]}
              />
            }
          />

          <Route
            path="/student/meetings"
            element={
              <ProtectedRoute
                element={StudentViewMeetings}
                requiredRoles={["student"]}
              />
            }
          />

          <Route
            path="/student/profile-setting"
            element={
              <ProtectedRoute
                element={StudentProfileSetting}
                requiredRoles={["student"]}
              />
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
    </ErrorBoundary>
  );
}
export default App;
