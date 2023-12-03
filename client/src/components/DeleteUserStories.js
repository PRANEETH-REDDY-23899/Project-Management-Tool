import React,{useEffect, useState}  from 'react'
import { Container } from 'react-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';



function DeleteUserStories() {


    const [userStories, setUserStories] = useState([]);
    const [selectedUserStory, setSelectedUserStory] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [projects, setProjects] = useState([]); // this is the list of teams that will be displayed in the dropdown menu
    const [selectedProjects, setSelectedProjects] = useState([]); // this is the list of users that will be displayed in the dropdown menu
    // const[localUser, setLocalUser] = useState(JSON.parse(localStorage.getItem('user'))); // this is the list of users that will be displayed in the dropdown menu


    const filteredUserStories = userStories.filter(userStory => userStory.project_id === selectedProject);



    // const handleProjects = (selectedProject) => {
    //     // setSelectedProject(selectedProject);

    //     axios.get(`http://localhost:5000/userStories/${selectedProject}`)
    //     .then(function (response) {
    //       const userStoriesData = response.data;
    //         // console.log(userStoriesData);
    //         setSelectedProjects(userStoriesData);
    //     }
    //     )
    //     .catch(function (error) {
    //         console.log(error);
    //         }
    //     )
    //     }

    // const handleUserStoryAssignment = (userStoryId,user) => {

    //     return (e) => { 
    //         e.preventDefault();

    //         if (user === null) {
    //             alert('Please Login to Assign Yourself to a User Story')
    //         }
    //         console.log(userStoryId,user._id)
        


    //         axios.post(`http://localhost:5000/assignUserStory`, {
    //           user_story_id: userStoryId,
    //             user_id: user._id
    //         })
    //         .then(function (response) {
    //           console.log(response);
    //           const updatedUserStories = [...userStories];
    //           setUserStories(updatedUserStories);
    //         })
    //         .catch(function (error) {
    //           console.error(error);
    //         });
    //     }
    // };





    const handleUserStoryDeletion = (userStoryId) => {
        return (e) => {
          e.preventDefault();
          axios.delete(`http://localhost:5000/deleteUserStory/${userStoryId}`)
            .then(function (response) {
              // console.log(response);
              const updatedUserStories = [...userStories];
              setUserStories(updatedUserStories);
              window.location.reload();
            })
            .catch(function (error) {
              console.error(error);
            });
        }
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
      
    
    useEffect(() => {
        // console.log(selectedProject)
        axios.get('http://localhost:5000/getUserStories')
        .then(function (response) {
          const userStoriesData = response.data;
            // console.log(userStoriesData);
            console.log(userProjects)
            const filteredUserStories = userStoriesData.filter(userStory => (
              userProjects.some(project => project._id === userStory.project_id)
            ));

            // console.log(filteredUserStories)
      
            // setUserStories(filteredUserStories);
            // setProjects(filteredUserStories)



            setUserStories(userStoriesData);
            setProjects(userStoriesData);
            // console.log(localUser)
        }
        )
        .catch(function (error) {
            console.log(error);
            }
        )

        // if (filteredUserStories.length === 0) {
        //     setSelectedProject(''); 
        //   }


    // axios.get('http://localhost:5000/userStories/${selectedProject}')
    // .then(function (response) {
    //   const userStoriesData = response.data;
    //     console.log(userStoriesData);
    //     setSelectedProjects(userStoriesData);
    // }
    // )
    // .catch(function (error) {
    //     console.log(error);
    //     }
    // )

    
  
    }, []); // Empty dependency array to run this effect only once



// useEffect(() => {

//     const handleUserStoryDeletion = (userStoryId) => {
//         return (e) => {
//           e.preventDefault();
//           axios.delete(`http://localhost:5000/deleteUserStory/${userStoryId}`)
//             .then(function (response) {
//               console.log(response);
//               const updatedUserStories = [...userStories];
//               setUserStories(updatedUserStories);
//             })
//             .catch(function (error) {
//               console.error(error);
//             });
//         }
//       };

// }, [userStories]);



const user = JSON.parse(localStorage.getItem('user'));

const userProjects = projects.filter(project => (
  project.product_owner_id === user._id || project.manager_id === user._id
));

console.log(userProjects)
// console.log(filteredUserStories)

const handleProjects = (e) => {
  setSelectedProject(e.target.value);
};


// filter user stories based on userprojects

const AllfilteredUserStories = userStories.filter(userStory => (
  userProjects.some(project => project._id === userStory.project_id)
));




  return (

    <Container>
        <h1>View and Delete Your Project UserStories</h1>


        <Form>
              <Form.Group controlId="selectTeam">
                <Form.Label className='mt-3'>Filter User Stories by Your Projects</Form.Label>

                {/* <Form.Control
                            as="select"
                            value={selectedProject}
                            onChange={handleProjects}
                          >
                            <option value="">All</option>
                            {projects
                              .filter(
                                (project) =>
                                  project.product_owner_id === user._id ||
                                  project.manager_id === user._id
                              )
                              .map((project) => (
                                <option key={project._id} value={project._id}>
                                  {project.project_name}
                                </option>
                              ))}
                          </Form.Control> */}


                <Form.Control
                  as="select"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                >
                


               
                <option value="">All</option>
                {userProjects.map((story) => (
                    <option key={story._id} value={story._id} onChange={(e)=>{setSelectedProject(e.target.value)}} >
                      {story.projectname}
                    
                    </option>
                    ))
                    }
                </Form.Control>
              </Form.Group>

              {/* <Button variant="primary" type="submit" onClick={handleProjects(selectedProject)} className="mt-2">
                Refresh
             </Button> */}

           </Form>   

        

        <table className="table table-striped  mt-5">
            <thead>
                <tr >
                    <th>User Story Name</th>
                    <th>Project Name</th>
                    <th>Priority</th>
                    {/* <th>Assign</th> */}
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>

              

          {selectedProject === '' ? (

          AllfilteredUserStories.map((userStory, index) => (
                                <tr key={userStory._id}>
                                  <td>{userStory.user_story_name}</td>
                                  <td>{userStory.project_name}</td>
                                  <td>{userStory.priority}</td>
                                  {/* <td>
                                    <button
                                      className="btn btn-primary"
                                      // onClick={handleUserStoryDeletion(userStory._id)}

                                      onClick={handleUserStoryAssignment(userStory._id, localUser)}


                                      // assign from local storage


                                    >
                                      Assign to Yourself
                                    </button>
                                  </td> */}
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={handleUserStoryDeletion(userStory._id)}
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              filteredUserStories.map((userStory, index) => (
                                <tr key={userStory._id}>
                                  <td>{userStory.user_story_name}</td>
                                  <td>{userStory.project_name}</td>
                                  <td>{userStory.priority}</td>
                                  <td>
                                    <button
                                      className="btn btn-danger"
                                      onClick={handleUserStoryDeletion(userStory._id)}
                                    >
                                      Delete
                                    </button>

                                  </td>
                                </tr>
                              ))
                            )}
                {/* {userStories.map((userStory, index) => (
                    <tr key={userStory._id}>
                        <td>{userStory.user_story_name}</td>
                        <td>{userStory.project_name}</td>
                        <td>{userStory.priority}</td>
                        <td><button className="btn btn-danger" onClick={handleUserStoryDeletion(userStory._id)}>Delete</button></td>
                    </tr>
                ))} */}
            </tbody>

        </table>
    </Container>
  )
}

export default DeleteUserStories
