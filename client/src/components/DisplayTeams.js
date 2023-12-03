import React from 'react'
import { Container } from 'react-bootstrap'
import {useState, useEffect} from 'react';
import axios from 'axios';
import { Card, Col, Row } from 'react-bootstrap';


function DisplayTeams() {

const [teams, setTeams] = useState([]);
const [teamRosters, setTeamRosters] = useState([]);

const user = JSON.parse(localStorage.getItem('user'));

// filter teams by user id

// const filteredTeams = teams.filter((team) => team.user_id === user._id);


const handleDeleteTeam = (teamId) => () => {

  axios.delete(`http://localhost:5000/deleteTeam/${teamId}`)
    .then(function (response) {
      console.log(response);
      const updatedTeams = [...teams];
      const teamIndex = updatedTeams.findIndex(
        (team) => team._id === teamId
      );
      updatedTeams.splice(teamIndex, 1);
      setTeams(updatedTeams);
    })
    .catch(function (error) {
      console.error(error);
    });
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

  // get team roasters 

  useEffect(() => {
    axios
      .get('http://localhost:5000/getTeamRoasters')
      .then(function (response) {

        const teamRosterData = response.data;
        setTeamRosters(teamRosterData);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    , []);


// const  teamRosterData = {
//   team_name: team.team_name,
//   members: members,
//   teamId:team._id,
//   _id: teamRoster._id
// }
 
// console.log(teamRosters);


// const filteredTeamRosters = teamRosters.filter((teamRoster) => {
//   // console.log(teamRoster);
//   return teamRoster.members.some(member => member._id === user._id);
// });


const filteredTeamRosters = teamRosters ? teamRosters.filter((teamRoster) => {
  if (teamRoster.members === undefined || !Array.isArray(teamRoster.members)) {
    return false;
  }
  return teamRoster.members.some(member => member._id === user._id);
}) : [];


console.log(filteredTeamRosters);






  return (
    <Container>
  {/* <h1>Display Teams</h1>
  <h4 className='mt-4'>Existing Team List :</h4> 
  <Row>
    {teams.map((team) => (
      <Col key={team._id} xs={12} sm={6} md={4} lg={3}  className='mt-3'>
        <div className="team-card">
          <Card>
            <Card.Body>
              <Card.Title>Team Name: {team.team_name}</Card.Title>
            </Card.Body>
          </Card>
        </div>
      </Col>
    ))}
  </Row> */}

  <h4 className='mt-4'>Existing Team List :</h4> 


  {filteredTeamRosters.length > 0 ? (
      <table className="table table-striped">
        <thead>
      <tr>
        <th>Team Name</th>
      </tr>
    </thead>
    <tbody>
      {filteredTeamRosters.map((team) => (
        <tr key={team.teamId}>
          <td>{team.team_name}</td>

          <td>  <button className="btn btn-danger" onClick={handleDeleteTeam(team.teamId)} >Delete</button></td>
         
        </tr>
      ))}
    </tbody>
      </table>
    ) : (
      <p>
          No teams found. <a href="/TeamForm">Create one</a> or go to{' '}
          <a href="TeamRoasterForm">Team Rosters</a> page to get yourself to a team.
        </p>
    )}
  


  {/* <table className="table table-striped">
    <thead>
      <tr>
        <th>Team Name</th>
      </tr>
    </thead>
    <tbody>
      {filteredTeamRosters.map((team) => (
        <tr key={team.teamId}>
          <td>{team.team_name}</td>

          <td>  <button className="btn btn-danger" onClick={handleDeleteTeam(team.teamId)} >Delete</button></td>
         
        </tr>
      ))}
    </tbody>
  </table> */}
</Container>
    
  )
}

export default DisplayTeams