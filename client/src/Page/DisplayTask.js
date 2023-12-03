import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function DisplayTask() {
  const { taskId } = useParams();
  const [task, setTask] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/tasksByTaskId/${taskId}`)
      .then(function (response) {
        const taskData = response.data;
        setTask(taskData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [taskId]);

  return (
    <Container>
      <Row className='mt-5'>
        <Col>
          {task && (
            <Card>
              <Card.Header>Task Details</Card.Header>
              <Card.Body>
                <Card.Title>{task.task}</Card.Title>
                <Card.Text>
                  <strong>User Story Name:</strong> {task.user_story_name}
                </Card.Text>
                <Card.Text>
                  <strong>Project Name:</strong> {task.project_name}
                </Card.Text>
                <Card.Text>
                  <strong>User:</strong> {task.user_name}
                </Card.Text>
                <Card.Text>
                  <strong>Priority:</strong> {task.priority}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {task.status}
                </Card.Text>
              </Card.Body>

              

            </Card>


          )}

        <Button variant='primary' href='/display-tasks' className='mt-2'>View all Tasks</Button>
        <Button variant='secondary' href='/TaskForm' className='mt-2'>Create New Task</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default DisplayTask;
