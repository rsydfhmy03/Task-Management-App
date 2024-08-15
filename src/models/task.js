const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');
const User = require('./user');
const Project = require('./project');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
    defaultValue: 'pending',
  },
}, {
  tableName: 'tasks',
  timestamps: true,
});

Task.belongsTo(User, { foreignKey: 'userId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

module.exports = Task;
// module.exports = (sequelize, DataTypes) => {
//     const Task = sequelize.define('Task', {
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: true
//       },
//       due_date: {
//         type: DataTypes.DATE,
//         allowNull: true
//       }
//     });
  
//     return Task;
//   };
  