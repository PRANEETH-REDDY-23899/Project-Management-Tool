import React from 'react'
import { Container } from 'react-bootstrap';
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { Form,Button } from 'react-bootstrap';









function DisplayTasks() {
const [tasks, setTasks] = useState([]);
const [userStories, setUserStories] = useState([]);
const [selectedUserStory, setSelectedUserStory] = useState('');
const [status, setStatus] = useState('');
const statusOptions = ['Pending', 'To Do', 'In Progress', 'In Test', 'In Review', 'Done'];


// const {user} = useAuth();

const user = JSON.parse(localStorage.getItem('user'));

const userId = user._id;




const handleStatusChange = (taskId, status) => {

    axios.post('http://localhost:5000/taskupdation', {
    task_id: taskId,
    status: status
    })
    .then(function (response) {
    console.log(response);
    alert(`Status of task ${taskId} updated to: ${status}`);
      
    // refresh the page
    window.location.reload();
    }
    )
    .catch(function (error) {
    console.log(error);
    }
    );

};




useEffect(() => {
    axios
        .get(`http://localhost:5000/getTasks/${userId}`)
        .then(function (response) {
        const taskData = response.data;
        setTasks(taskData);
        })
        .catch(function (error) {
        console.log(error);
        });
    }, []);




    useEffect(() => {

        // axios.get('http://localhost:5000/getTaskList') 
        // .then(function (response) {
  
        //   const taskData = response.data;
        //   setTasks(taskData);
        // })
        // .catch(function (error) {
        //   console.log(error);
        // });
  
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
<Container>
        <table className="table table-striped mt-3">
        <thead>
            <tr>
                <th scope="col">Project Name</th>
                <th scope="col">User Story</th>
                <th scope="col">Task Description</th>
                <th scope="col">Task Status</th> 
                <th scope="col">Priority</th>
                <th scope="col">User</th>      
            </tr>
        </thead>

        {tasks.map((task) => (
            <tbody key={task._id}>
                <tr>
                    <td>{task.project_name}</td>
                    <td>{task.user_story_name}</td>
                    <td>{task.task}</td>
                    <td>{

                       <Form.Group controlId="selectStatus">

                            <Form.Control
                              as="select"
                              value={task.status}

                              onChange={(e) => handleStatusChange(task._id, e.target.value)}
                              
                            >
                              <option value="">Select a status to update</option>
                              {statusOptions.map((option, index) => (
                                <option key={index} value={option}>
                                  {option}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
                    
                  
                    
                    }</td>
                    <td>{task.priority}</td>
                    <td>{task.user_name}</td>
                </tr>
            </tbody>
        ))
        }
        <tbody>

        </tbody>
    </table>

    </Container>
      
   
  )
}

export default DisplayTasks