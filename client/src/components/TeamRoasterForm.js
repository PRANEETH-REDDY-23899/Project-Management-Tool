import React, {useState, useEffect} from 'react'
import {Form, Button, Container, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';

import { useParams } from 'react-router-dom';
import { set } from 'mongoose';





function TeamRoasterForm() {

        const [selectedTeam, setSelectedTeam] = useState('');
        const [selectedMember, setSelectedMember] = useState('');
        const [users, setUsers] = useState([]); // this is the list of users that will be displayed in the dropdown menu
        const [teams, setTeams] = useState([]); // this is the list of teams that will be displayed in the dropdown menu
        const [teamRoasters, setTeamRoasters] = useState([]); // this is the list of teams that will be displayed in the dropdown menu
        const [selectedMembers, setSelectedMembers] = useState([]); // this is the list of users that will be displayed in the dropdown menu
        
        

      const { teamId } = useParams();
      console.log(teamId)
      
        // You can populate these dropdowns with static data as needed
        // const teams = ['Team 1', 'Team 2', 'Team 3']; 
        // can i get list of teams from database?  how?  do i need to create a new route?   how do i get the list of teams from the database?   


        // const members = ['Member 1', 'Member 2', 'Member 3'];

        const user = JSON.parse(localStorage.getItem('user'));


        const handleDeleteMember = (teamId, memberId, memberIndex) => {
          axios.delete(`http://localhost:5000/deleteMember/${teamId}/${memberId}`)
            .then(function (response) {
              console.log(response);
              const updatedTeamRoasters = [...teamRoasters];
              updatedTeamRoasters.forEach((team) => {
                if (team._id === teamId) {
                  team.members.splice(memberIndex, 1);
                }
              });
              setTeamRoasters(updatedTeamRoasters);
            })
            .catch(function (error) {
              console.error(error);
            });
        };

        const handleDeleteRoaster = (roasterId) => {

          axios.delete(`http://localhost:5000/deletTeamRoaster/${roasterId}`)
            .then(function (response) {
              // console.log(response);
              const updatedTeamRoasters = [...teamRoasters];
              setTeamRoasters(updatedTeamRoasters);
            })
            .catch(function (error) {
              console.error(error);
            });
          
        }


        const maxSelectedMembers = 3;

        const handleSelectChange = (selectedOptions) => {
          if (selectedOptions.length <= maxSelectedMembers) {

            // include only the value of the selected option
            // const selectedValues = selectedOptions.map((option) => option.value);
            // setSelectedMembers(selectedValues);
            setSelectedMembers(selectedOptions);
          }
          else
          {
            alert("You can only select up to 3 members");
          }
        };

        const options = users.map((user) => ({
          value: user._id,
          label: `${user.firstname} ${user.lastname}`,
        }));

        const handleSubmit = (e) => {
          e.preventDefault();
      
          // I want to check whether all the fields were filled out before submitting the form
          // if (selectedTeam === '' || selectedMember === '') {
          //   alert("Please fill out all the fields");
          //   return;
          // }

          // console.log(selectedTeam);
          // console.log(selectedMember);


          if (selectedTeam === '') {
            alert("Please select a team");
            return;
          }

          if (selectedMembers.length === 0) {
            alert("Please select at least one member");
            return;
          }

          const memberIds = selectedMembers.map((member) => member.value);

          axios.post('http://localhost:5000/teamRosterCreation', {
            team_id: selectedTeam,
            member_id: memberIds
          })
          .then(function (response) {
            console.log(response);
            alert("Team Roaster Created Successfully");
          }
          )
          .catch(function (error) {
            console.log(error);
          }
          );
          // Handle form submission here (e.g., send data to an API)
      
          // Clear the team name input field
          setSelectedTeam('');
          setSelectedMembers('');

        }



        // const handleSubmit = (e) => {
        //   e.preventDefault();
        
        //   if (selectedTeam === '') {
        //     alert("Please select a team");
        //     return;
        //   }
        
        //   if (selectedMembers.length === 0) {
        //     alert("Please select at least one member");
        //     return;
        //   }
        
        //   const memberIds = selectedMembers.map((member) => member.value);
        
        //   // Check if the selected members already exist in the team roster
        //   axios.get(`http://localhost:5000/getTeamRoasters/${selectedTeam}`)
        //     .then((response) => {
        //       const existingMembers = response.data.member_id;
        
        //       // Check if any of the selected members already exist in the team roster
        //       const duplicateMembers = memberIds.filter(memberId => existingMembers.includes(memberId));
        
        //       if (duplicateMembers.length > 0) {
        //         alert(`Selected member(s) already exist in the team roster: ${duplicateMembers.join(', ')}`);
        //         return;
        //       }
        
        //       // If no duplicate members, proceed to create the team roster
        //       axios.post('http://localhost:5000/teamRosterCreation', {
        //         team_id: selectedTeam,
        //         member_id: memberIds
        //       })
        //         .then(function (response) {
        //           console.log(response);
        //           alert("Team Roaster Created Successfully");
        //         })
        //         .catch(function (error) {
        //           console.log(error);
        //         });
        //     })
        //     .catch(function (error) {
        //       console.log(error);
        //     });
        
        //   // Clear the team name and selected members input fields
        //   setSelectedTeam('');
        //   setSelectedMembers([]);
        // };
        


    useEffect(()=>{
      axios.get('http://localhost:5000/ListUsers')
      .then(function (response) {
        const userData = response.data;
        setUsers(userData);
      })
      .catch(function (error) {
        console.log(error);
      });

      axios.get('http://localhost:5000/getTeams')
      .then(function (response) {
        const teamData = response.data;
        setTeams(teamData);
      })
      .catch(function (error) {
        console.log(error);
      });
    }, []);

    useEffect(()=>{
      axios.get('http://localhost:5000/getTeamRoasters')
      .then(function (response) {
        const teamRoasterData = response.data;
        setTeamRoasters(teamRoasterData);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    , []);

    const filteredTeamRosters = teamRoasters.filter((teamRoster) => {
      return teamRoster.members.some(member => member._id === user._id);
    });
// console.log(filteredTeamRosters);

const currentTeam = teams.find((team) => team._id === teamId);
// console.log(currentTeam)

const currentTeamRoaster = teamRoasters.filter((roaster) => roaster.teamId === teamId);
// console.log(currentTeamRoaster)

// setSelectedTeam(currentTeam._id);




    return (
      <Container className='mt-5'>
        <Row>
          <Col>
            <h2>Team Roster Creation</h2>
            <Form onSubmit = {handleSubmit} >
              <Form.Group controlId="selectTeam">
                <Form.Label className='mt-3'>Select Team</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  <option value="">Select a team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id} >
                      {team.team_name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
  
              <label className="mt-3">Select Members (Up to 3)</label>
                      <Select
                        isMulti
                        // value= .value of the selected option
                        value={selectedMembers}
                        options={options}
                        onChange={handleSelectChange}
                      />
                  
              

              <Button  variant="primary" type="submit" className=" mt-3 mx-auto d-block">
                Create Team Roasters 
              </Button>
            </Form>
          </Col>

          <Col>
          
          <h2>Your Team Roaster</h2>


          <table className="table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Team Member</th>
              </tr>
            </thead>
            <tbody>
              
            {filteredTeamRosters.map((team) => (
                <tr key={team._id}>
                  <td>{team.team_name}</td>
                  
                  <td>
                   

                    {team.members.map((member,index) => (

                      <div key={member._id}>
                       {member.firstname} {member.lastname}
                          <i className="fa fa-trash"
                          onClick={() => handleDeleteMember(team.teamId, member._id, index)}
                          style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}
                        ></i>
                      </div>
                    ))}
                  </td>
                  {/* <td>
                  <Button variant='danger' onClick={() => handleDeleteRoaster(team._id)}>Delete Roaster</Button>

                  </td> */}
                  
                </tr>
              ))}

        



                  
               
                  {/* <button onClick={() => handleDeleteRoaster(team._id)}>Delete Roaster</button> */}
            
            </tbody>
          </table>

              

                


                  

          {/* <table className="table">
            <thead>
              <tr>
                <th>Team Name</th>
                <th>Team Member</th>
              </tr>
            </thead>
            <tbody>
              {teamRoasters.map((team) => (
                <tr key={team._id}>
                  <td>{team.team_name}</td>
                  <td>
                    {team.members.map((member,index) => (

                      <div key={member._id}>
                       {member.firstname} {member.lastname}
                          <i className="fa fa-trash"
                          onClick={() => handleDeleteMember(team.teamId, member._id, index)}
                          style={{ cursor: 'pointer', color: 'red', marginLeft: '5px' }}
                        ></i>
                      </div>
                    ))}
                  </td>
                  <td>
                  <button onClick={() => handleDeleteRoaster(team._id)}>Delete Roaster</button>
                  </td>    
                </tr>
              ))}
            </tbody>
          </table> */}


          </Col>



        </Row>
      </Container>


  )
}

export default TeamRoasterForm  