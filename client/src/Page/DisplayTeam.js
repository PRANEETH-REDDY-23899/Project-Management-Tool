import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { useAuth } from '../components/AuthContext';


function DisplayTeam() {

const { teamId } = useParams();
// console.log(teamId)
const [teamRoasters, setTeamRoasters] = useState([]);

const {user} = useAuth();

const {teamRoasterData} = useAuth();
const {allTeamsData} = useAuth();
// console.log(teamRoasterData)

const currentTeam = allTeamsData.find((team) => team._id === teamId);
// console.log(currentTeam)
const currentTeamRoaster = teamRoasterData.filter((roaster) => roaster.teamId === teamId);
console.log(currentTeamRoaster)


// if not of currentteamroaster then display only team name and say no team members or roster created

// if currentteamroaster then display team name and roster


if (currentTeamRoaster.length===0) {
  return (
    <Container className="mt-5">
      <h1>{currentTeam.team_name}</h1>
      <p>No team members or roster created</p>
      <Button href={`/TeamRoasterForm`}>Create Team Roster</Button>
    </Container>
  );
}


return (
    <Container className="mt-5">
           {/* <h1>Display Team</h1> */}
              <h1>{currentTeam.team_name}</h1>
                <p>Team Members: </p>

                {/* {currentTeamRoaster.memmbers.map((member) => (
                    
                    <p>{member.firstname}</p>
                ))} */}

                        {currentTeamRoaster[0].members.map((member) => (
                                <Card key={member._id} className="mb-3">
                                <Card.Body>
                                    <Card.Title>{member.firstname} {member.lastname}</Card.Title>
                                    <p>Username: {member.username}</p>
                                    {/* Add other member details as needed */}
                                    {/* only display delete button if the team belongs to the user */}
                            {/* Only display delete button if the team belongs to the user */}
                            {member._id === user._id && (
                                        <Button variant='danger' href={``}>
                                            exit team
                                        </Button>
                                        )}
                                </Card.Body>
                                </Card>
                            ))}

        <Button variant='primary' href='/display-teams' className='mt-2'>View all Teams</Button>
        <Button variant='secondary' href='/TeamForm' className='mt-2'>Create New Team</Button>

    </Container>

    )}

export default DisplayTeam