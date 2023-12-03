// import React, { useEffect , useState} from 'react'
// import { Container } from 'react-bootstrap'
// import { Form, Button, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
// import Select from 'react-select';
// import { useParams } from 'react-router-dom';


// function AssignUserStory() {

// const [allUserStories, setAllUserStories] = useState([]);
// const [assignedUserStories, setAssignedUserStories] = useState([]);
// const [unassignedUserStories, setUnassignedUserStories] = useState([]);
// const [state, setState] = useState(['allUserStories']);

// const availableState = ['allUserStories', 'assignedUserStories', 'unassignedUserStories'];









// useEffect(() => {

//     axios.get(`http://localhost:5000/getUserStories`)
//     .then(function (response) {
//         const userStoriesData = response.data;
//         setAllUserStories(userStoriesData);
//         // console.log(allUserStories)
//     })
//     .catch(function (error) {
//         console.log(error);
//         }
//     )
// }
// , []);

// useEffect(() => {

//     axios.get(`http://localhost:5000/getAssignedUserStories`)
//     .then(function (response) {
//         const assignedUserStories = response.data;
//         setAssignedUserStories(assignedUserStories);
//         console.log(assignedUserStories)
       
//     })
//     .catch(function (error) {
//         console.log(error);
//         }
//     )
// }
// , []);




// const filterunassgnied = allUserStories.filter((userStory) => {
//     return !assignedUserStories.includes(userStory);
// });




//   return (

//     //contairner
//     <Container>
//         <h1>Assign User Story</h1>
//         {/* filter user stories based on all, assigned, unassigned */}
//         <Form.Group controlId="selectTeam">
//                 <Form.Label className='mt-3'>Filter User Stories by Assignment</Form.Label>
//                 <Form.Control
//                   as="select"
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                 >
//                   {/* <option value="">Select a team</option> */}


//                 {/* {teamRoasters.map((team) => (
//                     <option key={team.teamId} value={team.teamId} >
//                       {team.team_name}
//                     </option>
//                     ))} */}
//                 {availableState.map((option) => (
//                     <option value={option} onChange={(e)=>{setState(option)}}>
//                       {option}
//                     </option>
//                     ))
//                     }
            
//                 </Form.Control>
//               </Form.Group>


//         {/* display user stories based on filter */}

//         <table className="table table-striped  mt-5">
//             <thead>
//                 <tr >
//                     <th>User Story Name</th>
//                     <th>Project Name</th>
//                     <th>Priority</th>
//                 </tr>
//             </thead>
//             <tbody>

//                 {/* if (state === 'allUserStories') {

//                     {allUserStories.map((userStory, index) => (
//                         <tr key={userStory._id}>
//                           <td>{userStory.user_story_name}</td>
//                           <td>{userStory.project_name}</td>
//                           <td>{userStory.priority}</td>
//                         </tr>
//                       ))}
//                 }

//                 if (state === 'assignedUserStories') {

//                     {assignedUserStories.map((userStory, index) => (
//                         <tr key={userStory._id}>
//                           <td>{userStory.user_story_name}</td>
//                           <td>{userStory.project_name}</td>
//                           <td>{userStory.priority}</td>
//                         </tr>
//                       ))}
//                 }

//                 if (state === 'unassignedUserStories') {

//                     {unassignedUserStories.map((userStory, index) => (
//                         <tr key={userStory._id}>
//                           <td>{userStory.user_story_name}</td>
//                           <td>{userStory.project_name}</td>
//                           <td>{userStory.priority}</td>
//                         </tr>
//                       ))}
//                 }
//                  */}
                
//             </tbody>
//         </table>


//     </Container>




    
//   )
// }

// export default AssignUserStory


import React, { useEffect, useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function AssignUserStory() {
  const navigate = useNavigate();
  const [allUserStories, setAllUserStories] = useState([]);
  const [assignedUserStories, setAssignedUserStories] = useState([]);
  const [unassignedUserStories, setUnassignedUserStories] = useState([]);
  const [state, setState] = useState('allUserStories');
  const [projects, setProjects] = useState([]);

  const availableState = ['allUserStories', 'assignedUserStories', 'unassignedUserStories'];


  // const { user } = useAuth();

  const user = JSON.parse(localStorage.getItem('user'));

  const userId = user._id;



    const handleCreateTaskClick = () => {
      navigate('/TaskForm'); // Navigate to the CreateTask page
    };

  const handleDeleteAssign = (userStoryId) => {
    // console.log
    axios.delete(`http://localhost:5000/deleteAssignedUserStory/${userStoryId}`)
      .then(function (response) {
        // After successful assignment, update the assignedUserStories state
        // console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
  };



  const handleUserStoryAssignment = (userStoryId,user) => {

    return (e) => { 
        e.preventDefault();

        if (user === null) {
            alert('Please Login to Assign Yourself to a User Story')
        }
        console.log(userStoryId,user._id)
        axios.post(`http://localhost:5000/assignUserStory`, {
          user_story_id: userStoryId,
            user_id: user._id
        })
        .then(function (response) {

          window.location.reload();

          // console.log(response);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
};

  useEffect(() => {
    axios.get(`http://localhost:5000/getUserStories`)
      .then(function (response) {
        const userStoriesData = response.data;
        setAllUserStories(userStoriesData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5000/getAssignedUserStories/${userId}`)
      .then(function (response) {
        const assignedUserStoriesData = response.data;
        setAssignedUserStories(assignedUserStoriesData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    // Calculate assignedUserStories with project_name and priority from allUserStories
    const updatedAssignedStories = assignedUserStories.map((assignedStory) => {
      // Find the corresponding user story in allUserStories by _id
      const matchingUserStory = allUserStories.find(userStory => userStory._id === assignedStory.user_story_id);
    //   console
      if (matchingUserStory) {
        // Assign project_name and priority from the matching user story
        assignedStory.project_name = matchingUserStory.project_name;
        assignedStory.priority = matchingUserStory.priority;
      }
      return assignedStory;
    });
  
    // setAssignedUserStories(updatedAssignedStories);
    // console.log(unassignedUserStories)

  }, [allUserStories, assignedUserStories]);
  
  

  useEffect(() => {
    // Calculate unassignedUserStories based on allUserStories and assignedUserStories
    const filteredUnassigned = AllfilteredUserStories.filter((userStory) => {
      return !assignedUserStories.some((assigned) => assigned.user_story_id === userStory._id);
    });
    setUnassignedUserStories(filteredUnassigned);
    // console.log(unassignedUserStories)

  }, [allUserStories, assignedUserStories]);



  const handleAssignUserStory = (userStoryId) => {
    axios.post(`http://localhost:5000/assignUserStory/${userStoryId}`)
      .then(function (response) {
        // After successful assignment, update the assignedUserStories state
        const updatedAssignedStories = [...assignedUserStories, userStoryId];
        setAssignedUserStories(updatedAssignedStories);

        // console.log(assignedUserStories)

        // Filter unassigned stories again to remove the assigned story
        const filteredUnassigned = unassignedUserStories.filter((userStory) => userStory._id !== userStoryId);
        setUnassignedUserStories(filteredUnassigned);
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  useEffect(() => {
    axios
    .get('http://localhost:5000/getProjects')
    .then(function (response) {
      const projectData = response.data;
      setProjects(projectData);
      console.log(projects)
    })
    .catch(function (error) {
      console.log(error);
    });
  
  }, []);

  const userProjects = projects.filter(project => (
    project.product_owner_id === user._id || project.manager_id === user._id
  ));

  const AllfilteredUserStories = allUserStories.filter(userStory => (
    userProjects.some(project => project._id === userStory.project_id)
  ));




  return (
    <Container>
      <h1>Assign User Story</h1>
      <Form.Group controlId="selectTeam">
        <Form.Label className="mt-3">Filter User Stories by Assignment</Form.Label>
        <Form.Control
          as="select"
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          {availableState.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <table className="table table-striped mt-5">
        <thead>
          <tr>
            <th>User Story Name</th>
            <th>Project Name</th>
            <th>Priority</th>
            {state === 'unassignedUserStories' && <th>Assign</th>}
          </tr>
        </thead>
        <tbody>
          {/* {state === 'allUserStories' &&
            allUserStories.map((userStory) => (
              
              <tr key={userStory._id}>
                <td>{userStory.user_story_name}</td>
                <td>{userStory.project_name}</td>
                <td>{userStory.priority}</td>
              </tr>
            ))
          } */}

{state === 'allUserStories' &&
      AllfilteredUserStories.map((userStory) => {
        const isAssigned = assignedUserStories.some((assigned) => assigned.user_story_id === userStory._id);
        return (
          <tr key={userStory._id}>
            <td>{userStory.user_story_name}</td>
            <td>{userStory.project_name}</td>
            <td>{userStory.priority}</td>
            <td>{isAssigned ? 'Assigned To you' : 'Unassigned'}</td>
            {state === 'allUserStories' && (
              <td>
                  {isAssigned ? (
                            <div>
                              {/* <Button variant="danger" className="mr-2"  onClick={()=>{handleDeleteAssign(userStory._id)}} >
                                Unassign
                              </Button> */}
                              <Button variant="secondary" onClick={handleCreateTaskClick}>
                                Create Task
                              </Button>
                            </div>
                          ) : (
                            <Button variant="primary" onClick={ handleUserStoryAssignment(userStory._id, user)}>
                              Assign To Yourself
                            </Button>
        )}
              </td>
            )}
          </tr>
        );
      })
    }




          {state === 'assignedUserStories' &&
            assignedUserStories.map((userStory) => (
              <tr key={userStory._id}>
                <td>{userStory.user_story_name}</td>
                <td>{userStory.project_name}</td>
                <td>{userStory.priority}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={()=>{handleDeleteAssign(userStory._id)}}
                  >
                    Un assign
                  </Button>
                </td>
              </tr>
            ))
          }
          {state === 'unassignedUserStories' &&
            unassignedUserStories.map((userStory) => (
              <tr key={userStory._id}>
                <td>{userStory.user_story_name}</td>
                <td>{userStory.project_name}</td>
                <td>{userStory.priority}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={handleUserStoryAssignment(userStory._id,user)}
                  >
                    Assign
                  </Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Container>
  );
}

export default AssignUserStory;
