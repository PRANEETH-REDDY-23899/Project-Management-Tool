import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card , Button } from 'react-bootstrap';
import axios from 'axios';

const DisplayProject = ( ) => {
  const { projectId } = useParams();
  const [project, setProject] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/getProject/${projectId}`)
      .then(function (response) {
        const projectData = response.data;
        setProject(projectData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  if (!project.length) {
    return <p>Loading...</p>;
  }



const renderProjectDetails = (label, value) => (
    <Row className="mb-2">
      <Col xs={4} className="fw-bold">{label}:</Col>
      <Col>{value}</Col>
    </Row>
);

  return (
    <Container className="mt-5">
      {project.map((p) => (
        <Card key={p._id} className="mb-3">
          <Card.Body>
            <Card.Title>{p.projectname}</Card.Title>
            {renderProjectDetails('Project Description', p.project_description)}
            {renderProjectDetails('Product Owner', p.product_owner)}
            {renderProjectDetails('Manager', p.manager)}
            {renderProjectDetails('Team', p.team)}
          </Card.Body>
        </Card>
      ))}
    <Button variant='primary' href='/display-projects' className='mt-2'>View all Projects</Button>
    <Button variant='secondary' href='/ProjectForm' className='mt-2'>Create New Project</Button>
    </Container>
  );
};

export default DisplayProject;
