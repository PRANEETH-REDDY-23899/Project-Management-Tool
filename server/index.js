const express = require('express');
// app.use(cors());
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const mongoose = require("mongoose");
// const Users = require("./UserSchema.js");

const {Users, Project, Team, UserStory, TeamRoster, Assigned, TaskList} = require("./schema.js");







// app.get('/', (req, res) => res.send('Hello World!'));


//create a connection to the mongoDB database atlas 

const port = process.env.port || 5000;


// run the server on the port 5000

const mongString = "mongodb+srv://praneeth:praneeth@cluster0.whxmrfr.mongodb.net/lab";
mongoose.connect(mongString, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully");
});








app.post('/userCreation', async (req, res) => {

    const { firstname, lastname, username, password } = req.body;

    // // check if the username already exists in the database and if it does, send an error message to the front end

  

    // // if (username ===  await Users.findOne({username})) 
    
    // // {

    // //     console.log("Username already exists");
    // //     return res.status(400).json({msg: 'Username already exists' }); 
    // //     // return res.status(400).json({ msg: 'Username already exists' });
        
    // // }

    // existing_user = await Users.findOne({username});
    // if (search_user) {
    //     console.log("Username already exists");
    //     return res.status(400).json({msg: 'Username already exists' });
    // }

    const user = new Users({ firstname, lastname, username, password })
    //  console.log(user);
    await user.save();
    res.json(user);
})

app.get('/checkUser', async (req, res) => {
    
    const username = req.query.username;
    const password = req.query.password;


    // console.log(username, password);
    const user = await Users.findOne({username})
    // console.log(user);

    try {
        const user = await Users.findOne({username})
        // console.log(user);
        if (!user) {
            return res.status(401).json({ message: 'Authentication failed No user exists' });
          }

        if (user.password === password) {

            // console.log("User exists");
            // localStorage.setItem('user', JSON.stringify(user));
            // return res.status(200).json({ message: 'Authentication successful' });

            return res.json(user);

            }

        else {
            console.log("Login failed")
            return res.status(401).json({ message: 'Authentication failed' });

             }
        // check the username and password in the database and if it exists, send the user data to the front end
        // res.send(user)
        // console.log(user);
    }
    catch (error) {
        res.status(500).send(error)
    }
   
})


app.post("/projectCreation", async (req, res) => {



    try {


        const { projectname, projectdescription, product_owner_id, manager_id, team_id } = req.body;



    // const { projectname, projectdescription,product_owner_id,manager_id,team_id } = req.body;

    //make sure that the project name is unique and if it is not, send an error message to the front end

    // if (projectname ===  await Project.findOne({projectname}))
    // {
    //     console.log("Project name already exists");
    //     return res.status(400).json({msg: 'Project name already exists' });
    // }

    // check all the fields are filled

    if (!projectname || !projectdescription) {
        alert("Please fill all the fields");
        return res.status(400).json({ msg: 'Please fill all the fields' });
    }

    const project = new Project({ projectname, projectdescription,product_owner_id,manager_id,team_id })
    await project.save();
    res.json(project);
}
catch (error) {
    console.log(error);
}

})

app.post("/teamCreation", async (req, res) => {
    const { team_name } = req.body;
    const team = new Team({ team_name })
    await team.save();
    res.json(team);
})

app.post("/userStoryCreation", async (req, res) => {
    const { user_story_name, project_id, priority } = req.body;
    const userStory = new UserStory({ user_story_name, project_id, priority })
    await userStory.save();
    res.json(userStory);
})

// app.post("/teamRosterCreation", async (req, res) => {
//     const { team_id, member_id } = req.body;
//     const teamRoster = new TeamRoster({ team_id, member_id })
//     await teamRoster.save();
//     res.json(teamRoster);

// })


// Define routes
app.post("/teamRosterCreation", async (req, res) => {
    const { team_id, member_id } = req.body;

    // Find the team roster
    const teamRoster = await TeamRoster.findOne({ team_id });
    // console.log(teamRoster);

    if (!teamRoster) {
        // Team roster doesn't exist, create a new one
        const teamRoster = new TeamRoster({ team_id, member_id: [member_id] });
        await teamRoster.save();
        
        return res.json(teamRoster);
    }

    // Convert member_id values to strings for comparison
    const memberIdsAsString = teamRoster.member_id.map(existingMemberId => existingMemberId.toString());
    const memberIdAsString = member_id.toString();

    // Check if the member is already in the roster
    if (memberIdsAsString.includes(memberIdAsString)) {
        console.log("Member is already in the roster");
        // Member is already in the roster, send a custom response for frontend alerting
        return res.status(400).json({ error: 'Member is already in the roster.', alert: 'Member is already in the team roster.' });
    }



    // Add the member to the existing team roster
    teamRoster.member_id.push(member_id);
    await teamRoster.save();

    res.json(teamRoster);
});


app.post("/taskCreation", async (req, res) => {

    const { task, user_story_id, created_by, status } = req.body;
    const taskList = new TaskList({ task,user_story_id, created_by, status })
    await taskList.save();
    res.json(taskList);
})

app.get("/getTeams", async (req, res) => {
    // query for all the teams in the database and send it from latest to oldest
    try{
    const teams = await Team.find();
    res.json(teams);
    }
    catch (error) {
        console.log(error);
    }
})

app.get("/getTeam/:id", async (req, res) => {

    try{
    const team = await Team.findById(req.params.id);
    res.json(team);
    }
    catch (error) {
        console.log(error);
    }
})






app.get("/getProjects", async (req, res) => {
    // query for all the projects in the database and send it from latest to oldest

    try    
    {
    const projects = await Project.find();
    const response =[];

    if (!projects) {
        return res.status(401).json({ message: 'No projects exists' });
        }

    for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const product_owner_id = project.product_owner_id;
        const manager_id = project.manager_id;
        const team_id = project.team_id;
        // console.log(team_id);
        const product_owner = await Users.findById(product_owner_id);
        const manager = await Users.findById(manager_id);
        const team = await Team.findById(team_id);
        const projectData = {
            projectname: project.projectname,
            projectdescription: project.projectdescription,
            product_owner: product_owner.firstname + " " + product_owner.lastname,
            product_owner_id: product_owner._id,
            manager_id: manager._id,
            manager: manager.firstname + " " + manager.lastname,
            team: team.team_name,
            _id: project._id
        }
        response.push(projectData);
    }
    // console.log(response);
    res.json(response);
}
    catch (error) {
        console.log(error);
    }
    // res.json(projects);
    
})


app.get("/getProject/:id", async (req, res) => {

    try{
    const project = await Project.findById(req.params.id);

    response =[];

    const product_owner_id = project.product_owner_id;
    const manager_id = project.manager_id;
    const team_id = project.team_id;
    // console.log(team_id);
    const product_owner = await Users.findById(product_owner_id);
    const manager = await Users.findById(manager_id);
    const team = await Team.findById(team_id);

    if (!project) {
        return res.status(401).json({ message: 'No project exists' });
        }
    
    const projectData = {
            projectname: project.projectname,
            projectdescription: project.projectdescription,
            product_owner: product_owner.firstname + " " + product_owner.lastname,
            product_owner_id: product_owner._id,
            manager_id: manager._id,
            manager: manager.firstname + " " + manager.lastname,
            team: team.team_name,
            _id: project._id
        }

    response.push(projectData);
    res.send(response);
    }

    catch (error) {
        console.log(error);
    }
})






app.get("/getUserStories", async (req, res) => {
    // query for all the user stories in the database and send it from latest to oldest
    try{
    const userStories = await UserStory.find()

    // store the user stories in the response array
    const response = [];

    if (!userStories) {
        return res.status(401).json({ message: 'No user stories exists' });
        }

    for (let i = 0; i < userStories.length; i++) {
        const userStory = userStories[i];
        const project_id = userStory.project_id;
        const project = await Project.findById(project_id);
        const userStoryData = {
            user_story_name: userStory.user_story_name,
            project_name: project.projectname,
            project_id: project._id,
            priority: userStory.priority,
            _id: userStory._id
        }
        response.push(userStoryData);
    }
    res.json(response);
    // res.json(userStories);

    }
    catch (error) {
        console.log(error);
    }
})

app.get("/getTaskList", async (req, res) => { 
    // query for all the tasks in the database and send it from latest to oldest
    try{
    const taskList = await TaskList.find();
    res.json(taskList);
    } catch (error) {
        console.log(error);
    }

})

app.get("/ListUsers", async (req, res) => {
    // query for all the users in the database and send it from latest to oldest

    try {
    const users = await Users.find();
    res.json(users);
    }
    catch (error) {
        console.log(error);
    }

})


// get particular user details by passing the _id of the user:

app.get("/getUser", async (req, res) => {
    // query for all the users in the database and send it from latest to oldest

    try{
    const user = await Users.findById(req.query.id);
    res.json(user);
    }
    catch (error) {
        console.log(error);
    }
})


// get user by passing the id of the user:

app.get("/getUserById", async (req, res) => {


    try{

    const user = await Users.findById(req.query.id);
    res.json(user);

    }
    catch (error) {
        console.log(error);
    }
}
)

app.get("/getTeamRoasters", async (req, res) => {
    // query for all the team roasters in the database and send it from latest to oldest
    try{

    const teamRoasters = await TeamRoster.find();
    // console.log(teamRoasters);


    if (!teamRoasters) {
        return res.status(401).json({ message: 'No team roasters exists' });
        }
    response = [];
    // store the teamRoasters in the response array



    for (let i = 0; i < teamRoasters.length; i++) {

        const teamRoster = teamRoasters[i];
        // console.log(teamRoster);
        const team_id = teamRoster.team_id;
        // console.log(team_id);
        const team = await Team.findById(team_id);
        // if (!team) {
        //     return res.status(401).json({ message: 'No team exists' });
        //     }
        // console.log(team);
        const members = [];
        for (let j = 0; j < teamRoster.member_id.length; j++) {
            const member_id = teamRoster.member_id[j];
            // console.log(member_id);
            const member = await Users.findById(member_id);
            // console.log(member);
            // members.push(member.firstname + " " + member.lastname);
            members.push(member);
        }
        const teamRosterData = {
            team_name: team.team_name,
            members: members,
            teamId:team._id,
            _id: teamRoster._id
        }
        response.push(teamRosterData);
    }
    res.json(response);
    // res.json(teamRoasters);

}
catch (error) {
    console.log(error);
}
}

)



app.get("/getTeamMembers/:teamId", async (req, res) => {

    try{
    const teamRoster = await TeamRoster.findOne({ team_id: req.params.teamId });
    // console.log(teamRoster);
    const members = [];
    for (let i = 0; i < teamRoster.member_id.length; i++) {
        const member_id = teamRoster.member_id[i];
        // console.log(member_id);
        const member = await Users.findById(member_id);
        // console.log(member);
        members.push(member);
    }
    res.json(members);
}
catch (error) {
    console.log(error);
}
})

app.get("/getTeam/:teamId", async (req, res) => {
    
        try{
        const teamRoster = await TeamRoster.findOne({ team_id: req.params.teamId });
        // console.log(teamRoster);
        // const team_id = teamRoster.team_id;
        // console.log(team_id);
        // const team = await Team.findById(team_id);
        // console.log(team);

        if (!teamRoster) {
            return res.status(401).json({ message: 'No team exists' });
            }

        const team = await Team.findById(team_id);
        const members = [];
        for (let j = 0; j < teamRoster.member_id.length; j++) {
            const member_id = teamRoster.member_id[j];
            // console.log(member_id);
            const member = await Users.findById(member_id);
            // console.log(member);
            // members.push(member.firstname + " " + member.lastname);
            members.push(member);
        }
        const teamRosterData = {
            team_name: team.team_name,
            members: members,
            teamId:team._id,
            _id: teamRoster._id
        }
        response.push(teamRosterData);

        res.json(response);
    } 
        catch (error) {
            console.log(error);

        }
    })








app.delete("/deleteMember/:teamId/:memberId", async (req, res) => {
    try {
        const { teamId, memberId } = req.params;

        // console.log(teamId, memberId); 

        // Find the team roster by team ID
        const teamRoster = await TeamRoster.findOne({ team_id: teamId });

        // console.log(teamRoster);

        // Check if the team roster exists
        if (!teamRoster) {
            return res.status(404).json({ message: "Team roster not found" });
        }

        // Check if the member ID exists in the team roster
        const memberIndex = teamRoster.member_id.indexOf(memberId);

        if (memberIndex === -1) {
            return res.status(404).json({ message: "Member not found in the team roster" });
        }

        // Remove the member ID from the team roster
        teamRoster.member_id.splice(memberIndex, 1);

        // Save the updated team roster
        await teamRoster.save();

        res.json({ message: "Member removed from the team roster" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove the member from the team roster" });
    }
});


app.delete("/deletTeamRoaster/:id", async (req, res) => {

    try {
        const teamRoaster = await TeamRoster.findById(req.params.id);
        // console.log(teamRoaster);
        await teamRoaster.deleteOne();
        res.json({ message: "Team roaster deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete the team roaster" });
    }

})


app.delete("/deleteTeam/:id",async(req,res)=>{

    try {
        const team = await Team.findById(req.params.id);
        // console.log(team);
        await team.deleteOne();
        res.json({ message: "Team deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete the team" });
    }

})

app.delete("/deleteProject/:id", async (req, res) => {
    
        try {
            const project = await Project.findById(req.params.id);
            // console.log(project);
            await project.deleteOne();
            res.json({ message: "Project deleted successfully" });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Failed to delete the project" });
        }
    
    })

app.delete("/deleteUserStory/:id", async (req, res) => {
        
            try {
                const userStory = await UserStory.findById(req.params.id);
                // console.log(userStory);
                await userStory.deleteOne();
                res.json({ message: "User story deleted successfully" });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to delete the user story" });
            }
        
        }
)


app.delete("/deleteTask/:id", async (req, res) => {
            
                try {
                    const task = await TaskList.findById(req.params.id);
                    // console.log(task);
                    await task.deleteOne();
                    res.json({ message: "Task deleted successfully" });
                }
                catch (error) {
                    console.error(error);
                    res.status(500).json({ message: "Failed to delete the task" });
                }
            
            }   

)



//  select team roasters and members by passing the roaster id and delete the team list of members
// delete multi team members by passing the team id and the member id 


app.delete("/deleteMembers/:teamId", async (req, res) => {
    try {
        const { teamId } = req.params;
        const { memberIds } = req.body; // Expect an array of member IDs

        // Find the team roster by team ID
        const teamRoster = await TeamRoster.findOne({ team_id: teamId });

        // Check if the team roster exists
        if (!teamRoster) {
            return res.status(404).json({ message: "Team roster not found" });
        }

        // console.log(teamRoster);

        // Remove the member IDs from the team roster
        // console.log(memberIds);
        memberIds.forEach((memberId) => {
            const memberIndex = teamRoster.member_id.indexOf(memberId);
            if (memberIndex !== -1) {
                teamRoster.member_id.splice(memberIndex, 1);
            }
        });

        // Save the updated team roster
        await teamRoster.save();

        res.json({ message: "Members removed from the team roster" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to remove members from the team roster" });
    }
});


app.get("/userStories/:projectId", async (req, res) => {

    // default to fetch all the user stories if the project id is not passed
    try{

    const userStories = await UserStory.find({ project_id: req.params.projectId });

    // store the user stories in the response array

    const response = [];

    if (!userStories) {
        return res.status(401).json({ message: 'No user stories exists' });
        }

    for (let i = 0; i < userStories.length; i++) {
        const userStory = userStories[i];
        const project_id = userStory.project_id;
        const project = await Project.findById(project_id);
        const userStoryData = {
            user_story_name: userStory.user_story_name,
            project_name: project.projectname,
            project_id: project._id,
            priority: userStory.priority,
            _id: userStory._id
        }
        response.push(userStoryData);
    }
    res.json(response);

    // res.json(userStories);
    }
    catch (error) {
        console.log(error);
    }})


app.post("/assignUserStory", async (req, res) => {
    
        const { user_story_id, user_id } = req.body;
        // console.log(user_story_id, user_id);
        const assigned = new Assigned({ user_story_id, user_id })
        await assigned.save();
        res.json(assigned);
    })


app.get("/getAssignedUserStories/:id", async (req, res) => {

    const user_id = req.params.id;
    // console.log(user_id);
        
            try {
                const assigned = await Assigned.find({ user_id: user_id });

                const response = [];

                if (!assigned) {
                    return res.status(401).json({ message: 'No assigned user stories exists' });
                    }
                
                for (let i = 0; i < assigned.length; i++) {
                    const assign = assigned[i];

                    const user_story_id = assign.user_story_id;
                    const user_id = assign.user_id;
                    const userStory = await UserStory.findById(user_story_id);
                    const user = await Users.findById(user_id);
                    // console.log(userStory, user)
                    const assignedData = {
                        user_story_name: userStory.user_story_name,
                        user_name: user.firstname + " " + user.lastname,
                        user_story_id: userStory._id,
                        user_id: user._id,
                        _id: assign._id
                    }
                    // console.log(assignedData);
                    response.push(assignedData);
                }
                res.json(response);
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: "Failed to get the assigned user stories" });
            }
        
        }

)











app.delete("/deleteAssignedUserStory/:id", async (req, res) => {
            
                try {
                    
                    const assigned = await Assigned.findById(req.params.id);
                    // console.log(assigned);

                    //  if not assigned check with the user story id as well as the user id

                    await assigned.deleteOne();
                    res.json({ message: "Assigned user story deleted successfully" });
                }
                catch (error) {
                    console.error(error);
                    res.status(500).json({ message: "Failed to delete the assigned user story" });
                }
            
            }

)



app.get('/userStoriesByUserId/:userId', async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const assigned = await Assigned.find({ user_id: userId });
    //   console.log(assigned);


    const response = [];

    // if assigned  is null then return empty array

    if (!assigned) {
        return res.status(401).json({ message: 'No assigned user stories exists' });
        }

    for (let i = 0; i < assigned.length; i++) {

        assign = assigned[i];
        const user_story_id = assign.user_story_id;
        const user_id = assign.user_id;
        const userStory = await UserStory.findById(user_story_id);
        const user = await Users.findById(user_id);
        // console.log(userStory, user)
        const assignedData = {
            user_story_name: userStory.user_story_name,
            user_name: user.firstname + " " + user.lastname,
            user_story_id: userStory._id,
            priority: userStory.priority,
            user_id: user._id,
            _id: assign._id
        }

        response.push(assignedData);
    }
    res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });



app.get('/userStoriesByUserStoryId/:userStoryId', async (req, res) => {

    const userStoryId = req.params.userStoryId;

    try {
        const assigned = await Assigned.find({ user_story_id: userStoryId });

        // const assigned = await UserStory.findById(userStoryId);
        
        const response = [];

        // if assigned  is null then return empty array

        if (!assigned) {
            return res.status(401).json({ message: 'No assigned user stories exists' });
            }
        
        for (let i = 0; i < assigned.length; i++) {

            assign = assigned[i];
            const user_story_id = assign.user_story_id;
            const userStory = await UserStory.findById(user_story_id);
            const user_id = assign.user_id;
            const user = await Users.findById(user_id);
            const project_id = userStory.project_id;
            const project = await Project.findById(project_id);

            const availableData = {
                user_story_name: userStory.user_story_name,
                user_name: user.firstname + " " + user.lastname,
                project_name: project.projectname,
                user_story_id: userStory._id,
                priority: userStory.priority,
                user_id: user._id,
                _id: assign._id
            }

            response.push(availableData);
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
    }); 


app.get('/getTasks', async (req, res) =>
{
    try {
        const tasks = await TaskList.find();

        response = []; 
         
        for (i=0;i<tasks.length;i++)
        {
            task = tasks[i];
            const user_story_id = task.user_story_id;
            const user_id = task.created_by;
            // console.log(user_story_id, user_id)
            const userStory = await UserStory.findById(user_story_id);
            const project_id = userStory.project_id;
            const project = await Project.findById(project_id);
            const user = await Users.findById(user_id);
            // console.log(userStory, user)

            const assignedData = {
                user_story_name: userStory.user_story_name,
                project_name: project.projectname,
                user_name: user.firstname + " " + user.lastname,
                user_story_id: userStory._id,
                priority: userStory.priority,
                task:task.task,
                status:task.status,
                user_id: user._id,
                _id: task._id

            }


        response.push(assignedData);

        }
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

)




app.get('/getTasks/:id', async (req, res) => 

{
    const id = req.params.id;
    // console.log(id);
    try {
        const tasks = await TaskList.find({created_by:id});
        // console.log(tasks);

        // if tasks  is null then return empty array

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: 'No tasks exist for this user.' });
          }
        
        response = []; 

        for (i=0;i<tasks.length;i++)
        {
            task = tasks[i];
            const user_story_id = task.user_story_id;
            const user_id = task.created_by;
            // console.log(user_story_id, user_id)

            const userStory = await UserStory.findById(user_story_id);
            const project_id = userStory.project_id;
            const project = await Project.findById(project_id);
            const user = await Users.findById(user_id);
            // console.log(userStory, user)

            const assignedData = {
                user_story_name: userStory.user_story_name,
                project_name: project.projectname,
                user_name: user.firstname + " " + user.lastname,
                user_story_id: userStory._id,
                priority: userStory.priority,
                task:task.task,
                status:task.status,
                user_id: user._id,
                _id: task._id

            }


        response.push(assignedData);

        }
        // console.log(response);
        res.json(response);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
}

)


app.get('/tasksByTaskId/:taskId', async (req, res) => 
    {
        const taskId = req.params.taskId;
        // console.log(taskId);
        try {   

            const task = await TaskList.findById(taskId);
            // console.log(task);

            // if tasks  is null then return empty array

            if (!task || task.length === 0) {
                return res.status(404).json({ message: 'No tasks exist for this user.' });
              }

            const user_story_id = task.user_story_id;
            // console.log(user_story_id);
            const user_id = task.created_by;
            // console.log(user_story_id, user_id)
            const userStory = await UserStory.findById(user_story_id);
            const project_id = userStory.project_id;
            const project = await Project.findById(project_id);
            const user = await Users.findById(user_id);

            const newData = {

                user_story_name: userStory.user_story_name,
                project_name: project.projectname,
                user_name: user.firstname + " " + user.lastname,
                user_story_id: userStory._id,
                priority: userStory.priority,
                task:task.task,
                status:task.status,
                user_id: user._id,
                _id: task._id
            }
            // console.log(newData);
            res.json(newData);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
    }
)








app.post('/taskupdation', async (req, res) => {
    try {
      const {task_id, status } = req.body;
  
      // Define the criteria to find the task
      const criteria = { _id: task_id, status: { $ne: status } };
  
      // Create a new task with the provided details or update an existing one
      const updatedTask = await TaskList.findOneAndUpdate(
        criteria,
        { status },
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
  
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to create or update the task.' });
    }
  });





// create a mongodb schema

app.listen(port, () => console.log(`Listening on port ${port}`));

// import mongoose






