const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');

const Project = sequelize.define('Project', {
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
}, {
  tableName: 'projects',
  timestamps: true,
});

module.exports = Project;
// module.exports = (sequelize, DataTypes) => {
//     const Project = sequelize.define('Project', {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false
//       },
//       description: {
//         type: DataTypes.TEXT,
//         allowNull: true
//       }
//     });
  
//     return Project;
//   };
  