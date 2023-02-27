// import "./App.css";
// import Home from "./pages/Home";
// import JobInfo from "./pages/JobInfo";
// import { BrowserRouter, Redirect, Route } from "react-router-dom";
// import AppliedJobs from "./pages/AppliedJobs";
// import PostJob from "./pages/PostJob";
// import Profile from "./pages/Profile";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllJobs } from "./redux/actions/jobActions.";
// import { useEffect } from "react";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import PostedJobs from "./pages/PostedJobs";
// import EditJob from "./pages/EditJob";
// import { getAllUsers } from "./redux/actions/userActions";
// import UserInfo from "./pages/UserInfo";
// import UserHome from "./userPages/UserHome";
// import resume from "./pages/resume";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// function App() {
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllJobs());
//     dispatch(getAllUsers())
//   }, []);
//   return (
//     <div className="App">
//       <BrowserRouter>
//         <Route path="/login" exact component={Login} />
//         <Route
//           path="/forgotpassword"
//           exact
//           component={ForgotPassword}
//         />
//         <Route
//           path="/passwordreset/:resetToken"
//           exact
//           component={ResetPassword}
//         />
//         <Route path="/register" exact component={Register} />

//         <ProtectedRoute path="/" exact component={Home} />
//         <ProtectedRoute path="/UserHome" exact component={UserHome} />
//         <ProtectedRoute path="/appliedjobs" exact component={AppliedJobs} />
//         <ProtectedRoute path="/postjob" exact component={PostJob} />

//         <ProtectedRoute path="/Profile" exact component={Profile} />
//         <ProtectedRoute path="/jobs/:id" exact component={JobInfo} />

//         <ProtectedRoute path="/posted" exact component={PostedJobs} />

//         <ProtectedRoute path="/editjob/:id" exact component={EditJob} />
//         <ProtectedRoute path="/users/:id" exact component={UserInfo} />
//         <ProtectedRoute path="/resume" exact component={resume} />
//       </BrowserRouter>
//     </div>
//   );
// }

// export default App;

// export function ProtectedRoute(props) {
//   const user = localStorage.getItem("user");

//   if (!user) {
//     return <Redirect to="/login" />;
//   } else {
//     return <Route {...props} />;
//   }
// }























import "./App.css";
import Home from "./pages/Home";
import JobInfo from "./pages/JobInfo";
import { BrowserRouter, Redirect, Route } from "react-router-dom";
import AppliedJobs from "./pages/AppliedJobs";
import PostJob from "./pages/PostJob";
import Profile from "./pages/Profile";
import { useDispatch, useSelector } from "react-redux";
import { getAllJobs } from "./redux/actions/jobActions.";
import { useEffect } from "react";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PostedJobs from "./pages/PostedJobs";
import EditJob from "./pages/EditJob";
import { getAllUsers } from "./redux/actions/userActions";
import UserInfo from "./pages/UserInfo";
import UserHome from "./userPages/UserHome";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AppliedCandidates from "./pages/Candidates";
import ViewProfile from "./pages/ViewProfile";
import PrintResume from "./pages/PrintResume";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllJobs());
    dispatch(getAllUsers())
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/login" exact component={Login} />
        <Route
          path="/forgotpassword"
          exact
          component={ForgotPassword}
        />
        <Route
          path="/passwordreset/:resetToken"
          exact
          component={ResetPassword}
        />
        <Route path="/register" exact component={Register} />

        <Route path="/" exact component={Home} />
        <Route path="/UserHome" exact component={UserHome} />
        <Route path="/appliedjobs" exact component={AppliedJobs} />
        <Route path="/postjob" exact component={PostJob} />

        <Route path="/Profile" exact component={Profile} />
        <Route path="/ViewProfile" exact component={ViewProfile} />
        <Route path="/jobs/:id" exact component={JobInfo} />

        <Route path="/posted" exact component={PostedJobs} />
        <Route path="/Candidates" exact component={AppliedCandidates} />
        <Route path="/editjob/:id" exact component={EditJob} />
        <Route path="/users/:id" exact component={UserInfo} />
        <Route path="/Printresume" exact component={PrintResume} />
      </BrowserRouter>
    </div>
  );
}

export default App;
