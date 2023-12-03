import React, {useEffect, useState} from 'react'
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap';
import axios from 'axios';
import { redirect } from 'react-router-dom';



function TeamForm() {

    const [teamName, setTeamName] = useState('');
    const [teams, setTeams] = useState([]);





    const handleSubmit = (e) => {
      e.preventDefault();

      // I want to check whether all the fields were filled out before submitting the form
      if (teamName === '') {
        alert("Please fill out all the fields");
        return;
      }
      

      axios.post('http://localhost:5000/teamCreation', {
        team_name: teamName,
      })

      .then(function (response) {
        // console.log(response);
        redirect('/TeamRoasterForm');
        alert("Team Created Successfully");
        
        // redirect(');
      })
      .catch(function (error) {

        console.log(error);
      });

      setTeamName('');
    }
    

    useEffect(() => {
      axios
        .get('http://localhost:5000/getTeams')
        .then(function (response) {
          const teamData = response.data;
          setTeams(teamData);
        })
        .catch(function (error) {
          console.log(error);
        });
      }, []);


  
      // Handle form submission here (e.g., send data to an API)
  
      // Clear the team name input field
    
  return (

      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>Create a New Team</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="teamName">
                <Form.Label className='mt-3'>Team Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter team name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </Form.Group>
  
              <Button  variant="primary" type="submit" className=" mt-3 mx-auto d-block">
                Create Team
              </Button>
            </Form>
          </Col>
        </Row>
 

      {/* <h4 className='mt-10'>Existing Team List :</h4>  */}
      {/* <Row>
      {teams.map((teams) => (
      <Col key={teams._id}>
        <Card>
          <Card.Body>
            <Card.Title>Team Name: {teams.team_name}</Card.Title>

          </Card.Body>
        </Card>
      </Col>
    ))}
</Row> */}
      </Container>
  )
}

export default TeamForm