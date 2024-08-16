
const User = require('./user');
const Project = require('./project');
const Task = require('./task');

// Relasi User dengan Project
User.hasMany(Project, { foreignKey: 'userId' }); // One-to-many dari User ke Project
Project.belongsTo(User, { foreignKey: 'userId' }); // Many-to-one dari Project ke User

// Relasi User dengan Task
User.hasMany(Task, { foreignKey: 'userId' }); // One-to-many dari User ke Task
Task.belongsTo(User, { foreignKey: 'userId' }); // Many-to-one dari Task ke User

// Relasi Project dengan Task
Project.hasMany(Task, { foreignKey: 'projectId' }); // One-to-many dari Project ke Task
Task.belongsTo(Project, { foreignKey: 'projectId' }); // Many-to-one dari Task ke Project

module.exports = { User, Project, Task };
