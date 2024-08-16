const { DataTypes } = require('sequelize');
const sequelize = require('../config/databaseConfig');


const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.CHAR(36), 
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  userId: {  
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'Projects',
  timestamps: true,
});

module.exports = Project;

