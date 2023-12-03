import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import { redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

    const {user,logout} = useAuth();

    const handlelogout = () => {
        logout();
        window.location.href = "/login";
        //redirect to login page
    }

  return (
    <Container>
      <h1>My Profile</h1>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Profile Information</Card.Title>
              <Card.Text>
                <strong>Username:</strong> {user.username}
                <br />
                <strong>first Name:</strong> {user.firstname}
                <br />
                <strong>Last Name:</strong> {user.lastname}
                <br />
                {/* Add more user profile information as needed */}
              </Card.Text>
              <Button variant="danger" onClick={handlelogout} >Log out</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          {/* You can add additional profile-related components or information here */}
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
