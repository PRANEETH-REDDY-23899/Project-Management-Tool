// 


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Card, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';

function DisplayProjects() {
  const [projects, setProjects] = useState([]);
  const [showMoreMap, setShowMoreMap] = useState({});
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [allTeams, setAllTeams] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state





  const handleProjectDelete = (projectId) => () => {
    axios.delete(`http://localhost:5000/deleteProject/${projectId}`)
      .then(function (response) {
        console.log(response);
        const updatedProjects = [...projects];
        const projectIndex = updatedProjects.findIndex(
          (project) => project._id === projectId
        );
        updatedProjects.splice(projectIndex, 1);
        setProjects(updatedProjects);
      })
      .catch(function (error) {
        console.error(error);
      });
  }


  const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

  const toggleShowMore = (id) => {
    setShowMoreMap({ ...showMoreMap, [id]: !showMoreMap[id] });
  };

  // const getUserName = (userId) => {
  //   const user = userData.find((user) => user._id === userId);

  //   if (!user) {
  //     return 'Unknown';
  //   }
  //   return `${user.firstname} ${user.lastname}`;
  // };

  // const getTeamName = (teamId) => {
  //   const team = allTeams.find((team) => team._id === teamId);

  //   if (!team) {
  //     return 'Unknown Team';
  //   }
  //   return `${team.team_name}`;
  // };

  useEffect(() => {
    // Fetch data for projects, users, and teams
    axios
      .get('http://localhost:5000/getProjects')
      .then(function (response) {
        const projectData = response.data;
        setProjects(projectData);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/ListUsers')
      .then(function (response) {
        const userData = response.data;
        setUserData(userData);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('http://localhost:5000/getTeams')
      .then(function (response) {
        const allTeams = response.data;
        setAllTeams(allTeams);
      })
      .catch(function (error) {
        console.log(error);
      })
      
    setIsLoading(false); // Set isLoading to false when all data is fetched
  }, []); // Empty dependency array to run this effect only once


  // useEffect(() => {
  //   axios
  //     .get('http://localhost:5000/getProjects')
  //     .then(function (response) {
  //       const projectData = response.data;
  //       setProjects(projectData);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [projects]); // Empty dependency array to run this effect only once


  const user = JSON.parse(localStorage.getItem('user'));

const userProjects = projects.filter(project => (
    project.product_owner_id === user._id || project.manager_id === user._id
  ));

  return (
    <Container>
    {isLoading ? (
      <ClipLoader color={'#123abc'} loading={isLoading} css={override} size={50} />
    ) : (
      <div>
        <h4 className="mt-4">Your Projects:</h4>
        {userProjects.length > 0 ? (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Project Title</th>
                <th>Product Owner</th>
                <th>Manager</th>
                <th>Team Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {userProjects.map((project) => (
                <tr key={project._id}>
                  <td>{project.projectname}</td>
                  <td>{project.product_owner}</td>
                  <td>{project.manager}</td>
                  <td>{project.team}</td>
                  <td>
                    {project.projectdescription.length > 100
                      ? showMoreMap[project._id]
                        ? project.projectdescription
                        : `${project.projectdescription.slice(0, 100)}...`
                      : project.projectdescription}
                    {project.projectdescription.length > 100 && (
                      <Button
                        variant="link"
                        onClick={() => toggleShowMore(project._id)}
                      >
                        {showMoreMap[project._id] ? 'Show Less' : 'Show More'}
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" className="mt-2" onClick={handleProjectDelete(project._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>
            <p>No projects found.</p>
            <a href="/ProjectForm">Create a Project</a>
          </div>
        )}
      </div>
    )}
  </Container>
  );
}

export default DisplayProjects;
