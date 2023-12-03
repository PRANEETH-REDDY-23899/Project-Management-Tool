// // NavBar.js
// import React from 'react';
// import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'
// import { useLocation } from 'react-router-dom';
// import { Row, Col, Image } from 'react-bootstrap';
// // import { signOut, isAuthenticated } from '../auth';
// // import simple_logo from '../images/simple_logo.png';


// // const logo_location = require('.../images/simple_logo.png')

// const NavBar = () => {

//   const location = useLocation();
//   const isActive = (path) => {
//     // Check if the current location matches the given path
//     return location.pathname === path;
//   };


//   return (
//     <Navbar bg="dark" variant="dark"  className="justify-content-center">
//     <Navbar.Brand as={NavLink} to="/" exact activeClassName="active" >
//     {/* <Image src={} alt="Your App Name" width="100" /> */}
    
//     </Navbar.Brand>
//     <Nav className="ml-auto">
//       <Nav.Link as={NavLink} to="/" exact activeClassName="active">
//         Home
//       </Nav.Link>


//       {/* drop down */}

     

//       {/* <Nav.Link as={NavLink} to="/TeamForm" className={isActive('/TeamForm') ? 'active' : ''}>
//         TeamForm
//       </Nav.Link> */}

//       <NavDropdown title="Teams" id="display-projects-dropdown">
//         {/* Add links or components related to displaying projects here */}
//         <NavDropdown.Item as={NavLink} to="/TeamForm" className={isActive('/TeamForm') ? 'active' : ''}>
//           Create a Team
//         </NavDropdown.Item>
//         <NavDropdown.Item as={NavLink} to="/display-teams" className={isActive('/display-teams') ? 'active' : '' }>
//           Display List of Teams
//         </NavDropdown.Item>
//         {/* Add more options as needed */}
//       </NavDropdown>





//       {/* <Nav.Link as={NavLink} to="/ProjectForm" className={isActive('/ProjectForm') ? 'active' : ''}>
//         ProjectForm
//       </Nav.Link> */}


//       <NavDropdown title="Projects" id="display-projects-dropdown">
//         {/* Add links or components related to displaying projects here */}
//         <NavDropdown.Item as={NavLink} to="/ProjectForm" className={isActive('/ProjectForm') ? 'active' : ''}>
//           Create a Project
//         </NavDropdown.Item>
//         <NavDropdown.Item as={NavLink} to="/display-projects" className={isActive('/display-projects') ? 'active' : '' }>
//           Display List of Projects
//         </NavDropdown.Item>
//         {/* Add more options as needed */}
//       </NavDropdown>

//       <NavDropdown title="Team Roasters" id="display-projects-dropdown">
//         {/* Add links or components related to displaying projects here */}
//         <NavDropdown.Item as={NavLink} to="/TeamRoasterForm" className={isActive('/TeamRoasterForm') ? 'active' : ''}>
//           Create Team Roaster
//         </NavDropdown.Item>
//         <NavDropdown.Item as={NavLink} to="/DeleteteamMembers" className={isActive('/DeleteteamMembers') ? 'active' : '' }>
//           View and Delete Team Members
//         </NavDropdown.Item>
//         {/* Add more options as needed */}
//       </NavDropdown>
     
//       {/* <Nav.Link as={NavLink} to="/UserStoryForm" className={isActive('/UserStoryForm') ? 'active' : ''}>
//         UserStoryForm
//       </Nav.Link> */}


//       <NavDropdown title="UserStoryForm" id="display-UserStories-dropdown">
//         {/* Add links or components related to displaying projects here */}
//         <NavDropdown.Item as={NavLink} to="/UserStoryForm" className={isActive('/UserStoryForm') ? 'active' : ''}>
//           Create User Story
//         </NavDropdown.Item>
//         <NavDropdown.Item as={NavLink} to="/DeleteUserStories" className={isActive('/DeleteUserStories') ? 'active' : '' }>
//           View and Delete UserStory
//         </NavDropdown.Item>
//         <NavDropdown.Item as={NavLink} to="/UserStoryAssign" className={isActive('/UserStoryAssign') ? 'active' : '' }>
//          Assign UserStory
//         </NavDropdown.Item>
//         {/* Add more options as needed */}
//       </NavDropdown>





//       {/* <Nav.Link as={NavLink} to="/TeamRoasterForm" className={isActive('/TeamRoasterForm') ? 'active' : ''}>
//         TeamRoasterForm
//       </Nav.Link> */}

//       <Nav.Link as={NavLink} to="/TaskForm" className={isActive('/TaskForm') ? 'active' : ''}>
//         TaskForm
//       </Nav.Link>

//       <Nav.Link as={NavLink} to="/login" className={isActive('/login') ? 'active' : ''}>
//         Login
//       </Nav.Link>
//       <Nav.Link as={NavLink} to="/signup" className={isActive('/signup') ? 'active' : ''}>
//         Sign Up
//       </Nav.Link>


//     </Nav>
//   </Navbar>
//   );
// };

// export default NavBar;
// // NavBar.js



// {private route}

import React from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import useAuth to access authentication state
import { Row, Col, Image } from 'react-bootstrap';
// import { signOut, isAuthenticated } from '../auth';


const NavBar = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth(); // Access isAuthenticated state and logout function

  const isActive = (path) => {
    // Check if the current location matches the given path
    return location.pathname === path;
  };

  const { user } = useAuth();

  return (
    <Navbar bg="dark" variant="dark" className="justify-content-center">
      <Navbar.Brand as={NavLink} to="/" exact activeClassName="active">
        PMT
      </Navbar.Brand>
      <Nav className={isAuthenticated ? 'ml-auto' : 'mr-auto'} >
        <Nav.Link as={NavLink} to="/" exact activeClassName="active">
          Home
        </Nav.Link>
        {isAuthenticated ? ( // Render different links based on authentication state


          <>

          
        <NavDropdown title="Teams" id="display-projects-dropdown">
          <NavDropdown.Item as={NavLink} to="/TeamForm" className={isActive('/TeamForm') ? 'active' : ''}>
            Create a Team
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/display-teams" className={isActive('/display-teams') ? 'active' : '' }>
            Display List of Teams
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Projects" id="display-projects-dropdown">
          <NavDropdown.Item as={NavLink} to="/ProjectForm" className={isActive('/ProjectForm') ? 'active' : ''}>
            Create a Project
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/display-projects" className={isActive('/display-projects') ? 'active' : '' }>
            Display List of Projects
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="Team Roasters" id="display-projects-dropdown">
          <NavDropdown.Item as={NavLink} to="/TeamRoasterForm" className={isActive('/TeamRoasterForm') ? 'active' : ''}>
            Create Team Roaster
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/DeleteteamMembers" className={isActive('/DeleteteamMembers') ? 'active' : '' }>
            View and Delete Team Members
          </NavDropdown.Item>
        </NavDropdown>

        <NavDropdown title="UserStoryForm" id="display-UserStories-dropdown">
          <NavDropdown.Item as={NavLink} to="/UserStoryForm" className={isActive('/UserStoryForm') ? 'active' : ''}>
            Create User Story
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/DeleteUserStories" className={isActive('/DeleteUserStories') ? 'active' : '' }>
            View and Delete UserStory
          </NavDropdown.Item>
          <NavDropdown.Item as={NavLink} to="/UserStoryAssign" className={isActive('/UserStoryAssign') ? 'active' : '' }>
            Assign UserStory
          </NavDropdown.Item>
        </NavDropdown>
        {/* <Nav.Link as={NavLink} to="/TaskForm" className={isActive('/TaskForm') ? 'active' : ''}>
          TaskForm
        </Nav.Link> */}


        <NavDropdown title='Tasks' id="display-tasks-dropdown">

            <NavDropdown.Item as={NavLink} to="/TaskForm" className={isActive('/TaskForm') ? 'active' : ''}>
              Create a Task
            </NavDropdown.Item>

            <NavDropdown.Item as={NavLink} to="/display-tasks" className={isActive('/display-tasks') ? 'active' : ''}>
              Display tasks
            </NavDropdown.Item>

        </NavDropdown>

        {/* <Nav.Link as={NavLink} to="/login" className={isActive('/login') ? 'active' : ''} onClick={logout}>Log out</Nav.Link> */}
     
        {/* profile page */}
        {/* assign title as username from user  */}
        {/* <Nav.Link as={NavLink} to="/Profile" className={isActive('/Profile') ? 'active' : ''}>
          Profile
        </Nav.Link> */}


        <NavDropdown title='Profile' id="display-projects-dropdown">

          <NavDropdown.Item as={NavLink} to="/Profile" className={isActive('/Profile') ? 'active' : ''}>
           {user.username}
          </NavDropdown.Item>
    
          <NavDropdown.Item as={NavLink} to="/login" className={isActive('/login') ? 'active' : ''} onClick={logout}>
            Logout
          </NavDropdown.Item>

        </NavDropdown>


          
          </>

         
        
        ) : (
          <>
            <Nav.Link as={NavLink} to="/login" className={isActive('/login') ? 'active' : ''}>
              Login
            </Nav.Link>
            <Nav.Link as={NavLink} to="/signup" className={isActive('/signup') ? 'active' : ''}>
              Sign Up
            </Nav.Link>
          </>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
