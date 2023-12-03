import React,{useEffect, useState}from 'react'
import { redirect, useLocation } from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Button,Navbar,Nav, Container} from 'react-bootstrap';
import "./Login.css"
import NavBar from './components/NavBar';
import { Card, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './components/AuthContext';
import { useNavigate } from 'react-router-dom';



function Home() {

    const location = useLocation();
    const username = location.state?.username;
    const [projects, setProjects] = React.useState([]);
    const [showMoreMap, setShowMoreMap] = React.useState({});
    const [userData, setUserData] = useState([]);
    const [allTeams, setAllTeams] = useState([]);
    const [teamRosters, setTeamRosters] = useState([]);
    const [userStories, setUserStories] = useState([]);
    const [assignedUserStories, setAssignedUserStories] = useState([]);
    const [tasks, setTasks] = useState([]);
    const statusOptions = ['Pending', 'To Do', 'In Progress', 'In Test', 'In Review', 'Done'];




    const user = JSON.parse(localStorage.getItem('user'));

    // const userId = user._id;

    const navigate = useNavigate();

//     useEffect(() => {
//       axios
//         .get('http://localhost:5000/getProjects')
//         .then(function (response) {
//           const projectData = response.data;
//           setProjects(projectData);
//           // console.log(user)
//         })
//         .catch(function (error) {
//           console.log(error);
//         });
       
//     }, []);


//     useEffect(() => {

//       axios.get('http://localhost:5000/ListUsers')
//         .then(function (response) {
//           const userData = response.data;
//           setUserData(userData);
//         })
//         .catch(function (error) {
//           console.log(error);
//         }
//         )
//     }, []);

    useEffect(() => {
      axios.get('http://localhost:5000/getTeams')
      .then(function (response) {
        const allTeams = response.data;
        // console.log(allTeams)
        setAllTeams(allTeams);
      }
      )
      .catch(function (error) {
        console.log(error);
      }
      )
    }, []);

  // console.log(allTeams)


    // useEffect(() => {
    //   axios
    //     .get('http://localhost:5000/getTeamRoasters')
    //     .then(function (response) {
  
    //       const teamRosterData = response.data;
    //       setTeamRosters(teamRosterData);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });
    //   }
    //   , []);
// console.log(teamRosters)

//       useEffect(() => {
//         // console.log(selectedProject)
//         axios.get('http://localhost:5000/getUserStories')
//         .then(function (response) {
//           const userStoriesData = response.data;
//             setUserStories(userStoriesData);
//             console.log(userStoriesData)
//         }
//         )
//         .catch(function (error) {
//             console.log(error);
//             }
//         )
// }, []); 



// useEffect(() => {
//   axios.get(`http://localhost:5000/getAssignedUserStories/${userId}`)
//     .then(function (response) {
//       const assignedUserStoriesData = response.data;
//       setAssignedUserStories(assignedUserStoriesData);
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// }, []);


// useEffect(() => {
//   axios
//       .get(`http://localhost:5000/getTasks/${userId}`)
//       .then(function (response) {
//       const taskData = response.data;
//       setTasks(taskData);
//       })
//       .catch(function (error) {
//       console.log(error);
//       });
//   }, [userId]);




useEffect(() => {
  const fetchData = async () => {

    try {
      const [projectsResponse, teamRostersResponse, userStoriesResponse] = await Promise.all([
        axios.get('http://localhost:5000/getProjects'),
        axios.get('http://localhost:5000/getTeamRoasters'),
        axios.get('http://localhost:5000/getUserStories'),
      ]);

      const projectsData = await projectsResponse.data;
      const teamRostersData = await teamRostersResponse.data;
      const userStoriesData = await userStoriesResponse.data;
   

      if (!projectsData || !teamRostersData || !userStoriesData ) {
        return;
      }

      setProjects(projectsData);
      setTeamRosters(teamRostersData);
      console.log(teamRosters)
      setUserStories(userStoriesData);
  
     
    } catch (error) {
      console.error(error);
      // Handle errors here
    }
  };

  fetchData();
}, []);



const handleProjectClick = (projectId) => () => {
  navigate(`/display-project/${projectId}`);

}

const handleTeamClick = (teamId) => () => {
  navigate(`/display-team/${teamId}`);
  // navigate(`/team/${teamId}`);
}

const handleUserstoryClick = (userStoryId) => () => {
  navigate(`/display-userstory/${userStoryId}`);
  
}

const handleTaskClick = (taskId) => () => { 
  navigate(`/display-task/${taskId}`);
}

const handleLogin = () => {
  navigate('/login');
}

const fetchUserData = async () => {
  try {
    const userId = user._id;

    const [assignedUserStoriesResponse, tasksResponse] = await Promise.all([
      axios.get(`http://localhost:5000/getAssignedUserStories/${userId}`),
      axios.get(`http://localhost:5000/getTasks/${userId}`)
    ]);

    const assignedUserStoriesData = assignedUserStoriesResponse.data;
    const tasksData = tasksResponse.data;

    setAssignedUserStories(assignedUserStoriesData);
    setTasks(tasksData);
  } catch (error) {
    console.error(error);
    // Handle errors here
  }
};

useEffect(() => {
  if (user) {
    fetchUserData();
  }
}, []);




// console.log(tasks)


// useEffect(() => {
//   axios.get('http://localhost:5000/getTasks')
//   .then(function (response) {
//     const taskData = response.data;
//     console.log(taskData)
//   }
//   )
//   .catch(function (error) {
//     console.log(error);
//   }
//   )
// }, []);



if (user) {

const userId = user._id;

const userProjects = projects.filter(project => (
  project.product_owner_id === user._id || project.manager_id === user._id
));

// const filteredTeamRosters = teamRosters ? teamRosters.filter((teamRoster) => {
//   if (teamRoster.members === undefined || !Array.isArray(teamRoster.members)) {
//     return false;
//   }
//   return teamRoster.members.some(member => member._id === user._id);
// }) : [];


const filteredTeamRosters = teamRosters ? teamRosters.filter((teamRoster) => {
  if (teamRoster.members === undefined || !Array.isArray(teamRoster.members)) {
    return false;
  }
  return teamRoster.members.some(member => member._id === user._id);
}) : [];


  return (
    <Container className='mt-5'>
      {/* ... (rest of the code for authenticated user) */}

    {/* <h1>Home</h1> */}

    <Row>

      <Col>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Your Projects</th>
          </tr>
        </thead>
        <tbody>
          {userProjects.map((project) => (
            <tr>
              <td onClick={handleProjectClick(project._id)}>{project.projectname}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
    
      
      </Col>

      <Col>


      <table class="table table-striped">

        <thead>
          <tr>
            <th scope="col">Your Team Name</th>
          </tr>
        </thead>

        <tbody>
          {filteredTeamRosters.map((t) => (
            <tr>
              <td onClick={handleTeamClick(t.teamId)}>{t.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>


      </Col>
  </Row>

  <Row>

    <Col>

    <table class="table table-striped">

        <thead>
          <tr>
            <th scope="col">Assigned UserStory</th>
          </tr>
        </thead>

        <tbody>
          {assignedUserStories.map((userStory) => (
            <tr>
              <td onClick={handleUserstoryClick(userStory.user_story_id)}>{userStory.user_story_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Col>

    <Col>


    <table class="table table-striped">

        <thead>
          <tr>
            <th scope="col">Task Name</th>
          </tr>
        </thead>

{/* {

          tasks.map((task) => (
            <tbody key={task._id}>
              <tr>
                <td onClick={handleTaskClick(task._id)}>{task.task}</td>
              </tr>
            </tbody>
          ))  


        } */}        

<tbody>
  {tasks.map((t) => (
    <tr key={t._id}>
      {t.task && (
        <td onClick={handleTaskClick(t._id)}>{t.task}</td>
      )}
    </tr>
  ))}
</tbody>

      </table>

    </Col>

  </Row>








    </Container>
  );
} else {
  return (
    <Container className='mt-5'>
      {/* ... (rest of the code for non-authenticated user) */}

      <Row>

      <Col>

      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">All Projects</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr>
              <td onClick={handleProjectClick(project._id)}>{project.projectname}</td>
            </tr>
          ))}
        </tbody>
      </table>
        
    
      
      </Col>

      <Col>


      <table class="table table-striped">

        <thead>
          <tr>
            <th scope="col">All Teams</th>
          </tr>
        </thead>

        <tbody>
          {allTeams.map((t) => (
            <tr>
              <td onClick={handleLogin}>{t.team_name}</td>
            </tr>
          ))}
        </tbody>
      </table>


      </Col>
  </Row>

  <Row>

    <Col>

    <table class="table table-striped">

        <thead>
          <tr>
            <th scope="col">All UserStories</th>
          </tr>
        </thead>

        <tbody>
          {userStories.map((userStory) => (
            <tr>
              <td onClick={handleLogin}>{userStory.user_story_name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </Col>


  </Row>
    </Container>
  );
}
}

export default Home