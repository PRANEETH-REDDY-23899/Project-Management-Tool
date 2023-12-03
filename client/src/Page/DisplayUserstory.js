import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function DisplayUserstory() {
  const { userStoryId } = useParams();
  const [userStory, setUserStory] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/userStoriesByUserStoryId/${userStoryId}`)
      .then(function (response) {
        const userStoryData = response.data;
        setUserStory(userStoryData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userStoryId]);

  return (
    <Container>
      <Row className='mt-4'>
        <Col>
          {userStory && (

            userStory.map((userStory) => (
            <Card className = 'mt-3' >
              <Card.Header>User Story Details</Card.Header>
              <Card.Body>
                <Card.Title>{userStory.user_story_name}</Card.Title>
                <Card.Text>
                  <strong>Priority:</strong> {userStory.priority}
                </Card.Text>
                <Card.Text>
                  <strong>Project Name:</strong> {userStory.project_name}
                </Card.Text>
                <Card.Text>
                  <strong>User:</strong> {userStory.user_name}
                </Card.Text>
                {/* Add more card content based on your user story data */}
              </Card.Body>
            </Card>

            ))
          )}

        <Button variant='primary' href='/UserStoryAssign' className='mt-2'>View all Assigned Userstories</Button>
        <Button variant='secondary' href='/UserStoryForm' className='mt-2'>Create New UserStory</Button>

    
        </Col>
      </Row>
    </Container>
  );
}

export default DisplayUserstory;
