import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col,Card } from 'react-bootstrap';
import axios from 'axios';





function ProjectForm() {

    const [projectName, setProjectName] = React.useState('');
    const [projectDescription, setProjectDescription] = React.useState('');
    const [userData, setUserData] = React.useState([]);
    const [productOwner, setProductOwner] = React.useState('');
    const [manager, setManager] = React.useState('');
    const [team, setTeam] = React.useState('');
    const [projects, setProjects] = React.useState([]);
    const [showMoreMap, setShowMoreMap] = React.useState({});
    const [allTeams, setAllTeams] = React.useState([]);

    
    // You can populate these dropdowns with static data as needed
    
    const handleSubmit = (e) => {
      e.preventDefault();

      // I want to check whether all the fields were filled out before submitting the form
      if (projectName === '' || projectDescription === '' || productOwner === '' || manager === '' || team === '') {
        alert("Please fill out all the fields");
        return;
      }



      axios.post('http://localhost:5000/projectCreation', {
        projectname: projectName, 
        projectdescription: projectDescription,
        product_owner_id:productOwner,
        manager_id:manager,
        team_id:team
      })
      .then(function (response) {
        console.log(response);
        alert("Project Created Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });

      // dipslayProjects();



      // Handle form submission here (e.g., send data to an API)

      
    
      // Clear form fields
      setProjectName('');
      setProjectDescription('');
      setProductOwner('');
      setManager('');
      setTeam('');
    };

    const dipslayProjects = () => {
      axios.get('http://localhost:5000/getProjects')
      .then(function (response) {
        console.log(response);
        alert("Project Created Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const getUserName = (userId) => {
      const user = userData.find((user) => user._id === userId);

      if (!user) {
        return 'Unknown';
      }
      return `${user.firstname} ${user.lastname}`;
    };

    const getTeamName = (teamId) => {
      const team = allTeams.find((team) => team._id === teamId);

      if (!team) {
        return 'Unknown Team';
      }
      return `${team.team_name}`;
    };



    const toggleShowMore = (projectId) => {
      setShowMoreMap((prevShowMoreMap) => ({
        ...prevShowMoreMap,
        [projectId]: !prevShowMoreMap[projectId],
      }));
    };
    
    

    // useEffect(() => {
    //   async function fetchProjectsAndSetState() {
    //     try {
    //       const projectData = await dipslayProjects();
    //       setProjects(projectData);
    //     } catch (error) {
    //       // Handle errors, e.g., show an error message
    //     }
    //   }
    
    //   fetchProjectsAndSetState();
    // }, []);

    useEffect(() => {
      axios
        .get('http://localhost:5000/getProjects')
        .then(function (response) {
          const projectData = response.data;
          setProjects(projectData);
        })
        .catch(function (error) {
          console.log(error);
        });

        axios.get('http://localhost:5000/ListUsers')
        .then(function (response) {
          const userData = response.data;
          setUserData(userData);
        })
        .catch(function (error) {
          console.log(error);
        }
        )

        axios.get('http://localhost:5000/getTeams')
        .then(function (response) {
          const allTeams = response.data;
          setAllTeams(allTeams);
        }
        )
        .catch(function (error) {
          console.log(error);
        }
        )

    }, []);

    
    





  return (
    <div>

        <Container className="mt-5">
         <Row>
         <Col>
          <h2>Create a New Project</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="projectName">
              <Form.Label className='mt-3'>Project Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter project name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className='mb-3'
              />
            </Form.Group>

            <Form.Group controlId="projectDescription">
              <Form.Label>Project Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter project description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className='mb-3'
              />
            </Form.Group>

            <Form.Group controlId="productOwner">
              <Form.Label>Product Owner</Form.Label>
              <Form.Control
                as="select"
                value={productOwner}
                onChange={(e) => setProductOwner(e.target.value)}
                className='mb-3'
              >

                {/* Populate with data from the database */}
                {/* map through the userData and didplay the first name and last name of the user in options  */}
                <option value="">Select a product owner</option>
                {userData.map((user) => (
                  <option value={user._id}>{user.firstname} {user.lastname}</option>
                ))}
                {/* <option value="">Select a product owner</option> */}
                {/* Populate with static data */}
        
                {/* Populate with static data */}
                {/* <option value="owner1">Product Owner 1</option>
                <option value="owner2">Product Owner 2</option> */}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="manager">
              <Form.Label>Manager</Form.Label>
              <Form.Control
                as="select"
                value={manager}
                onChange={(e) => setManager(e.target.value)}
                className='mb-3'
              >
                <option value="">Select a manager</option>
                {/* Populate with static data */}
                {/* <option value="manager1">Manager 1</option>
                <option value="manager2">Manager 2</option> */}
                {userData.map((user) => (
                  <option value={user._id}>{user.firstname} {user.lastname}</option>
                ))}




            </Form.Control>
            </Form.Group>

            <Form.Group controlId="team" >
              <Form.Label >Team</Form.Label>
              <Form.Control
                as="select"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                className="mb-4"
              >
                <option value="">Select a team</option>


                {allTeams.map((team) => (
        
                  <option value={team._id}>{team.team_name}</option>
                ))}
                {/* Populate with static data */}
                {/* <option value="team1">Team 1</option>
                <option value="team2">Team 2</option> */}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="mx-auto d-block">
              Create Project
            </Button>

    
          </Form>
          </Col>

{/* <Col>
  <Row xs={1} sm={2} md={3} lg={4} xl={2}>
    {projects.map((project) => (
      <Col key={project._id} className='mt-2'>
        <Card>
          <Card.Body>
            <Card.Title>Project Title: {project.projectname}</Card.Title>
          

         
            <Card.Subtitle className="mb-2 text-muted">
              Product Owner: {getUserName(project.product_owner_id)}

            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted ">
              Manager: {getUserName(project.manager_id)}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Team Name: {getTeamName(project.team_id)}
            </Card.Subtitle>
            <Card.Text>
              {project.projectdescription.length > 100
                ? showMoreMap[project._id]
                  ? project.projectdescription
                  : `${project.projectdescription.slice(0, 100)}...`
                : project.projectdescription}
            </Card.Text>
            {project.projectdescription.length > 100 && (
              <Button
                variant="link"
                onClick={() => toggleShowMore(project._id)}

              >
                {showMoreMap[project._id] ? 'Show Less' : 'Show More'}
              </Button>
            )}
            
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>


    </Col> */}
          </Row>
        


          {/* Here I want to query the database and  list the project and display them throgugh a card */}

            
    </Container>

   
  
</div>
// This code assumes that your backend API endpoint for fetching projects is '/api/projects'. Make sure to adjust it to match the actual endpoint you have set up in your Express.js routes. Additionally, customize the card rendering to display all relevant project details according to your schema.
  )
}

export default ProjectForm