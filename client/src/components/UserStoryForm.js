import React, {useState, useEffect} from 'react'
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import { set } from 'mongoose';

function UserStoryForm() {

  const [userStory, setUserStory] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [priority, setPriority] = useState('');

  // You can populate the project dropdown with static data as needed
  // const projects = ['Project 1', 'Project 2', 'Project 3'];

  const [userStories, setUserStories] = useState([]);
  const [showMoreMap, setShowMoreMap] = useState({});
  const [allProjects, setAllProjects] = useState([]);


  const toggleShowMore = (projectId) => {
    setShowMoreMap((prevShowMoreMap) => ({
      ...prevShowMoreMap,
      [projectId]: !prevShowMoreMap[projectId],
    }));
  };



  const handleUserStoryDeletion = (userStoryId) => {
    return (e) => {
      e.preventDefault();
      axios.delete(`http://localhost:5000/deleteUserStory/${userStoryId}`)
        .then(function (response) {
          console.log(response);
          const updatedUserStories = [...userStories];
          setUserStories(updatedUserStories);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };



  const handleSubmit = (e) => {
    e.preventDefault();

    // I want to check whether all the fields were filled out before submitting the form

    if (userStory === '' || selectedProject === '') {
      alert("Please fill out all the fields");
      return;
    }

    if (priority === '') {

      alert("Are you sure you want to give priority 0?")
      setPriority(0);
      return;
    }

    

    axios.post('http://localhost:5000/userStoryCreation', {
      user_story_name: userStory,
      project_id: selectedProject,
      priority: priority
    })
    .then(function (response) {
      console.log(response);
      alert("User Story Created Successfully");
    })
    .catch(function (error) {
      console.log(error);
    });
    setUserStory('');
    setSelectedProject('');
    setPriority('');
    };

    useEffect(() => {
        axios
        .get('http://localhost:5000/getProjects')
        .then(function (response) {
          const projectData = response.data;
          setAllProjects(projectData);
        })
        .catch(function (error) {
          console.log(error);
        });

    }, []);

    useEffect(() => {
      axios.get('http://localhost:5000/getUserStories')
      .then(function (response) {
        const userStoryData = response.data;
        console.log(userProjects);
        const filteredUserStories = userStoryData.filter(userStory => (
          userProjects.some(project => project._id === userStory.project_id)
        ));
  
        setUserStories(filteredUserStories);
        // setUserStories(userStoryData);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, [userStories]);


    const user = JSON.parse(localStorage.getItem('user'));

    const userProjects = allProjects.filter(project => (
        project.product_owner_id === user._id || project.manager_id === user._id
      ));




    // Handle form submission here (e.g., send data to an API)

    // Clear form fields
 

  return (
    <Container className='mt-5'>
      <Row>
        <Col>
          <h2>Create a New User Story</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="userStory">
              <Form.Label className='mt-3'>User Story</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter user story"
                value={userStory}
                onChange={(e) => setUserStory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="selectProject">
              <Form.Label className='mt-3'>Select Project</Form.Label>
              <Form.Control
                as="select"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
              >
                <option value="">Select a project</option>

                {userProjects.map((project) => (
                  <option  value={project._id}>
                    {project.projectname}
                  </option>
                ))}

                {/* {projects.map((project, index) => (
                  <option key={index} value={project}>
                    {project}
                  </option>
                ))} */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="priority">
              <Form.Label className='mt-3'>Priority</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              />
            </Form.Group>

            <Button className='mt-3 mx-auto d-block' variant="primary" type="submit">
              Create User Story
            </Button>
          </Form>
        </Col>

  
  <h4 className='mt-2 ml-6'> Existing User Stories: </h4>
  <div style={{ maxHeight: '400px', overflowY: 'auto' }} className = "mt-3">
  <Row xs={1} sm={2} md={3} lg={4} xl={3}>
    {userStories.map((userStories) => (
      <Col key={userStories._id} className='mt-2'>
        <Card>
          <Card.Body>
            <Card.Title>userStory Name : {userStories.user_story_name}</Card.Title>
            <Card.Text>
              Project Name: {userStories.project_name}
            </Card.Text>
            <Card.Text>
              Priority Given: {userStories.priority}
            </Card.Text>

            <Button variant="danger" onClick={handleUserStoryDeletion(userStories._id)}>Delete UserStory</Button>
          
            {/* Display other project details as needed */}
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</div>
      </Row>



    </Container>
  )
}

export default UserStoryForm