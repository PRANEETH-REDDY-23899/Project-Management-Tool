const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    password: String,

});

const ProjectSchema = new mongoose.Schema({
    projectname: String,
    projectdescription: String,
    product_owner_id:mongoose.Schema.Types.ObjectId,
    manager_id:mongoose.Schema.Types.ObjectId,
    team_id:mongoose.Schema.Types.ObjectId
});

  

const TeamSchema = new mongoose.Schema({
    team_name: String
});

const UserStorySchema = new mongoose.Schema({
    user_story_name: String,
    project_id:mongoose.Schema.Types.ObjectId,
    priority:{type:Number, default:0}
});


const TeamRosterSchema = new mongoose.Schema({
    team_id:mongoose.Schema.Types.ObjectId,
    member_id:[{type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'}]

    // how to store multiple members in the same team give me an example data type for this
    // member_id:mongoose.Schema.Types.ObjectId

});

const AssignedSchema = new mongoose.Schema({
    user_story_id:mongoose.Schema.Types.ObjectId,
    user_id:mongoose.Schema.Types.ObjectId
});

const TaskListSchema = new mongoose.Schema({
    task: String,
    user_story_id:mongoose.Schema.Types.ObjectId,
    created_by:mongoose.Schema.Types.ObjectId,
    status:String
});



// module.exports = {
//     User: mongoose.model('User', userSchema),
//     Post: mongoose.model('Post', postSchema),
//   };

module.exports = {
    Users: mongoose.model('Users', UserSchema),
    Project: mongoose.model('Project', ProjectSchema),
    Team: mongoose.model('Team', TeamSchema),
    UserStory: mongoose.model('UserStory', UserStorySchema),
    TeamRoster: mongoose.model('TeamRoster', TeamRosterSchema),
    Assigned: mongoose.model('Assigned', AssignedSchema),
    TaskList: mongoose.model('TaskList', TaskListSchema)
    };






