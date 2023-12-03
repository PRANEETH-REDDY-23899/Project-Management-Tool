import {React, useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Select from 'react-select';









function DeleteteamMembers() {


    const [teamRoasters,setTeamRoasters] = useState([]); // this is the list of teams that will be displayed in the dropdown menu
    const [selectedMembers, setSelectedMembers] = useState([]); // this is the list of users that will be displayed in the dropdown menu
    const [selectedTeam, setSelectedTeam] = useState('');
    const [teamMembers, setTeamMembers] = useState([]); // this is the list of users that will be displayed in the dropdown menu



const handleSelectChange = (selectedOptions) => {
    setSelectedMembers(selectedOptions);
    };

const options = teamMembers.map((member) => ({
    value: member._id,
    label: `${member.firstname} ${member.lastname}`,
    }));


const handleDeleteRoaster = (roasterId) => {

      axios.delete(`http://localhost:5000/deletTeamRoaster/${roasterId}`)
        .then(function (response) {
          console.log(response);
          const updatedTeamRoasters = [...teamRoasters];
          setTeamRoasters(updatedTeamRoasters);
        })
        .catch(function (error) {
          console.error(error);
        });
      
    }


   


// const handleDeleteMember = (teamId, memberId, memberIndex) => {
//         axios.delete(`http://localhost:5000/deleteMember/${teamId}/${memberId}`)
//           .then(function (response) {
//             console.log(response);
//             const updatedTeamRoasters = [...teamRoasters];
//             updatedTeamRoasters.forEach((team) => {
//               if (team._id === teamId) {
//                 team.members.splice(memberIndex, 1);
//               }
//             });
//             setTeamRoasters(updatedTeamRoasters);

//           })
//           .catch(function (error) {
//             console.error(error);
//           });
//       };

const handleDeleteMembers = () => {
    if (selectedTeam && selectedMembers.length > 0) {
      const teamId = selectedTeam;
      console.log(teamId)
    //   console.log(selectedMembers)
      const memberIds = selectedMembers.map((member) => member.value);
    //   console.log(memberIds)  
     
  
      axios
        .delete(`http://localhost:5000/deleteMembers/${teamId}`, { data: { memberIds } })
        .then(function (response) {
          console.log(response);
  
          // Update the local state to remove deleted members
          const updatedTeamRoasters = [...teamRoasters];
          updatedTeamRoasters.forEach((team) => {
            if (team._id === teamId) {
              // Filter out the deleted member IDs
              team.members = team.members.filter(
                (member) => !memberIds.includes(member._id)
              );
            }
          });
          setTeamRoasters(updatedTeamRoasters);
  
          // Clear the selected members
          setSelectedMembers([]);
          setSelectedTeam('');

        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };
  





const getTeamDetails = (teamId) => {
    axios.get(`http://localhost:5000/getTeamMembers/${teamId}`)
    .then(function (response) {
      const teamDetails = response.data;
    //   console.log(teamDetails);
      setTeamMembers(teamDetails);
      
    })
    .catch(function (error) {
        console.log(error);
        }
    )
}


useEffect(() => {
   
    axios.get('http://localhost:5000/getTeamRoasters')
    .then(function (response) {
      const teamRoasterData = response.data;
    //   console.log(teamRoasterData);
      setTeamRoasters(teamRoasterData);
    //   console.log(teamRoasters);

    })
    .catch(function (error) {
        console.log(error);
        }
    )
}, [teamRoasters]); // Empty dependency array to run this effect only once


useEffect(() => {
    // console.log("selected team");
    if (selectedTeam) {
        // console.log(selectedTeam);
        // console.log("selected team");
      getTeamDetails(selectedTeam);
    //   console.log(selectedMembers)
    }
  }
    , [selectedTeam]); // Empty dependency array to run this effect only once







const user = JSON.parse(localStorage.getItem('user'));



// const filteredTeamRosters = teamRoasters.filter((teamRoster) => {
//       return teamRoster.members.some(member => member._id === user._id);
//     });

const filteredTeamRosters = teamRoasters ? teamRoasters.filter((teamRoster) => {
      if (teamRoster.members === undefined || !Array.isArray(teamRoster.members)) {
        return false;
      }
      return teamRoster.members.some(member => member._id === user._id);
    }) : [];
    

    





const handleSubmit = (e) => {

    e.preventDefault();
}

  return (
    <Container>

    <Row>
            <Col>
            {/* show header in middle */}
            <h2>Delete Team Members</h2>
            <Form onSubmit = {handleSubmit} >
              <Form.Group controlId="selectTeam">
                <Form.Label className='mt-3'>Select Team</Form.Label>

                <Form.Control
                  as="select"
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                >
                  {/* <option value="">Select a team</option> */}


                {/* {teamRoasters.map((team) => (
                    <option key={team.teamId} value={team.teamId} >
                      {team.team_name}
                    </option>
                    ))} */}
                    <option value="">Select a team</option>
                {filteredTeamRosters.map((team) => (

                    <option key={team.teamId} value={team.teamId} onChange={(e) => setSelectedTeam(e.target.value)} >
                      {team.team_name}
                      {/* {console.log(selectedTeam)} */}
                    </option>
                    ))
                    }
                </Form.Control>
              </Form.Group>

           
              <label className="mt-3">Select Members for Deltetion </label>
              <Select
                        isMulti
                        // value= .value of the selected option
                        value={selectedMembers}
                        options={options}
                        onChange={handleSelectChange}
                      />
              <Button  variant="primary" type="submit" className=" mt-3 mx-auto d-block" onClick={handleDeleteMembers}>
                Delete Selected Members
              </Button>
            </Form>
            
          </Col>

          <Col>
          <h2>Your Team Roster List</h2>

          <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Team Name</th>
              {/* <th scope="col">Team ID</th> */}
              <th scope="col">Team Members</th>
              <th scope="col">Delete Team Roster</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeamRosters.map((team) => (
              <tr key={team._id}>
                <td>{team.team_name}</td>
                {/* <td>{team.teamId}</td> */}
                <td>
                  {team.members.map((member) => (
                    <div key={member._id}>
                      <li>
                      {member.firstname} {member.lastname}
                      </li>
                     
                    </div>
                  ))}
                </td>
                <td>
                  <Button
                    variant="danger"
                    type='button'
                    className="btn-sm"
                    onClick={()=>{handleDeleteRoaster(team._id )}}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
          </Col>
        </Row>       
    </Container>
  )
}

export default DeleteteamMembers