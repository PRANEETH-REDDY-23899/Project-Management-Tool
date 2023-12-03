
// import './App.css';
// import {Form, Button} from 'react-bootstrap';

// import { BrowserRouter as Router,Routes, Route, Link, Switch} from "react-router-dom";
// import SignUp from './SignUp';
// import Login from './Login';
// import Home from './Home';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import ProjectForm from './components/ProjectForm';
// import TeamForm from './components/TeamForm';
// import TeamRoasterForm from './components/TeamRoasterForm';
// import UserStoryForm from './components/UserStoryForm';
// import TaskForm from './components/TaskForm';
// import NavBar from './components/NavBar';
// // import NavBar from './components/NavBar';
// import DisplayProjects from './components/DisplayProjects';
// import DisplayTeams from './components/DisplayTeams';
// import DeleteteamMembers from './components/DeleteteamMembers';
// import DeleteUserStories from './components/DeleteUserStories';
// import AssignUserStory from './components/AssignUserStory';




// function App() {
//   return (


//     <div className="App">

//       <Router>

//       <NavBar/>

//       <Routes>
//                 <Route path="/Login" element ={<Login/>}></Route>     
//                 <Route path="/SignUp" element ={<SignUp/>}></Route>
//                 <Route path="/" element ={<Home/>}></Route>     
//                 <Route path="/ProjectForm" element ={<ProjectForm/>}></Route>
//                 <Route path="/TeamForm" element ={<TeamForm/>}></Route>
//                 <Route path="/TeamRoasterForm" element ={<TeamRoasterForm/>}></Route>
//                 <Route path="/UserStoryForm" element ={<UserStoryForm/>}></Route>
//                 <Route path="/TaskForm" element ={<TaskForm/>}></Route>
//                 <Route path="/display-projects" element ={<DisplayProjects/>}></Route>
//                 <Route path="/display-teams" element ={<DisplayTeams/>}></Route>
//                 <Route path="/DeleteteamMembers" element ={<DeleteteamMembers/>}></Route>
//                 <Route path="/DeleteUserStories" element ={<DeleteUserStories/>}></Route>
//                 <Route path="/UserStoryAssign" element ={<AssignUserStory/>}></Route>

//       </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;





// {privateRoute} 

import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import SignUp from './SignUp';
import Login from './Login';
import Home from './Home';
// import { AuthProvider } from './AuthContext'; // Import the AuthProvider
import { AuthProvider } from './components/AuthContext';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectForm from './components/ProjectForm';
import TeamForm from './components/TeamForm';
import TeamRoasterForm from './components/TeamRoasterForm';
import UserStoryForm from './components/UserStoryForm';
import TaskForm from './components/TaskForm';
import DisplayProjects from './components/DisplayProjects';
import DisplayTeams from './components/DisplayTeams';
import DeleteteamMembers from './components/DeleteteamMembers';
import DeleteUserStories from './components/DeleteUserStories';
import AssignUserStory from './components/AssignUserStory';
import Profile from './components/Profile';
import DisplayTasks from './components/DisplayTasks';
import DisplayProject from './Page/DisplayProject';
import DisplayTeam from './Page/DisplayTeam';
import DisplayUserstory from './Page/DisplayUserstory';
import DisplayTask from './Page/DisplayTask';


function App() {
  return (
    <AuthProvider> {/* Wrap your entire app with AuthProvider */}
      <div className="App">
        <Router>
          <NavBar />
          <Routes>
            {/* <PrivateRoute path="/" element={<Home />} /> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Home />} />
            <Route path="/ProjectForm" element={<ProjectForm />} />
            <Route path="/TeamForm" element={<TeamForm />} />
            <Route path="/TeamRoasterForm" element={<TeamRoasterForm />} />
            <Route path="/team/:teamId" element={<TeamRoasterForm />} />
            <Route path="/UserStoryForm" element={<UserStoryForm />} />
            <Route path="/TaskForm" element={<TaskForm />} />
            <Route path="/display-projects" element={<DisplayProjects />} />
            <Route path="/display-teams" element={<DisplayTeams />} />
            <Route path="/DeleteteamMembers" element={<DeleteteamMembers />} />
            <Route path="/DeleteUserStories" element={<DeleteUserStories />} />
            <Route path="/UserStoryAssign" element={<AssignUserStory />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/display-tasks" element={<DisplayTasks />} />
            <Route path="/display-project/:projectId" element={<DisplayProject />} />
            <Route path="/display-team/:teamId" element={<DisplayTeam />} />
            <Route path="/display-userstory/:userStoryId" element={<DisplayUserstory />} />
            <Route path="/display-task/:taskId" element={<DisplayTask />} />
            {/* Add more routes here */}
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
