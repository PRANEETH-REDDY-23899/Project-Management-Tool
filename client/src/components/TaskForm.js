import React, {useEffect, useState} from 'react'
import {Form, Button, Container, Row, Col,Card} from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from './AuthContext';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function TaskForm() {

    const navigate = useNavigate();
  
    const [task, setTask] = useState('');
    const [selectedUserStory, setSelectedUserStory] = useState('');
    const [createdBy, setCreatedBy] = useState('');
    const [status, setStatus] = useState('');
    const [users, setUsers] = useState([]); // this is the list of users that will be displayed in the dropdown menu
    const [userStories, setUserStories] = useState([]); // this is the list of teams that will be displayed in the dropdown menu
  
    // You can populate the user story and created by dropdowns with static data as needed
    // const userStories = ['User Story 1', 'User Story 2', 'User Story 3'];
    // const users = ['User 1', 'User 2', 'User 3'];
  
    const statusOptions = ['Pending', 'To Do', 'In Progress', 'In Test', 'In Review', 'Done'];
    // const { user } = useAuth();

    // get user from local storage
    const user = JSON.parse(localStorage.getItem('user'));

    const userId = user._id;

    const [tasks, setTasks] = useState([]);
    // const [showMoreMap, setShowMoreMap] = useState({});


  
    const handleSubmit = (e) => {
      e.preventDefault();


      // I want to check whether all the fields were filled out before submitting the form
      if (task === '' || selectedUserStory === ''|| status === '') {
        alert("Please fill out all the fields");
        return;
      }
      




  
      // Handle form submission here (e.g., send data to an API)

      axios.post('http://localhost:5000/taskCreation', {
        task: task,
        user_story_id:selectedUserStory,
        created_by: userId,
        status: status
      })
      .then(function (response) {
        console.log(response);
        alert("Task Created Successfully");
        navigate('/display-tasks');
      })
      .catch(function (error) {
        console.log(error);
      });

      // Clear form fields
      setTask('');
      setSelectedUserStory('');
      setCreatedBy('');
      setStatus('');
    };



     useEffect(() => {

      axios.get('http://localhost:5000/getTaskList') 
      .then(function (response) {

        const taskData = response.data;
        setTasks(taskData);
      })
      .catch(function (error) {
        console.log(error);
      });

      // axios.get('http://localhost:5000/ListUsers')
      // .then(function (response) {
      //   const userData = response.data;
      //   setUsers(userData);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

      axios.get(`http://localhost:5000/userStoriesByUserId/${userId}`)
      .then(function (response) {
        const userStoryData = response.data;
        setUserStories(userStoryData);
      })
      .catch(function (error) {
        console.log(error);
      });

    }, []);



        
  
    return (
      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>Create a New Task</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="task">
                <Form.Label>Task</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </Form.Group>
  
              <Form.Group controlId="selectUserStory">
                <Form.Label className='mt-3'>Select User Story</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedUserStory}
                  onChange={(e) => setSelectedUserStory(e.target.value)}
                >
                  <option value="">Select a user story</option>
                  {userStories.map((userStory) => (
                    <option value={userStory.user_story_id}>
                      {userStory.user_story_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
  
              {/* <Form.Group controlId="selectCreatedBy">
                <Form.Label className='mt-3'>Created by</Form.Label>
                <Form.Control
                  as="select"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                >
                  <option value="">{user.username}</option>
                  {users.map((user) => (
                    <option  value={user._id}>
                      {user.firstname} {user.lastname}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group> */}

              {/* {user.username} */}
  
              <Form.Group controlId="selectStatus">
                <Form.Label className='mt-3'>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Select a status</option>
                  {statusOptions.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
  
              <Button  className='mt-3 mx-auto d-block' variant="primary" type="submit">
                Create Task
              </Button>
            </Form>
          </Col>


        </Row>
      </Container>
  )
}

export default TaskForm