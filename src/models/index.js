const User = require('./user');
const Project = require('./project');
const Task = require('./task');

User.hasMany(Task, { foreignKey: 'userId' });
Project.hasMany(Task, { foreignKey: 'projectId' });

Task.belongsTo(User, { foreignKey: 'userId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = { User, Project, Task };
